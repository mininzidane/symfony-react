/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotPageBlock from 'frontend/js/views/LotViewPage/LotPageBlock';
import Card from 'frontend/js/views/LotViewPage/LotPageCard';
import CardIndentedContent from 'frontend/js/views/LotViewPage/LotPageCard/CardIndentedContent';
import ConditionScore from 'frontend/js/views/LotViewPage/VehicleConditionReport/ConditionScore';
import Details from 'frontend/js/views/LotViewPage/VehicleConditionReport/Details';
import useStyles from './useStyles';

function VehicleConditionReport({ lot }) {
  const classes = useStyles();
  const { conditionReport, conditionReportScore } = lot || {};
  const { totalScore, mechanicalScore, details, cosmeticScore } = conditionReport || {};

  if (!conditionReport) {
    return null;
  }

  return (
    <LotPageBlock>
      <Card title={<FormattedMessage id="lotPage.vehicleConditionReport" />} className={classes.root}>
        <CardIndentedContent className={classes.content}>
          <ConditionScore
            score={conditionReportScore}
            totalScore={totalScore}
            mechanical={mechanicalScore}
            cosmetic={cosmeticScore}
          />
          {details?.length > 0 && <Details details={details} />}
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default VehicleConditionReport;
