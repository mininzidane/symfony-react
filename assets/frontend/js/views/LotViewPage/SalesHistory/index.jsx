import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useQuery } from 'react-query';

import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import AccordionItem from 'frontend/js/components/Accordion/Item';
import CountryService from 'frontend/js/api/CountryService';
import MembershipService from 'frontend/js/api/MembershipService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import ListView from './ListView';
import TableView from './TableView';
import AuthOverlay from './AuthOverlay';
import useStyles from './useStyles';

function SalesHistory({ lot, initialExpanded, className }) {
  if (!lot || lot.FAKE) {
    return null;
  }

  const { isAuthenticated, blAmount, membershipType } = useCustomerHelper();
  const { isAboveSm } = useBreakpoint();
  const membershipName = get(membershipType, 'name');
  const classes = useStyles();
  const intl = useIntl();

  const [expanded, setExpanded] = useState(initialExpanded);

  const isShouldNotBeShown = !isAuthenticated || Boolean(lot.vinHash) || (!lot.sold && CountryService.isDomestic());
  const requireUpgrade = !isAuthenticated || (lot.sold && membershipName === MembershipService.TYPE.GUEST);
  const requireDeposit = !isAuthenticated || blAmount <= 0;

  const payload = { vin: lot.vin, auction: lot.inventoryAuction };

  const { data, isLoading } = useQuery(['sales-history-data', payload], () => LotService.getSalesHistory(payload), {
    enabled: Boolean(lot.vin) && !isShouldNotBeShown,
  });

  if (isShouldNotBeShown || isLoading || !lot) {
    return null;
  }

  const sales = [...get(data, 'lots', [])];

  if (!lot.vin || (!data && isLoading) || !sales.length) {
    return null;
  }

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <LotPageBlock>
      <Card className={className}>
        <div style={{ position: 'relative' }}>
          {isAuthenticated ? (
            <>
              <div className={classes.content}>
                <AccordionItem
                  expanded={expanded}
                  handleChange={handleChange}
                  classes={{
                    root: classes.accordionItem,
                    header: classes.header,
                    arrow: classes.arrow,
                    content: classes.accordionItemContent,
                  }}
                  title={
                    <CardIndentedContent className={classes.title}>
                      <span className={classes.headerText}>
                        {intl.formatMessage({ id: 'lotPage.soldInfo.title' })} ({sales.length})
                      </span>
                    </CardIndentedContent>
                  }
                  id="salesHistoryAccordion"
                >
                  {isAboveSm ? (
                    <TableView sales={sales} requireDeposit={requireDeposit} requireUpgrade={requireUpgrade} />
                  ) : (
                    <ListView sales={sales} requireDeposit={requireDeposit} requireUpgrade={requireUpgrade} />
                  )}
                </AccordionItem>
              </div>
            </>
          ) : (
            <AuthOverlay />
          )}
        </div>
      </Card>
    </LotPageBlock>
  );
}

SalesHistory.propTypes = {
  lot: LotShape,
  initialExpanded: PropTypes.bool,
  className: PropTypes.string,
};

SalesHistory.defaultProps = {
  lot: {},
  initialExpanded: false,
  className: '',
};

export default SalesHistory;
