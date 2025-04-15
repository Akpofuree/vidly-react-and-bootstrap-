import React from "react";
import _ from "lodash";
const Pagination = (props) => {
  const { itemsCount, pageNumber, onHandleChangePage, currentNumber } = props;
  const pageCount = Math.ceil(itemsCount / pageNumber);
  const pages = _.range(1, pageCount + 1);
  if (pageCount === 1) return null;
  console.log(currentNumber);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li className="page-item" key={page}>
              <a className="page-link" onClick={() => onHandleChangePage(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
