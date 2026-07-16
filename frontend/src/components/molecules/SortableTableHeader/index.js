export default function SortableTableHeader({
  label,
  sortKey,
  sortConfig,
  onSort,
}) {
  const isActive = sortConfig.key === sortKey;

  const sortIndicator = isActive
    ? sortConfig.direction === 'asc'
      ? ' ↑'
      : ' ↓'
    : '';

  const ariaSort = isActive
    ? sortConfig.direction === 'asc'
      ? 'ascending'
      : 'descending'
    : 'none';

  return (
    <th
      className="px-5 py-4 text-left"
      aria-sort={ariaSort}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="font-semibold text-muted transition hover:text-primary"
      >
        {label}
        {sortIndicator}
      </button>
    </th>
  );
}