/* eslint-disable no-unused-vars,react/prop-types */
import React from 'react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import InfoCircleOrangeSvg from 'frontend/images/shared/various/info-circle-orange.svg';
import ExclamationCircleRedSvg from 'frontend/images/shared/various/exclamation-circle-red.svg';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useStyles from './useStyles';

function ConditionScore({ score, mechanical, cosmetic }) {
  const TYPES = {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'belowAverage',
  };
  const BREAKPOINTS = {
    MAX: 90,
    [TYPES.EXCELLENT]: 65,
    [TYPES.GOOD]: 45,
    [TYPES.AVERAGE]: 20,
  };
  const classes = useStyles();
  const status = {
    [score < BREAKPOINTS.MAX && score >= BREAKPOINTS[TYPES.EXCELLENT]]: TYPES.EXCELLENT,
    [score < BREAKPOINTS[TYPES.EXCELLENT] && score >= BREAKPOINTS[TYPES.GOOD]]: TYPES.GOOD,
    [score < BREAKPOINTS[TYPES.GOOD] && score >= BREAKPOINTS[TYPES.AVERAGE]]: TYPES.AVERAGE,
    [score < BREAKPOINTS[TYPES.AVERAGE] && score >= 0]: TYPES.BELOW_AVERAGE,
  }.true;

  return (
    <div className={classnames(classes.root, status)}>
      <div className={classnames(classes.scoreSection, status)}>
        <div className={classes.scoreTitle}>
          <FormattedMessage id="lotPage.vehicleConditionReport.score.title" />:{' '}
          <strong>
            {score}/{BREAKPOINTS.MAX}
          </strong>
        </div>
        <div className={classnames(classes.scoreStatus, status)}>
          {[TYPES.EXCELLENT, TYPES.GOOD].includes(status) && (
            <>
              <img width={8} height={8} src={CheckmarkRoundGreenSvg} alt={status} />
              <FormattedMessage id="shared.label.grade.excellent" />
            </>
          )}

          {status === TYPES.AVERAGE && (
            <>
              <img width={8} height={8} src={InfoCircleOrangeSvg} alt={status} />
              <FormattedMessage id="shared.label.grade.average" />
            </>
          )}

          {status === TYPES.BELOW_AVERAGE && (
            <>
              <img width={8} height={8} src={ExclamationCircleRedSvg} alt={status} />
              <FormattedMessage id="shared.label.grade.belowAverage" />
            </>
          )}
        </div>
      </div>
      <div className={classes.statsSection}>
        <div className={classes.stat}>
          <FormattedMessage id="lotPage.vehicleConditionReport.stat.mechanical" />: <strong>{mechanical}</strong>
          <TooltipOnHover
            content={
              <div>
                <FormattedMessage id="lotPage.vehicleConditionReport.stat.mechanical.tooltip.p1" />
                <br />
                <br />
                <FormattedMessage id="lotPage.vehicleConditionReport.stat.mechanical.tooltip.p2" />
              </div>
            }
            badgeTop={-1}
          />
        </div>
        <div className={classes.stat}>
          <FormattedMessage id="lotPage.vehicleConditionReport.stat.cosmetic" />: <strong>{cosmetic}</strong>
          <TooltipOnHover
            content={
              <div>
                <FormattedMessage id="lotPage.vehicleConditionReport.stat.mechanical.tooltip.p1" />
                <br />
                <br />
                <FormattedMessage id="lotPage.vehicleConditionReport.stat.cosmetic.tooltip.p1" />
              </div>
            }
            badgeTop={-1}
          />
        </div>
      </div>
    </div>
  );
}
export default ConditionScore;
