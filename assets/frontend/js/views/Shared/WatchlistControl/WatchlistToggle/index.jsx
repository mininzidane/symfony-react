import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQueryClient, useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useSnackbar } from 'notistack';
import LotService from 'frontend/js/api/LotService';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function WatchlistToggle({ id, auction, isWatched, children, onMouseEnter, hasSnackbarLink, onToggle }) {
  const queryClient = useQueryClient();

  const updateCache = (watched) => () => {
    const lotQuery = ['lot-info-data', `Lot:${id}_${auction?.toLowerCase()}`];
    const lotInfoData = queryClient.getQueryData(lotQuery);

    if (lotInfoData) {
      queryClient.setQueryData(lotQuery, {
        ...lotInfoData,
        lot: {
          ...lotInfoData.lot,
          isWatched: watched,
        },
      });
    }
  };

  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleSuccess(watched, message) {
    window.dispatchEvent(new CustomEvent('updateWatchlistCount', { detail: { increase: watched } }));
    const key = enqueueSnackbar(message, {
      variant: 'success',
      action: hasSnackbarLink ? (
        <Link href={RouterService.getRoute('watchlist')} isTargetBlank isNoWrap>
          <FormattedMessage id="shared.cta.view" />
        </Link>
      ) : undefined,
      onClick: () => {
        closeSnackbar(key);
      },
    });
  }

  const { isAuthenticated } = useCustomerHelper(window.customer);

  const { isLoading: addLoading, mutateAsync: addToWatchlist } = useMutation(
    (payload) => LotService.addToWatchlist(payload),
    {
      onSuccess: updateCache(true),
    },
  );

  const { isLoading: removeLoading, mutateAsync: removeFromWatchlist } = useMutation(
    (payload) => LotService.removeFromWatchlist(payload),
    {
      onSuccess: updateCache(false),
    },
  );

  function handleAddToWatchlist() {
    addToWatchlist({ id, auction })
      .then(() => {
        handleSuccess(true, intl.formatMessage({ id: 'lotPage.notifications.watchlistAdded' }));
      })
      .catch(() => onToggle());
  }

  function handleRemoveFromWatchlist() {
    removeFromWatchlist({ id, auction })
      .then(() => {
        handleSuccess(false, intl.formatMessage({ id: 'lotPage.notifications.watchlistRemoved' }));
      })
      .catch(() => onToggle());
  }

  function handleClick() {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    onToggle();

    if (isWatched) {
      handleRemoveFromWatchlist();
    } else {
      handleAddToWatchlist();
    }
  }

  const classes = useStyles();
  const isLoading = addLoading || removeLoading;

  return (
    <div
      className={classnames(isWatched ? classes.bounceIn : classes.bounceOut, isLoading && 'pe-n')}
      onMouseEnter={onMouseEnter}
    >
      {children({ onClick: handleClick, isWatched })}
    </div>
  );
}

WatchlistToggle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  auction: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  isWatched: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  hasSnackbarLink: PropTypes.bool,
  onToggle: PropTypes.func,
};

WatchlistToggle.defaultProps = {
  onMouseEnter: () => {},
  onToggle: () => {},
  hasSnackbarLink: true,
};

export default WatchlistToggle;
