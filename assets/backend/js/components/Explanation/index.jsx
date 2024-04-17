import React from 'react';
import PropTypes from 'prop-types';
import Popper from 'backend/js/components/Popper';
import useStyles from './useStyles';

function Explanation({ children }) {
  const classes = useStyles();

  const arrowEl = <div className={classes.arrowEl} />;

  return (
    <div className={classes.root}>
      <Popper
        placement="bottom-end"
        arrow
        arrowEl={arrowEl}
        isFlipEnabled={false}
        offset={10}
        style={{ zIndex: 10000 }}
        trigger={
          <div className={classes.triggerWrap}>
            <i className="fa fa-question-circle text-navy" />
          </div>
        }
      >
        <div className={classes.messageWrap}>{children}</div>
      </Popper>
    </div>
  );
}

Explanation.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Explanation;
