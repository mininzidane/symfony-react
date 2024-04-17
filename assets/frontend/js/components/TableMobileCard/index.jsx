import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function TableMobileCard({ cardData, headData, hasColon, isHoverable }) {
  const classes = useStyles();
  const { isRaw } = cardData[0];

  return (
    <div className={classnames(!isRaw && classes.root, !isRaw && isHoverable && 'is-hoverable')}>
      {cardData.map((row, rowIndex) => {
        const { content } = row;
        const isEmpty = [undefined, null, ''].includes(content);

        return (
          <Fragment key={rowIndex}>
            <div className={classes.listRow} style={row.mobileStyle}>
              {headData[rowIndex].label && !row.isRaw && (
                <div className={classes.listLabel}>
                  {headData[rowIndex].label}
                  {hasColon && ':'}
                </div>
              )}

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

TableMobileCard.propTypes = {
  cardData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  headData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  hasColon: PropTypes.bool,
  isHoverable: PropTypes.bool,
};

TableMobileCard.defaultProps = {
  hasColon: true,
  isHoverable: true,
};

export default TableMobileCard;
