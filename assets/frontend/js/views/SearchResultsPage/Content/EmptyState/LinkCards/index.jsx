import React from 'react';
import Card from 'frontend/js/components/Card';
import get from 'lodash/get';
import CatalogService from 'frontend/js/api/CatalogService';
import { useQuery } from 'react-query';
import CardIndentedContent from 'frontend/js/components/Card/CardIndentedContent';
import { FormattedMessage } from 'react-intl-phraseapp';
import LinksGroup from './LinksGroup';
import useStyles from './useStyles';

function LinkCards() {
  const classes = useStyles();
  const { data, isLoading } = useQuery('inventory-data', () => CatalogService.getInventory());

  const popular = get(data, 'popular', []);
  const types = get(data, 'types', []);

  if (isLoading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Card title={<FormattedMessage id="shared.finderForm.popularMakes" />}>
        <CardIndentedContent className={classes.cardContentWrap}>
          <LinksGroup data={popular} />
        </CardIndentedContent>
      </Card>

      <Card title={<FormattedMessage id="shared.finderForm.vehicleTypes" />}>
        <CardIndentedContent className={classes.cardContentWrap}>
          <LinksGroup data={types} />
        </CardIndentedContent>
      </Card>
    </div>
  );
}

export default LinkCards;
