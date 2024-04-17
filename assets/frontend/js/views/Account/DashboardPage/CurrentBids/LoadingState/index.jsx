import React from 'react';
import LoadingRow from 'frontend/js/components/LoadingRow';
import ThemedTable from 'frontend/js/components/ThemedTable';
import ContainerNegative from 'frontend/js/components/ContainerNegative';
import LoadingCardMobile from 'frontend/js/views/Shared/VehicleCompactCard/LoadingState';
import PlaceholderSvg from 'frontend/images/shared/various/placeholder.svg';
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
              label: <LoadingRow className={classes.th1} isDark />,
            },
            {
              label: <LoadingRow className={classes.th2} isDark />,
            },
            {
              label: <LoadingRow className={classes.th3} isDark />,
            },
            {
              label: <LoadingRow className={classes.th4} isDark />,
            },
            {
              label: <LoadingRow className={classes.th5} isDark />,
            },
            {
              label: <LoadingRow className={classes.th6} isDark />,
            },
            {
              label: <LoadingRow className={classes.th7} isDark />,
            },
          ]}
          bodyData={[1, 2, 3, 4, 5].map((id) => {
            const row = [
              {
                content: (
                  <div className={classes.imageWrap}>
                    <img src={PlaceholderSvg} alt="Placeholder" />
                  </div>
                ),
                style: { padding: 2 },
              },
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
        <ContainerNegative>
          {[1, 2, 3].map((index) => (
            <LoadingCardMobile key={index} />
          ))}
        </ContainerNegative>
      )}
    </>
  );
}

LoadingState.propTypes = {};

export default LoadingState;
