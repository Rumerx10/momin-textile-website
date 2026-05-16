const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  return (
    <div className="overflow-x-auto scrollbar-modern">
      <table className="w-full animate-pulse">
        {/* Header */}
        <thead>
          <tr className="bg-bgGray">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-24" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-4">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableSkeleton;
