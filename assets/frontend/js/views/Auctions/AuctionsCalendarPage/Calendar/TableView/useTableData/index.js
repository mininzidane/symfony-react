import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useHeadData from './useHeadData';
import useBodyData from './useBodyData';

function useTableData(auctions) {
  const { isBelowSm } = useBreakpoint();
  const bodyData = useBodyData(auctions, isBelowSm);
  const headData = useHeadData(isBelowSm);

  return { bodyData, headData };
}

export default useTableData;
