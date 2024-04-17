/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

import SelectFilter from '../../_components/SelectFilter';

import useSelected from './useSelected';
import useOptions from './useOptions';
import useStyles from './useStyles';

function PortFilterForm({ refinements, dispatch, section, query }) {
  const classes = useStyles();
  const intl = useIntl();
  const { isAuthenticated } = useCustomerHelper();

  const [error, setError] = useState('');
  const [state, setState] = useSelected(section, refinements);
  const {
    loading,
    data: { ports, distances },
  } = useOptions(section, query, state.port);

  const { isBelowXs } = useBreakpoint();

  const isFormValid = useMemo(() => Boolean(state.port && state.distance !== null), [state]);

  const isAnySelected = useMemo(() => Boolean(state.port === 'any_port' || state.distance === 0), [state]);

  function refine(type = 'REFINE') {
    const distance = distances.find((v) => v.value === state.distance);
    const port = ports.find((v) => v.value === state.port);

    dispatch({
      type,
      payload: {
        type: 'RADIO',
        section,
        value: [state.port, state.distance].join('-'),
        label: `${distance.label} - ${port.label}`,
        meta: port,
      },
    });
  }

  function clear() {
    const refinement = refinements.find((v) => v.section === section);

    if (refinement) {
      dispatch({
        type: 'REMOVE',
        payload: refinement.hash,
      });
    }
  }

  function handleClick() {
    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }

    if (!state.port) {
      setError(intl.formatMessage({ id: 'searchResultsPage.filter.port.selectPort' }));
    } else if (state.distance === null) {
      setError(intl.formatMessage({ id: 'searchResultsPage.filter.selectDistance' }));
    }

    if (!isFormValid) {
      return;
    }

    if (isAnySelected) {
      clear();
    } else {
      refine();
    }
  }

  // Set correct label for refinement on init
  useEffect(() => {
    const refinement = refinements.find((v) => v.section === section);
    if (refinement && !refinement.label && isFormValid && ports.length && distances.length) {
      refine('FILL');
    }
  }, [refinements, isFormValid, ports, distances]);

  // Select 50mi by default
  useEffect(() => {
    if (state.distance === null && state.port && distances.length && !loading) {
      const matchesDefaultLabel = (label) => ['50 Miles', '50 mi'].some((v) => new RegExp(v, 'i').test(label));
      const defaultDistance = distances.find((distance) => matchesDefaultLabel(distance.label));

      if (defaultDistance && defaultDistance.value !== undefined) {
        setState((current) => ({
          ...current,
          distance: defaultDistance.value,
        }));
      }
    }
  }, [distances, state, loading]);

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <SelectFilter
          onChange={(port) => {
            setState({
              port,
              distance: null,
            });

            setError('');
          }}
          options={ports}
          value={state.port}
          placeholder={intl.formatMessage({ id: 'searchResultsPage.filter.port.choose' })}
          isPort
          error={Boolean(error && !state.port)}
        />

        <SelectFilter
          onChange={(distance) => {
            setState((current) => ({
              ...current,
              distance,
            }));

            setError('');
          }}
          options={distances}
          value={state.distance}
          placeholder={intl.formatMessage({ id: 'searchResultsPage.filters.anyDistance' })}
          error={Boolean(error && state.port && !state.distance)}
        />
      </div>

      {error && <div className={classes.error}>{error}</div>}

      {isBelowXs ? (
        <button
          type="button"
          className={classnames(classes.mobileButton, loading && 'is-disabled')}
          onClick={handleClick}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.4368 10.0637H10.7104L10.4582 9.81316C11.3845 8.73813 11.8936 7.36589 11.8926 5.94671C11.8926 5.1657 11.7388 4.39235 11.4399 3.6708C11.1411 2.94926 10.7031 2.29366 10.1509 1.74144C9.59872 1.18923 8.9432 0.751216 8.22177 0.452417C7.50034 0.153618 6.72712 -0.000114202 5.94629 6.36608e-08C5.16552 -0.0001142 4.39238 0.153589 3.67101 0.452334C2.94963 0.751079 2.29415 1.18901 1.74199 1.74113C1.18982 2.29326 0.751792 2.94876 0.452901 3.6702C0.15401 4.39164 0.000114285 5.16491 6.36471e-08 5.94584C-0.000114196 6.72692 0.153613 7.50037 0.452402 8.22202C0.75119 8.94366 1.18919 9.59936 1.74137 10.1517C2.29356 10.704 2.94912 11.1421 3.67061 11.4409C4.39209 11.7398 5.16538 11.8935 5.94629 11.8934C7.36463 11.8947 8.73621 11.3861 9.81103 10.4605L10.0633 10.711V11.4358L14.6361 16L16 14.6358L11.4368 10.0637ZM5.94629 10.0637C5.40535 10.0643 4.86961 9.9582 4.36971 9.75149C3.86981 9.54478 3.41556 9.24152 3.03293 8.85906C2.65031 8.4766 2.34683 8.02244 2.13985 7.52256C1.93287 7.02268 1.82645 6.48689 1.82668 5.94584C1.82668 5.40511 1.93318 4.86968 2.14009 4.37012C2.347 3.87057 2.65027 3.41667 3.03258 3.03436C3.41489 2.65205 3.86875 2.34881 4.36824 2.14196C4.86773 1.93511 5.40307 1.82871 5.94368 1.82882C7.03542 1.82882 8.08246 2.26255 8.85453 3.03461C9.62659 3.80668 10.0604 4.85386 10.0607 5.94584C10.0609 7.03759 9.62758 8.08473 8.85601 8.85696C8.08444 9.62919 7.0378 10.0633 5.94629 10.0637Z"
              fill="#2158F5"
            />
          </svg>
        </button>
      ) : (
        <ButtonOutlined
          label={<FormattedMessage id="shared.label.apply" />}
          isDisabled={loading}
          isThinBorder
          onClick={handleClick}
        />
      )}
    </div>
  );
}

export default PortFilterForm;
