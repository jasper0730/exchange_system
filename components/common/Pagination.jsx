"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiLastPage,BiFirstPage  } from "react-icons/bi";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const buttonClasses =
    "disabled:cursor-default disabled:pointer-events-none disabled:text-gray-200 hover:text-gray-500 transition-colors cursor-pointer";

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage === 5) {
        pages.push(1, "...", 4, 5, 6, "...", totalPages);
      } else if (currentPage === 6) {
        pages.push(1, "...", 5, 6, 7, "...", totalPages);
      } else if (currentPage >= 7 && currentPage <= totalPages - 3) {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      } else {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      }
    }

    return pages.map((page, idx) =>
      page === "..." ? (
        <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 font-medium cursor-pointer ${
            page === currentPage ? "text-blue-600 font-bold" : "hover:text-blue-500"
          }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="flex justify-center items-center gap-2 text-sm">
      <button
        type="button"
        className={buttonClasses}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        title="第一頁"
      >
        <BiFirstPage size="24" />
      </button>
      <button
        type="button"
        className={buttonClasses}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        title="上一頁"
      >
        <FaChevronLeft />
      </button>
      <div className="flex items-center gap-1">{renderPageNumbers()}</div>
      <button
        type="button"
        className={buttonClasses}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        title="下一頁"
      >
        <FaChevronRight />
      </button>
      <button
        type="button"
        className={buttonClasses}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(totalPages)}
        title="最後一頁"
      >
        <BiLastPage size="24"/>
      </button>
    </div>
  );
}
