import React, { useState } from "react";

import "./style.scss";

const Pagination = ({ settings, handleChoosePage }) => {
  const [currentPage, setCurrentPage] = useState(settings.page || 1);

  const pageCount = settings.total / settings.per_page;

  let totalPages = [];

  for (let i = 1; i <= pageCount; i++) {
    totalPages.push(i);
  }

  const onHandleChoosePage = async (page) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    handleChoosePage(page);
  };

  return (
    <>
      {totalPages.map((pageNumber) => (
        <span
          className={`pagination__elem ${
            currentPage === pageNumber ? "active" : ""
          }`}
          key={pageNumber}
          onClick={() => onHandleChoosePage(pageNumber)}
        >
          {pageNumber}&nbsp;
        </span>
      ))}
    </>
  );
};

export default Pagination;
