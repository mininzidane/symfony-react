import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'frontend/js/components/Select';
import LanguageService from 'frontend/js/api/LanguageService';
import GlobeIcon from './GlobeIcon';
import useStyles from './useStyles';

function LanguageSelect({ className, isFullLabel, placement, ...props }) {
  const classes = useStyles(props);
  let label = LanguageService.getCurrentLocale();
  if (isFullLabel) {
    const language = LanguageService.OPTIONS.find(({ value }) => value === LanguageService.getCurrentLocale())?.label;
    label = language || LanguageService.getLanguageByLocale(label);
  }

  return (
    <Select
      options={LanguageService.OPTIONS}
      classes={{
        listItem: classes.listItem,
      }}
      onChange={LanguageService.changeLocale}
      trigger={
        <div className={classNames(classes.root, className)}>
          <GlobeIcon className={classes.icon} />
          <span className={classes.label}>{label}</span>
        </div>
      }
      placement={placement}
    />
  );
}

LanguageSelect.propTypes = {
  isFullLabel: PropTypes.bool,
  className: PropTypes.string,
  placement: PropTypes.string,
};

LanguageSelect.defaultProps = {
  isFullLabel: false,
  className: '',
  placement: 'bottom',
};

export default LanguageSelect;
