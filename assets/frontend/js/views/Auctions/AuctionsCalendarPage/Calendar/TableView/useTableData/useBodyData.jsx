import { useContext, useMemo, useEffect } from 'react';
import PaginationContext from 'frontend/js/context/PaginationContext';
import getRowsArray from './getRowsArray';

function useBodyData(auctions, isMobile) {
  const { currentPage, itemsPerPage, setTotal, setMaxPagesCount } = useContext(PaginationContext);

  const bodyData = useMemo(() => {
    const auctionList = (auctions || []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return getRowsArray(auctionList, isMobile);
  }, [auctions, currentPage, isMobile]);

  useEffect(() => {
    const total = (auctions || []).length;
    setTotal(total);
    setMaxPagesCount(Math.ceil(total / itemsPerPage));
  }, [auctions]);

  return bodyData;
}

export default useBodyData;
