/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import { Collapse } from '@material-ui/core';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryFlag from 'frontend/js/components/CountryFlag';
import OfficeInfo from './OfficeInfo';
import DropdownContent from './OfficeInfo/DropdownContent';
import useOpen from './OfficeInfo/DropdownContent/OfficeOpenStateLabel/useOpen';
import ArrowSvg from './OfficeInfo/img/arrow.svg';
import useStyles from './useStyles';

function CompactInfoBar({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const { name, officeHourData } = data;
  const { isOpen: isOfficeOpen, hasHoursInfo } = useOpen(officeHourData);
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      {isBelowSm ? (
        <div className={classes.mobileBar}>
          <div className={classes.title}>
            <CountryFlag iso_2={data.country.iso_2} className={classes.flag} />
            <div style={{ position: 'relative' }}>
              <strong>{name}</strong>
              {hasHoursInfo && (
                <div
                  className={classnames(classes.dot, isOfficeOpen && 'is-open')}
                  style={{ display: 'inline-block', margin: '0 0 2px 6px' }}
                />
              )}
            </div>
          </div>
          <button type="button" className={classes.button} onClick={() => setIsOpen(!isOpen)}>
            <span className={classes.label}>
              <FormattedMessage id="shared.label.officeInfo" />
            </span>
            <img src={ArrowSvg} alt="arrow" className={classnames(classes.arrow, isOpen && 'is-open')} />
          </button>

          <Collapse in={isOpen} timeout={300} unmountOnExit mountOnEnter>
            <div style={{ paddingBottom: 8 }}>
              <DropdownContent data={data} hasHeader={false} />
            </div>
          </Collapse>
        </div>
      ) : (
        <div className={classes.grid}>
          <div className={classes.title}>
            <CountryFlag iso_2={data.country.iso_2} className={classes.flag} />
            <div style={{ position: 'relative' }}>
              <strong>{name}</strong>
            </div>
          </div>

          {!isBelowSm && (
            <>
              <div className={classes.hours}>
                <div className={classes.line} />
                <div className={classes.hoursText}>
                  {hasHoursInfo && <div className={classnames(classes.dot, isOfficeOpen && 'is-open')} />}
                  <span>{data.officeHours}</span>
                </div>
                <div className={classes.line} />
              </div>

              <div className={classes.officeInfo}>
                <OfficeInfo data={data} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CompactInfoBar;
