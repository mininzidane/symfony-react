import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import CheckMarkSvg from './img/checkmark-green.svg';
import useStyles from './useStyles';

function ReceivedDataList({ className, data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.wrap}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <div className={classes.item}>
              <div>Received #{index + 1}:</div>
              <div className={classes.tracking}>{item.tracking}</div>
              {item.isLoading && (
                <div className={classes.loader}>
                  <SpinnerWheel size={15} color="gray-dark" />
                </div>
              )}
              {item.isSubmitted && <img alt="Checkmark" src={CheckMarkSvg} className={classes.checkmark} />}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

ReceivedDataList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
};

ReceivedDataList.defaultProps = {
  className: '',
  data: [],
};

export default ReceivedDataList;
