import {
  SmartScheduleShift,
  SmartScheduleAvailability,
  SmartScheduleAssignment,
  SmartScheduleWarning,
  SmartScheduleStats,
  SmartScheduleResult,
} from '@/types';

/**
 * Generate Smart Schedule using greedy algorithm with fairness balancing
 *
 * @param shifts - Array of shifts to fill for the week
 * @param availability - Staff availability matrix
 * @param staffList - Array of staff IDs
 * @param allowMultipleShiftsPerDay - Allow staff to work multiple shifts in one day (default: true)
 * @returns Schedule with assignments, warnings, and statistics
 */
export function generateSmartSchedule(
  shifts: SmartScheduleShift[],
  availability: SmartScheduleAvailability,
  staffList: string[],
  allowMultipleShiftsPerDay: boolean = true
): SmartScheduleResult {

  // ========== STEP 1: Initialize ==========
  const assignments: SmartScheduleAssignment = {};
  const staffHours: { [staffId: string]: number } = {};
  const staffShiftCount: { [staffId: string]: number } = {};
  const warnings: SmartScheduleWarning[] = [];

  // Initialize counters for each staff
  staffList.forEach(staffId => {
    assignments[staffId] = {}; // Will store arrays of shiftIds per date
    staffHours[staffId] = 0;
    staffShiftCount[staffId] = 0;
  });


  // ========== STEP 2: Sort Shifts by Difficulty ==========
  // Strategy: Fill hardest-to-staff shifts first
  const sortedShifts = [...shifts].sort((a, b) => {
    const availableA = countAvailableStaff(a, availability, staffList, assignments);
    const availableB = countAvailableStaff(b, availability, staffList, assignments);

    // Primary: fewer available = harder = higher priority
    if (availableA !== availableB) {
      return availableA - availableB;
    }

    // Secondary: more required = more important
    if (a.required !== b.required) {
      return b.required - a.required;
    }

    // Tertiary: weekend > weekday (business priority)
    const isWeekendA = a.dayOfWeek === 0 || a.dayOfWeek === 6;
    const isWeekendB = b.dayOfWeek === 0 || b.dayOfWeek === 6;
    if (isWeekendA && !isWeekendB) return -1;
    if (!isWeekendA && isWeekendB) return 1;

    // Default: chronological order
    return a.date.localeCompare(b.date);
  });


  // ========== STEP 3: Assign Staff to Each Shift ==========
  for (const shift of sortedShifts) {
    const { date, shiftTemplateId, required, duration } = shift;

    // Get list of staff who:
    // 1. Are available for this shift
    // 2. Haven't been assigned THIS SPECIFIC shift yet
    // 3. (Optional) Haven't been assigned ANY shift on this date
    const candidates = staffList.filter(staffId => {
      const isAvailable = availability[staffId]?.[date]?.[shiftTemplateId];
      if (!isAvailable) return false;

      // Check if already assigned to this specific shift
      const shiftsToday = assignments[staffId][date] || [];
      const alreadyAssignedThisShift = shiftsToday.includes(shiftTemplateId);
      if (alreadyAssignedThisShift) return false;

      // If multiple shifts per day not allowed, check if assigned to any shift today
      if (!allowMultipleShiftsPerDay) {
        const alreadyAssignedToday = shiftsToday.length > 0;
        if (alreadyAssignedToday) return false;
      }

      return true;
    });


    // --- SCORING SYSTEM ---
    // Score each candidate to prioritize fairness
    const avgHours = Object.values(staffHours).reduce((a, b) => a + b, 0) / staffList.length;
    const avgShifts = Object.values(staffShiftCount).reduce((a, b) => a + b, 0) / staffList.length;

    const scoredCandidates = candidates.map(staffId => {
      let score = 0;

      // Factor 1: Workload balance (most important)
      // Staff with fewer hours gets higher priority
      const hoursDeviation = staffHours[staffId] - avgHours;
      score -= hoursDeviation * 10;  // -10 points per hour above average

      // Factor 2: Shift count balance
      // Staff with fewer shifts gets slight priority
      const shiftDeviation = staffShiftCount[staffId] - avgShifts;
      score -= shiftDeviation * 5;  // -5 points per shift above average

      // Factor 3: Avoid consecutive days (fatigue prevention)
      const yesterdayDate = getPreviousDate(date);
      const tomorrowDate = getNextDate(date);
      const workedYesterday = (assignments[staffId][yesterdayDate] || []).length > 0;
      const workedTomorrow = (assignments[staffId][tomorrowDate] || []).length > 0;
      if (workedYesterday && workedTomorrow) {
        score -= 15;  // Penalize working 3 days in a row
      } else if (workedYesterday || workedTomorrow) {
        score -= 5;   // Slight penalty for back-to-back days
      } else {
        score += 10;  // Bonus for having rest days adjacent
      }

      // Factor 4: Weekend fairness
      const isWeekend = shift.dayOfWeek === 0 || shift.dayOfWeek === 6;
      if (isWeekend) {
        const weekendShiftsThisWeek = countWeekendShifts(assignments[staffId]);
        score -= weekendShiftsThisWeek * 20;  // Rotate weekend work
      }

      // Factor 5: Random tie-breaker (avoid always picking same staff)
      score += Math.random() * 2;

      return { staffId, score };
    });


    // Sort by score (highest = best candidate)
    scoredCandidates.sort((a, b) => b.score - a.score);


    // --- ASSIGNMENT ---
    // Assign top N candidates
    const assignedCount = Math.min(required, scoredCandidates.length);
    for (let i = 0; i < assignedCount; i++) {
      const { staffId } = scoredCandidates[i];

      // Initialize array if needed
      if (!assignments[staffId][date]) {
        assignments[staffId][date] = [];
      }

      // Add shift to this staff's assignments for this date
      assignments[staffId][date].push(shiftTemplateId);
      staffHours[staffId] += duration;
      staffShiftCount[staffId] += 1;
    }


    // --- WARNING DETECTION ---
    if (assignedCount < required) {
      warnings.push({
        type: 'understaffed',
        severity: required - assignedCount >= 2 ? 'critical' : 'warning',
        shift: shift,
        assigned: assignedCount,
        required: required,
        message: `${formatDate(date)} ${shift.shiftName}: Cần ${required} người, chỉ có ${assignedCount} người rảnh`
      });
    }
  }


  // ========== STEP 4: Calculate Statistics ==========
  const stats = calculateStats(staffList, staffHours, staffShiftCount, shifts, assignments, availability);


  // ========== STEP 5: Final Validation ==========
  const validationWarnings = validateSchedule(assignments, staffHours, staffList);
  warnings.push(...validationWarnings);


  return { assignments, warnings, stats, staffHours, staffShiftCount };
}

