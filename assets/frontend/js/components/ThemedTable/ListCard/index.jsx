import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function ListCard({ cardData, headData }) {
  const classes = useStyles();

  return (
    <div className={classes.listCard}>
      {cardData.map((row, rowIndex) => {
        const { content } = row;
        const isEmpty = [undefined, null, ''].includes(content);

        return (
          <Fragment key={rowIndex}>
            <div className={classes.listRow} style={row.mobileStyle}>
              {headData[rowIndex].label && <div className={classes.listLabel}>{headData[rowIndex].label}:</div>}

              <div className={classes.listValue} style={{ textAlign: row.mobileStyle?.align }}>
                {isEmpty ? <span className={classes.dash}>—</span> : content}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

ListCard.propTypes = {
  cardData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  headData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ListCard;
