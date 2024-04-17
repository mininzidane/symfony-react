import React from 'react';
import LoadingRow from 'frontend/js/components/LoadingRow';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableMobileCard from 'frontend/js/components/TableMobileCard';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function LoadingState() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <>
      {isAboveSm ? (
        <ThemedTable
          className={classes.table}
          headData={[
            {
              label: <LoadingRow className={classes.th1} />,
            },
            {
              label: <LoadingRow className={classes.th2} />,
            },
            {
              label: <LoadingRow className={classes.th3} />,
            },
          ]}
          bodyData={[1, 2, 3, 4, 5].map((id) => {
            const row = [
              { content: <LoadingRow className={classes.td1} /> },
              { content: <LoadingRow className={classes.td2} /> },
              { content: <LoadingRow className={classes.td3} /> },
            ];

            row.id = id;
            return row;
          })}
        />
      ) : (
        <div className={classes.mobileWrap}>
          {[1, 2, 3].map((row) => (
            <TableMobileCard
              hasColon={false}
              headData={[
                { label: <LoadingRow className={classes.thMobile1} /> },
                { label: <LoadingRow className={classes.thMobile2} /> },
                { label: <LoadingRow className={classes.thMobile3} /> },
              ]}
              cardData={[
                { content: <LoadingRow className={classes.tdMobile1} /> },
                { content: <LoadingRow className={classes.tdMobile2} /> },
                { content: <LoadingRow className={classes.tdMobile3} /> },
              ]}
              key={row}
            />
          ))}
        </div>
      )}
    </>
  );
}

LoadingState.propTypes = {};

export default LoadingState;
