import { PaginationProps } from '../../types';

const Pagination = ({
  limit,
  total,
  offset,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  // Calculate pagination values
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = offset + limit < total;
  const hasPrevPage = offset > 0;

  // Handle page navigation
  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages) return;
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
  };

  const handlePrevious = () => {
    if (hasPrevPage && !disabled) {
      onPageChange(offset - limit);
    }
  };

  const handleNext = () => {
    if (hasNextPage && !disabled) {
      onPageChange(offset + limit);
    }
  };

  // Generate page numbers to display
  const getVisiblePages = (): (number | string)[] => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Always include first page
    range.push(1);

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always include last page if it exists and is different from first
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    // Add dots where there are gaps
    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  // Don't render if there's only one page or no data
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Results info */}
      <div className="text-sm text-base-content/60">
        Showing {Math.min(offset + 1, total)} to{' '}
        {Math.min(offset + limit, total)} of {total} results
      </div>

      {/* Pagination controls */}
      <div className="join">
        {/* Previous button */}
        <button
          className={`join-item btn btn-sm ${!hasPrevPage || disabled ? 'btn-disabled' : ''}`}
          onClick={handlePrevious}
          disabled={!hasPrevPage || disabled}
        >
          «
        </button>

        {/* Page numbers */}
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <button
                key={`dots-${index}`}
                className="join-item btn btn-sm btn-disabled"
              >
                ...
              </button>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-sm ${
                isCurrentPage ? 'btn-active' : ''
              } ${disabled ? 'btn-disabled' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
              disabled={disabled}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next button */}
        <button
          className={`join-item btn btn-sm ${!hasNextPage || disabled ? 'btn-disabled' : ''}`}
          onClick={handleNext}
          disabled={!hasNextPage || disabled}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
