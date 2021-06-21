export {};
// import { useCallback, useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import useDebouncedState from "./useDebouncedState";

// const usePagination = ({ defaultLimit = 10, maxCount = 10 }) => {
//   const history = useHistory();
//   const location = useLocation();
//   const [currentPage, setCurrentPageState] = useState<number>(
//     Number(new URLSearchParams(location.search).get("page") || 0)
//   );
//   const [limit, setLimitState] = useDebouncedState<number>(
//     Number(new URLSearchParams(location.search).get("perPage") || defaultLimit),
//     100
//   );
//   const [maxPages, setMaxPages] = useState<number>(
//     Math.floor(maxCount / limit)
//   );
//   const [skip, setSkip] = useState<number>(currentPage * limit);
//   const [pagesToShow, setPagesToShow] = useState<number[]>(
//     makePagesArray(currentPage, maxPages)
//   );
//   const [searchValue, setSearchValue] = useDebouncedState<string>("");

//   useEffect(() => {
//     setMaxPages(Math.floor(maxCount / limit));
//   }, [maxCount, limit]);

//   useEffect(() => {
//     setPagesToShow(makePagesArray(currentPage, maxPages));
//   }, [currentPage, limit, maxCount, maxPages]);

//   const setCurrentPage = useCallback(
//     (page: number, limit: number) => {
//       setCurrentPageState(page);
//       history.replace(
//         location.pathname + "?page=" + page + "&perPage=" + limit
//       );
//     },
//     [setCurrentPageState, history, location]
//   );

//   const goToPage = useCallback(
//     (page: number) => {
//       if (page <= maxPages + 1) {
//         setCurrentPage(page - 1, limit);
//         setSkip((page - 1) * limit);
//       }
//     },
//     [limit, maxPages, setCurrentPage, setSkip]
//   );

//   const goToNext = useCallback(() => {
//     const newPage = currentPage + 1;
//     if (newPage <= maxPages) {
//       setCurrentPage(newPage, limit);
//       setSkip(newPage * limit);
//     }
//   }, [maxPages, limit, currentPage, setSkip, setCurrentPage]);

//   const goToPrevious = useCallback(() => {
//     const newPage = currentPage - 1;
//     if (newPage >= 0) {
//       setCurrentPage(newPage, limit);
//       setSkip(newPage * limit);
//     }
//   }, [limit, currentPage, setSkip, setCurrentPage]);

//   const resetPagination = useCallback(
//     (newLimit?: number) => {
//       setSkip(0);
//       setCurrentPage(0, newLimit || limit);
//     },
//     [limit, setSkip, setCurrentPage]
//   );

//   const setLimit = useCallback(
//     (n: number) => {
//       setLimitState(Number(n) || defaultLimit);
//       resetPagination(n);
//     },
//     [defaultLimit, setLimitState, resetPagination]
//   );

//   const clearSearch = useCallback(() => {
//     resetPagination();
//     setSearchValue("", true);
//   }, [resetPagination, setSearchValue]);

//   return {
//     skip,
//     limit,
//     value: searchValue,
//     paginationProps: {
//       limit,
//       currentPage: currentPage + 1,
//       goToPage,
//       goToNext,
//       goToPrevious,
//       setLimit,
//       pagesToShow,
//     },
//     searchProps: {
//       searchValue,
//       setValue: setSearchValue,
//       clearSearch,
//     },
//   };
// };

// const makePagesArray = (currentPage: number, maxPages: number) => {
//   const leftPages = maxPages - currentPage;
//   if (leftPages >= 4) {
//     return [currentPage + 1, currentPage + 2, currentPage + 3, currentPage + 4];
//   } else if (maxPages < 4) {
//     const res = Array.from({ length: maxPages + 1 }, (_, i) => 1 + i);
//     while (res.length < 4 && res[0] - 1 > 1) {
//       res.unshift(res[0] - 1);
//     }
//     return res;
//   } else {
//     const res = Array.from(
//       { length: leftPages + 1 },
//       (_, i) => currentPage + 1 + i
//     );
//     while (res.length < 4 && res[0] - 1 > 1) {
//       res.unshift(res[0] - 1);
//     }
//     return res;
//   }
// };

// export default usePagination;
