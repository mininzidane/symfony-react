/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import TimeIntervalSelect from 'frontend/js/views/SearchResultsPage/Sidebar/Accordion/ToggleSwitches/NewlyAdded/TimeIntervalSelect';
import SwitchPlane from 'frontend/js/components/Form/Switch/SwitchPlane';
import useStyles from './useStyles';

function NewlyAdded({ section, dispatch, options }) {
  const classes = useStyles();
  const activeOption = options.find((v) => v.selected);
  const [isEnabled, setIsEnabled] = useState(Boolean(activeOption));
  const [selectedOption, setSelectedOption] = useState(activeOption || options[0]);

  function dispatchOption(option) {
    dispatch({
      type: 'REFINE',
      payload: {
        type: 'RADIO',
        value: option.key,
        label: option.label,
        section,
      },
    });
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
    dispatchOption(option);
  }

  function handleToggleClick() {
    if (isEnabled) {
      setIsEnabled(false);
      dispatch({ type: 'RESET', payload: section });
    } else {
      dispatchOption(selectedOption);
      setIsEnabled(true);
    }
  }

  useEffect(() => {
    if (isEnabled && !selectedOption) {
      handleOptionSelect(options[0]);
    }
  }, [isEnabled]);

  useEffect(() => {
    if (isEnabled && !activeOption) {
      setIsEnabled(false);
    }
  }, [Boolean(activeOption)]);

  return (
    <div className={classes.root} key={section}>
      <div>
        <FormattedMessage id="searchResultsPage.newlyAdded" />{' '}
        <TimeIntervalSelect
          options={options}
          onSelect={handleOptionSelect}
          selectedOptionLabel={selectedOption.label}
          isDisabled={!isEnabled}
        />
      </div>

      <SwitchPlane className="tt-u" isChecked={isEnabled} onChange={handleToggleClick} />
    </div>
  );
}

export default NewlyAdded;
