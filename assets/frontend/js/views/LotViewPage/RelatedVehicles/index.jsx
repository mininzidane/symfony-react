import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useQuery } from 'react-query';

import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotService from 'frontend/js/api/LotService';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import Tab from 'frontend/js/components/Tabs/Tab';
import LotsSuggestionCarousel from 'frontend/js/views/Shared/LotsSuggestionCarousel';
import LotPageBlock from '../LotPageBlock';

import useStyles from './useStyles';

function RelatedVehicles({ className, lot, placeholder }) {
  if (!lot || lot.FAKE) {
    return null;
  }

  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading } = useQuery(['related-vehicles-data', lot.id], () =>
    LotService.getRelatedVehicles(lot.id, lot.inventoryAuction),
  );

  const similarVehicles = get(data, 'similar', []);
  const recentlyViewed = get(data, 'recentlyViewed', []);
  const noData = !similarVehicles.length && !recentlyViewed.length;

  if (isLoading) {
    return placeholder;
  }

  if (noData) {
    return null;
  }

  const defaultTab = similarVehicles.length > 0 ? 'similar' : 'recent';

  return (
    <LotPageBlock>
      <div className={className} ref={() => setIsMounted(true)}>
        <TabsContainer defaultTab={defaultTab}>
          <div className={classes.toolbar}>
            <TabsToolbar>
              {similarVehicles.length > 0 && (
                <Tab
                  className={classes.tab}
                  value="similar"
                  label={<FormattedMessage id="lotPage.relatedVehicles.similarVehicles" />}
                />
              )}
              {recentlyViewed.length > 0 && (
                <Tab
                  className={classes.tab}
                  value="recent"
                  label={<FormattedMessage id="lotPage.relatedVehicles.recentlyViewed" />}
                />
              )}
            </TabsToolbar>

            <div id="controls" className={classes.controls} />
          </div>

          {isMounted && (
            <>
              {similarVehicles.length > 0 && (
                <TabContent id="similar">
                  <LotsSuggestionCarousel
                    controlsElementId="controls"
                    lots={similarVehicles}
                    analytics={{
                      gaEventCategory: 'lot_page',
                      gaEventLabel: [lot.year, lot.make, lot.model].join(' '),
                      gaEventName: 'similar_vehicle',
                      substep: 'similar_vehicles_block_click',
                      step: 'abm_lotpage',
                    }}
                  />
                </TabContent>
              )}

              {recentlyViewed.length > 0 && (
                <TabContent id="recent">
                  <LotsSuggestionCarousel
                    controlsElementId="controls"
                    lots={recentlyViewed}
                    analytics={{
                      gaEventCategory: 'lot_page',
                      gaEventLabel: [lot.year, lot.make, lot.model].join(' '),
                      gaEventName: 'recently_viewed',
                      substep: 'recently_viewed_vehicles_block_click',
                      step: 'abm_lotpage',
                    }}
                  />
                </TabContent>
              )}
            </>
          )}
        </TabsContainer>
      </div>
    </LotPageBlock>
  );
}

RelatedVehicles.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.node,
  lot: LotShape,
};

RelatedVehicles.defaultProps = {
  className: '',
  lot: undefined,
  placeholder: null,
};

export default RelatedVehicles;
