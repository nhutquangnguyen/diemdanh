export interface Store {
  id: string;
  owner_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  qr_code: string;
  radius_meters: number; // Bán kính cho phép check-in (mét)
  gps_required: boolean; // Yêu cầu xác thực GPS
  selfie_required: boolean; // Yêu cầu chụp selfie
  access_mode: 'staff_only' | 'anyone'; // Chế độ truy cập
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone: string;
  store_id: string;
  hour_rate: number; // Hourly rate in VND
  created_at: string;
}

export interface TimeSlot {
  id: string;
  store_id: string;
  name: string;
  start_time: string; // HH:mm format
  end_time: string;   // HH:mm format
  days_of_week: number[]; // 0-6, 0 = Chủ nhật
}

export interface CheckIn {
  id: string;
  staff_id: string;
  store_id: string;
  check_in_time: string;
  check_out_time?: string;
  latitude: number;
  longitude: number;
  distance_meters: number;
  check_out_latitude?: number;
  check_out_longitude?: number;
  check_out_distance_meters?: number;
  selfie_url: string;
  checkout_selfie_url?: string;
  status: 'success' | 'late' | 'wrong_location';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
}

export interface ShiftTemplate {
  id: string;
  store_id: string;
  name: string;
  start_time: string; // HH:mm:ss format
  end_time: string; // HH:mm:ss format
  grace_period_minutes: number;
  color: string; // Hex color code
  created_at: string;
  updated_at: string;
}

export interface StaffSchedule {
  id: string;
  staff_id: string;
  store_id: string;
  shift_template_id: string;
  scheduled_date: string; // YYYY-MM-DD format
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Extended types for component usage
export interface ScheduleWithDetails extends StaffSchedule {
  shift_template?: ShiftTemplate;
  staff?: Staff;
}

// Shared component types
export type StaffFilter = 'all' | 'working' | 'late' | 'not_checked';

export type AccessMode = 'staff_only' | 'anyone';

export type CheckInStatus = 'success' | 'late' | 'wrong_location';

// Week summary type for schedule
export interface WeekSummary {
  totalShifts: number;
  staffCount: number;
  totalHours: number;
}
