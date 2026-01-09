import { Staff, CheckIn, StaffFilter } from '@/types';
import { useStaffFiltering } from '@/hooks/useStaffFiltering';
import StaffFilterTabs from '@/components/today/StaffFilterTabs';
import StaffSearchBox from '@/components/today/StaffSearchBox';
import StaffAttendanceTable from '@/components/today/StaffAttendanceTable';

interface StoreTodayProps {
  staff: Staff[];
  todayCheckIns: CheckIn[];
  staffFilter: StaffFilter;
  staffSearch: string;
  expandedStaff: Set<string>;
  setStaffFilter: (filter: StaffFilter) => void;
  setStaffSearch: (search: string) => void;
  toggleStaffExpand: (staffId: string) => void;
}

export default function StoreToday({
  staff,
  todayCheckIns,
  staffFilter,
  staffSearch,
  expandedStaff,
  setStaffFilter,
  setStaffSearch,
  toggleStaffExpand,
}: StoreTodayProps) {
  const { currentlyWorking, notCheckedIn, lateCount } = useStaffFiltering(
    staff,
    todayCheckIns,
    staffFilter,
    staffSearch
  );

  return (
    <div className="px-4 sm:px-6 py-6">
      <StaffFilterTabs
        staffFilter={staffFilter}
        staffCount={staff.length}
        currentlyWorkingCount={currentlyWorking.length}
        lateCount={lateCount}
        notCheckedInCount={notCheckedIn}
        setStaffFilter={setStaffFilter}
      />

      <StaffSearchBox staffSearch={staffSearch} setStaffSearch={setStaffSearch} />

      <StaffAttendanceTable
        staff={staff}
        todayCheckIns={todayCheckIns}
        staffFilter={staffFilter}
        staffSearch={staffSearch}
        expandedStaff={expandedStaff}
        toggleStaffExpand={toggleStaffExpand}
      />
    </div>
  );
}
