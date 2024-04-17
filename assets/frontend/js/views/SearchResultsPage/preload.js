import { GridViewResults, TableViewResults } from './Content/ContentBody';

function preload() {
  GridViewResults.preload().catch(() => {});
  TableViewResults.preload().catch(() => {});
}

export default preload;
