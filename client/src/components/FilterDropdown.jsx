import { STATUS_OPTIONS } from '../utils/constants';

const FilterDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field cursor-pointer sm:w-44"
    >
      <option value="All">All Statuses</option>
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
