import React from 'react';
import LoadingRow from 'frontend/js/components/LoadingRow';
import ThemedTable from 'frontend/js/components/ThemedTable';
import TableMobileCard from 'frontend/js/components/TableMobileCard';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function LoadingState(props) {
  const classes = useStyles(props);
  const { isAboveSm } = useBreakpoint();

  return (
    <>
      {isAboveSm ? (
        <ThemedTable
          className={classes.table}
          headData={[
            { label: <LoadingRow className={classes.th1} isDark /> },
            { label: <LoadingRow className={classes.th2} isDark /> },
            { label: <LoadingRow className={classes.th3} isDark /> },
            { label: <LoadingRow className={classes.th4} isDark /> },
            { label: <LoadingRow className={classes.th5} isDark /> },
            { label: <LoadingRow className={classes.th6} isDark /> },
            { label: <LoadingRow className={classes.th7} isDark /> },
          ]}
          bodyData={[1, 2, 3, 4, 5].map((id) => {
            const row = [
              { content: <LoadingRow className={classes.td1} /> },
              { content: <LoadingRow className={classes.td2} /> },
              { content: <LoadingRow className={classes.td3} /> },
              { content: <LoadingRow className={classes.td4} /> },
              { content: <LoadingRow className={classes.td5} /> },
              { content: <LoadingRow className={classes.td6} /> },
              { content: <LoadingRow className={classes.td7} /> },
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
                { label: <LoadingRow className={classes.thMobile4} /> },
                { label: <LoadingRow className={classes.thMobile5} /> },
                { label: <LoadingRow className={classes.thMobile6} /> },
                {},
              ]}
              cardData={[
                { content: <LoadingRow className={classes.tdMobile1} /> },
                { content: <LoadingRow className={classes.tdMobile2} /> },
                { content: <LoadingRow className={classes.tdMobile1} /> },
                { content: <LoadingRow className={classes.tdMobile2} /> },
                { content: <LoadingRow className={classes.tdMobile1} /> },
                { content: <LoadingRow className={classes.tdMobile2} /> },
                { content: <LoadingRow className={classes.tdMobile7} /> },
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