/**
 * Count how many staff are available for a specific shift
 */
function countAvailableStaff(
  shift: SmartScheduleShift,
  availability: SmartScheduleAvailability,
  staffList: string[],
  assignments: SmartScheduleAssignment
): number {
  return staffList.filter(staffId => {
    const isAvailable = availability[staffId]?.[shift.date]?.[shift.shiftTemplateId];
    const shiftsToday = assignments[staffId]?.[shift.date] || [];
    const alreadyAssignedThisShift = shiftsToday.includes(shift.shiftTemplateId);
    return isAvailable && !alreadyAssignedThisShift;
  }).length;
}

/**
 * Count weekend shifts for a staff member
 */
function countWeekendShifts(staffAssignments: { [date: string]: string[] }): number {
  let count = 0;
  Object.keys(staffAssignments).forEach(date => {
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {  // Sunday or Saturday
      count += (staffAssignments[date] || []).length;
    }
  });
  return count;
}

/**
 * Get previous date
 */
function getPreviousDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

/**
 * Get next date
 */
function getNextDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

/**
 * Format date for display
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dayOfWeek = dayNames[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${dayOfWeek} ${day}/${month}`;
}

/**
 * Calculate fairness score (0-100, higher = more fair)
 */
function calculateFairnessScore(
  hours: number[],
  shiftCounts: number[]
): number {
  if (hours.length === 0) return 100;

  // Lower variance = more fair
  const hoursVariance = Math.max(...hours) - Math.min(...hours);
  const shiftsVariance = Math.max(...shiftCounts) - Math.min(...shiftCounts);

  // Score: 100 = perfect fairness, 0 = very unfair
  let score = 100;
  score -= hoursVariance * 2;      // -2 points per hour difference
  score -= shiftsVariance * 5;     // -5 points per shift difference

  return Math.max(0, Math.min(100, score));  // Clamp 0-100
}

