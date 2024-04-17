import React, { useContext, useMemo } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TableHeadControl from 'frontend/js/components/ThemedTable/TableHeadControl';
import SortContext from 'frontend/js/context/SortContext';

function useHeadData(isMobile) {
  const { sortOptions, sort, setSort } = useContext(SortContext);
  return useMemo(() => {
    let headData = [
      {
        label: (
          <TableHeadControl
            id="shared.label.saleTime"
            sortField="saleTime"
            sort={sort}
            setSort={setSort}
            sortOptions={sortOptions}
          />
        ),
      },
      {
        label: <FormattedMessage id="shared.label.saleName" />,
        // TODO <TableHeadControl id="Sale Name" sortField="saleName" sort={sort} setSort={setSort} sortOptions={sortOptions} />,
      },
    ];

    if (!isMobile) {
      headData = headData.concat([
        {
          label: <FormattedMessage id="shared.label.region" />,
          // TODO <TableHeadControl id="shared.label.region" sortField="region" sort={sort} setSort={setSort} sortOptions={sortOptions} />
        },
        {
          label: <FormattedMessage id="shared.label.sellType" />,
          // TODO <TableHeadControl id="Sell Type" sortField="sellType"  sort={sort} setSort={setSort}  sortOptions={sortOptions} />
        },
        {
          label: <FormattedMessage id="shared.label.currentSale" />,
          // TODO
          //   <TableHeadControl
          //     id="shared.label.currentSale"
          //     sortField="saleDate"
          //     sort={sort}
          //     setSort={setSort}
          //     sortOptions={sortOptions}
          //   />
        },
        {
          label: <FormattedMessage id="shared.label.nextSale" />,
          // TODO
          //   <TableHeadControl
          //     id="shared.label.nextSale"
          //     sortField="nextSale"
          //     sort={sort}
          //     setSort={setSort}
          //     sortOptions={sortOptions}
          //   />
        },
        {
          label: <FormattedMessage id="shared.label.futureSale" />,
        },
      ]);
    }
    return headData;
  }, [sortOptions, sort, setSort, isMobile]);
}

export default useHeadData;
