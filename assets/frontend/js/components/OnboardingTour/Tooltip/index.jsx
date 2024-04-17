/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

import t from 'frontend/js/api/TranslatorService';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ButtonCross from 'frontend/js/components/ButtonCross';
import ButtonText from 'frontend/js/components/ButtonText';

import useStyles from './useStyles';

function Tooltip({ onClose, onPrev, onNext, onGoTo, title, description, total, current }) {
  const classes = useStyles();

  const isLastPage = total === current + 1;
  const isFirstPage = current === 0;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        {title}
        <ButtonCross onClick={onClose} size={11} color="white" isExtraHitbox isThin />
      </div>

      <div className={classes.content}>
        <div>{description}</div>

        <div className={classes.dots}>
          {new Array(total).fill(0).map((_, index) => (
            <button
              key={index}
              className={classNames(
                classes.dot,
                index < current && classes.dotFilled,
                index === current && classes.dotActive,
              )}
              onClick={() => onGoTo(index)}
              type="button"
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={classes.footer}>
        <ButtonText label={t('shared.skip')} size="sm" color="blue" isRegularCase fontWeight={400} onClick={onClose} />
        <div>
          {!isFirstPage && (
            <ButtonOutlined
              onClick={onPrev}
              className="mr-10"
              isInline
              isThinBorder
              label={t('shared.prev')}
              size="sm"
            />
          )}
          <Button onClick={onNext} isInline label={isLastPage ? t('shared.done') : t('shared.next')} size="sm" />
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
