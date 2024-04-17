import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Card from 'frontend/js/components/Card';
import ImageMultiRes from 'frontend/js/components/Image/ImageMultiRes';

import useStyles from './useStyles';

function InfoCard({ title, icon, stepNumber, img, children }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      {!isBelowSm && (
        <div className={classes.wrapImg}>
          <Card elevation={0} className={classes.img}>
            <ImageMultiRes x1={img.xl_x1} x2={img.xl_x2} alt={title} ratio={48} lazy />
          </Card>
        </div>
      )}

      <div className={classes.wrap}>
        <div className={classes.header}>
          <div className={classes.icon}>
            <img src={icon} alt="Icon" />
          </div>
          <div className={classes.title}>
            <span className={classes.stepNumber}>{stepNumber}</span> {title}
          </div>
        </div>

        {isBelowSm && (
          <div className={classes.wrapImg}>
            <Card elevation={2} className={classes.img}>
              <ImageMultiRes x1={img.sm_x1} x2={img.sm_x2} alt={title} ratio={48} lazy />
            </Card>
          </div>
        )}

        <div className={classes.description}>{children}</div>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  icon: PropTypes.string.isRequired,
  stepNumber: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  img: PropTypes.shape({
    xl_x1: PropTypes.string,
    xl_x2: PropTypes.string,
    sm_x1: PropTypes.string,
    sm_x2: PropTypes.string,
  }).isRequired,
};

export default InfoCard;
