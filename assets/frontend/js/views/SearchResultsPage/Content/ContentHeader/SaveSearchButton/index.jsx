/* eslint-disable react/prop-types */
import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { FormattedMessage } from 'react-intl-phraseapp';
import classnames from 'classnames';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import SavedSearchesService from 'frontend/js/api/SavedSearches';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import { useSearchData } from 'frontend/js/views/SearchResultsPage/_Context/SearchDataContext';
import useStyles from './useStyles';

function SaveSearchButton({ className }) {
  const classes = useStyles();
  const intl = useIntl();
  const { isBelowSm } = useBreakpoint();
  const { isAuthenticated } = useCustomerHelper();
  const [{ searchHash }] = useSearchData();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { mutateAsync: saveSearch, isLoading } = useMutation((payload) =>
    SavedSearchesService.createSavedSearch(payload),
  );

  function handleClick() {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
    } else {
      saveSearch({ searchHash })
        .then(() => {
          window.dispatchEvent(new CustomEvent('refetchSavedSearches'));

          const key = enqueueSnackbar(intl.formatMessage({ id: 'searchResultsPage.searchSaved' }), {
            variant: 'success',
            action: (
              <Link href={RouterService.getRoute('savedSearches')} isTargetBlank isNoWrap>
                <FormattedMessage id="shared.cta.view" />
              </Link>
            ),
            onClick: () => {
              closeSnackbar(key);
            },
          });

          window.dispatchEvent(new CustomEvent('updateSavedSearchesCount', { detail: { increase: true } }));
        })
        .catch((e) => {
          const errorText = e?.networkError?.result?.errors?.error;

          if (errorText === 'Saved Search already exists.') {
            const key = enqueueSnackbar(intl.formatMessage({ id: 'searchResultsPage.searchAlreadyExists' }), {
              variant: 'error',
              action: (
                <Link href={RouterService.getRoute('savedSearches')} isTargetBlank isNoWrap>
                  <FormattedMessage id="shared.cta.view" />
                </Link>
              ),
              onClick: () => {
                closeSnackbar(key);
              },
            });
          }
        });
    }
  }

  return (
    <button id="SAVE_SEARCH_BUTTON" type="button" className={classnames(classes.root, className)} onClick={handleClick}>
      <div className={classes.icon}>
        {isLoading ? (
          <SpinnerWheel size={16} />
        ) : (
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path
              className={classes.path}
              d="M13.5078 8.5H8V14L1.24219 7.25781C1.04427 7.0651 0.869792 6.85156 0.71875 6.61719C0.567708 6.38281 0.4375 6.13802 0.328125 5.88281C0.21875 5.6276 0.138021 5.35938 0.0859375 5.07812C0.0338542 4.79688 0.00520833 4.52083 0 4.25C0 3.85938 0.0494792 3.48438 0.148438 3.125C0.247396 2.76562 0.390625 2.42708 0.578125 2.10938C0.765625 1.79167 0.986979 1.50521 1.24219 1.25C1.4974 0.994792 1.78385 0.773438 2.10156 0.585938C2.41927 0.398438 2.75781 0.255208 3.11719 0.15625C3.47656 0.0572917 3.85417 0.00520833 4.25 0C4.6875 0 5.07552 0.0494792 5.41406 0.148438C5.7526 0.247396 6.0625 0.382812 6.34375 0.554688C6.625 0.726562 6.89844 0.9375 7.16406 1.1875C7.42969 1.4375 7.70833 1.70573 8 1.99219C8.26562 1.71615 8.52865 1.45833 8.78906 1.21875C9.04948 0.979167 9.32552 0.768229 9.61719 0.585938C9.90885 0.403646 10.2214 0.260417 10.5547 0.15625C10.888 0.0520833 11.2604 0 11.6719 0C12.2656 0 12.8255 0.106771 13.3516 0.320312C13.8776 0.533854 14.3359 0.833333 14.7266 1.21875C15.1172 1.60417 15.4271 2.05208 15.6562 2.5625C15.8854 3.07292 16 3.63542 16 4.25C16 4.76042 15.9349 5.20573 15.8047 5.58594C15.6745 5.96615 15.4948 6.3151 15.2656 6.63281C15.0365 6.95052 14.7708 7.25521 14.4688 7.54688C14.1667 7.83854 13.8464 8.15625 13.5078 8.5ZM10 13.5V12.5H16V13.5H10ZM9 11V10H16V11H9Z"
            />
          </svg>
        )}
      </div>

      <div className={classes.label}>
        <FormattedMessage id={isBelowSm ? 'shared.cta.save' : 'searchResultsPage.saveSearch'} />
      </div>
    </button>
  );
}

export default SaveSearchButton;
