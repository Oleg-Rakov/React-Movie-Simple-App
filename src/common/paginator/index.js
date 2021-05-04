import { useState } from 'react';
import styles from './style.module.css';
import cn from 'classnames';

const Paginator = ({ setPage, totalPageCount, page, portionSize = 10 }) => {
  const [pageSize, setPageSize] = useState(10);

  let countPages = Math.ceil(totalPageCount / pageSize);
  let pages = [];
  for (let i = 1; i <= countPages; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(countPages / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          className={styles.btn}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          &#x3C;
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p) => {
          return (
            <span
              className={cn(
                {
                  [styles.selectedPage]: page === p,
                },
                styles.pageNumber
              )}
              key={p}
              onClick={() => {
                setPage(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          className={styles.btn}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          &#x3E;
        </button>
      )}
    </div>
  );
};

export default Paginator;
