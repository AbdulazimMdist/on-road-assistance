<script>
import CssSemanticUI from "./VuetableCssSemanticUI.js";

export default {
  props: {
    css: {
      type: Object,
      default() {
        return {};
      },
    },
    onEachSide: {
      type: Number,
      default() {
        return 2;
      },
    },
    firstPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data: function () {
    return {
      eventPrefix: "vuetable-pagination:",
      tablePagination: null,
      $_css: {},
    };
  },
  computed: {
    totalPage() {
      return this.tablePagination === null ? 0 : Math.ceil(this.tablePagination.total / this.perPage);
    },
    lastPage() {
      return this.tablePagination === null ? 0 : Math.ceil(this.tablePagination.total / this.perPage) - 1;
    },
    isOnFirstPage() {
      return this.tablePagination === null ? false : this.tablePagination.current === this.firstPage;
    },
    isOnLastPage() {
      return this.tablePagination === null ? false : this.tablePagination.current === this.lastPage;
    },
    notEnoughPages() {
      return this.totalPage < this.onEachSide * 2 + 4;
    },
    windowSize() {
      return this.onEachSide * 2 + 1;
    },
    windowStart() {
      if (!this.tablePagination || this.tablePagination.current <= this.onEachSide) {
        return 1;
      } else if (this.tablePagination.current >= this.totalPage - this.onEachSide) {
        return this.totalPage - this.onEachSide * 2;
      }

      return this.tablePagination.current - this.onEachSide;
    },
  },
  created() {
    this.mergeCss();
  },
  methods: {
    mergeCss() {
      this.$_css = { ...CssSemanticUI.pagination, ...this.css };
    },
    loadPage(page) {
      this.$emit(this.eventPrefix + "change-page", page);
    },
    isCurrentPage(page) {
      return page === this.tablePagination.current;
    },
    setPaginationData(tablePagination) {
      this.tablePagination = tablePagination;
    },
    resetData() {
      this.tablePagination = null;
    },
  },
};
</script>
