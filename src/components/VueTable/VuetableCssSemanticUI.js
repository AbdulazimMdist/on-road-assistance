export default {
  table: {
    tableWrapper: "overflow-x-auto scrollbar-track-gray-50 scrollbar-thumb-gray-200 scrollbar-thin",
    tableHeaderClass: "",
    tableBodyClass: "",
    tableClass: "v-table min-w-full bg-white border-collapse border rounded",
    loadingClass: "loading",
    ascendingIcon: "fad fa-sort-up m-1",
    descendingIcon: "fad fa-sort-down m-1",
    ascendingClass: "sorted-asc",
    descendingClass: "sorted-desc",
    sortableIcon: "fad fa-sort m-1",
    handleIcon: "grey sidebar icon",
  },

  pagination: {
    wrapperClass: "flex justify-between sm:justify-center items-center order-3 sm:order-2",
    activeClass: "!bg-cyan-700 text-white hover:!bg-cyan-800",
    disabledClass: "text-gray-500 pointer-events-none",
    pageClass: "pagination-min pagination-btn hover:bg-gray-50 !hidden sm:!flex",
    linkClass: "pagination-min pagination-btn hover:bg-gray-50 first:hidden last:hidden sm:first:flex sm:last:flex",
    paginationClass: "ui bottom attached segment grid",
    paginationInfoClass: "left floated left aligned six wide column",
    dropdownClass: "ui search dropdown",
    icons: {
      first: "fad fa-chevron-double-left",
      prev: "fad fa-chevron-left",
      next: "fad fa-chevron-right",
      last: "fad fa-chevron-double-right",
    },
  },

  paginationInfo: {
    infoClass: "left floated left aligned six wide column",
  },
};