/**
 * Calculate comprehensive statistics
 */
function calculateStats(
  staffList: string[],
  staffHours: { [staffId: string]: number },
  staffShiftCount: { [staffId: string]: number },
  shifts: SmartScheduleShift[],
  assignments: SmartScheduleAssignment,
  availability: SmartScheduleAvailability
): SmartScheduleStats {
  const hours = Object.values(staffHours);
  const shiftCounts = Object.values(staffShiftCount);

  const totalShiftsFilled = staffList.reduce((sum, staffId) => {
    const staffAssignments = Object.values(assignments[staffId] || {});
    const shiftCount = staffAssignments.reduce((count, shifts) => count + shifts.length, 0);
    return sum + shiftCount;
  }, 0);

  const totalShiftsRequired = shifts.reduce((sum, s) => sum + s.required, 0);

  return {
    totalShiftsFilled,
    totalShiftsRequired,
    coveragePercent: totalShiftsRequired > 0
      ? Math.round((totalShiftsFilled / totalShiftsRequired) * 100 * 10) / 10
      : 0,

    avgHoursPerStaff: hours.length > 0
      ? Math.round((hours.reduce((a, b) => a + b, 0) / staffList.length) * 10) / 10
      : 0,
    minHours: hours.length > 0 ? Math.min(...hours) : 0,
    maxHours: hours.length > 0 ? Math.max(...hours) : 0,
    hoursVariance: hours.length > 0 ? Math.max(...hours) - Math.min(...hours) : 0,

    avgShiftsPerStaff: shiftCounts.length > 0
      ? Math.round((shiftCounts.reduce((a, b) => a + b, 0) / staffList.length) * 10) / 10
      : 0,
    minShifts: shiftCounts.length > 0 ? Math.min(...shiftCounts) : 0,
    maxShifts: shiftCounts.length > 0 ? Math.max(...shiftCounts) : 0,

    fairnessScore: Math.round(calculateFairnessScore(hours, shiftCounts))
  };
}

/**
 * Validate final schedule and generate warnings
 */
function validateSchedule(
  assignments: SmartScheduleAssignment,
  staffHours: { [staffId: string]: number },
  staffList: string[]
): SmartScheduleWarning[] {
  const warnings: SmartScheduleWarning[] = [];

  // Check for staff with 0 shifts
  staffList.forEach(staffId => {
    const totalShifts = Object.values(assignments[staffId] || {}).reduce((sum, shifts) => sum + shifts.length, 0);
    if (totalShifts === 0) {
      warnings.push({
        type: 'no_shifts',
        severity: 'info',
        staffId,
        message: `Nhân viên không có ca nào - kiểm tra lại availability?`
      });
    }
  });

  return warnings;
}

/**
 * Get Monday of the week for a given date
 */
export function getWeekStartDate(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

/**
 * Get all dates in a week starting from Monday
 */
export function getWeekDates(weekStartDate: string): string[] {
  const dates: string[] = [];
  const start = new Date(weekStartDate);

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}

/**
 * Calculate shift duration in hours
 */
export function calculateShiftDuration(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  let endMinutes = endHour * 60 + endMin;

  // Handle overnight shifts
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }

  return (endMinutes - startMinutes) / 60;
}
