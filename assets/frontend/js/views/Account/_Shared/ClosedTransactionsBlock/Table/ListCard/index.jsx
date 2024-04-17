import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import useListCardStyles from 'frontend/js/components/ThemedTable/ListCard/useStyles';
import useStyles from './useStyles';

function ListCard({ headData, cardData, cellCount }) {
  const cardClasses = useListCardStyles();
  const extraCardClasses = useStyles();
  const [isDetailsShown, setDetailsShown] = useState(false);
  const subTable = cardData[cellCount];

  function handleClick() {
    setDetailsShown(!isDetailsShown);
  }

  return (
    <div
      className={classnames(cardClasses.listCard, extraCardClasses.listCard, { 'is-active': isDetailsShown })}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      {cardData.map((card, cardIndex) => (
        <Fragment key={cardIndex}>
          {cardIndex < cellCount && (
            <div className={cardClasses.listRow}>
              {headData[cardIndex].label && <div className={cardClasses.listLabel}>{headData[cardIndex].label}</div>}
              <div className={cardClasses.listValue}>{card.content}</div>
            </div>
          )}
        </Fragment>
      ))}

      {isDetailsShown && (
        <div className={extraCardClasses.subTable}>
          {subTable.content.map((subTableRow, rowIndex) => (
            <div key={rowIndex} className={extraCardClasses.subTableRow}>
              {subTableRow.map((subTableCell, cellIndex) => {
                const isSummaryRow = subTable.content[rowIndex].length === 1;

                if (cellIndex === 2) {
                  return null;
                }

                return (
                  <div className={extraCardClasses.subTableCell} key={cellIndex}>
                    {isSummaryRow ? (
                      <div className={extraCardClasses.subTableSummary}>
                        <span>
                          <FormattedMessage id="depositsPage.transactions.balance" />:
                        </span>
                        <span>{subTableCell.content}</span>
                      </div>
                    ) : (
                      <span>{subTableCell.content}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      <div className={classnames(extraCardClasses.stateIndicator, { 'is-active': isDetailsShown })}>
        <svg viewBox="0 0 12 8" xmlSpace="preserve">
          <path d="M10.6,0L6,4.9L1.4,0L0,1.5L6,8l6-6.5L10.6,0z" className="st0" />
        </svg>
      </div>
    </div>
  );
}

ListCard.propTypes = {
  cellCount: PropTypes.number.isRequired,
  cardData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  headData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ListCard;
