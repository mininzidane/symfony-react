/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import WatchlistToggle from 'frontend/js/views/Shared/WatchlistControl/WatchlistToggle';
import useStyles from './useStyles';

function WatchlistControlOutlined({
  id,
  auction,
  isActive,
  hasSnackbarLink,
  onTriggerClick,
  isSelect,
  isAbmInventory,
  isNpaInventory,
}) {
  const classes = useStyles();

  return (
    <div className="no-link">
      <WatchlistToggle isWatched={isActive} id={id} auction={auction} hasSnackbarLink={hasSnackbarLink}>
        {({ onClick, isWatched }) => {
          const className = classnames(
            classes.root,
            isWatched && classes.active,
            isSelect && 'is-select',
            isAbmInventory && 'is-abm-inventory',
            isNpaInventory && 'is-npa-inventory',
            'has-label',
          );
          const translationKey = isWatched ? 'shared.cta.watchlist.remove' : 'shared.cta.watchlist.watch';

          function handleClick() {
            onClick();
            onTriggerClick();
          }

          return (
            <button type="button" className={className} onClick={handleClick}>
              <svg width="14" height="13" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 15L7.26717 13.921C2.89043 10.1039 0.000229832 7.58656 0.000229832 4.4966C-0.00590491 3.90449 0.11083 3.31714 0.343602 2.76895C0.576373 2.22076 0.920504 1.72274 1.35585 1.30403C1.7912 0.885321 2.30902 0.554343 2.87899 0.330469C3.44897 0.106594 4.05965 -0.00567922 4.67529 0.000221048C5.4027 0.00550633 6.12047 0.1607 6.78023 0.455343C7.44 0.749985 8.02643 1.17723 8.5 1.70828C8.97357 1.17723 9.56 0.749985 10.2198 0.455343C10.8795 0.1607 11.5973 0.00550633 12.3247 0.000221048C12.9403 -0.00567922 13.551 0.106594 14.121 0.330469C14.691 0.554343 15.2088 0.885321 15.6441 1.30403C16.0795 1.72274 16.4236 2.22076 16.6564 2.76895C16.8892 3.31714 17.0059 3.90449 16.9998 4.4966C16.9998 7.58656 14.1096 10.1039 9.73283 13.9296L8.5 15Z" />
              </svg>
              <FormattedMessage id={translationKey} className={classes.label} />
            </button>
          );
        }}
      </WatchlistToggle>
    </div>
  );
}

WatchlistControlOutlined.propTypes = {
  id: PropTypes.oneOfType([(PropTypes.string, PropTypes.number)]).isRequired,
  auction: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasSnackbarLink: PropTypes.bool,
  onTriggerClick: PropTypes.func,
};

WatchlistControlOutlined.defaultProps = {
  hasSnackbarLink: true,
  onTriggerClick: () => {},
};

export default WatchlistControlOutlined;
