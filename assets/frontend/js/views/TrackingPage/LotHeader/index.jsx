/* eslint-disable react/prop-types */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import Breadcrumbs from './Breadcrumbs';
import Headline from './Headline';
import useStyles from './useStyles';

function LotHeader({ shippingOrder }) {
  const intl = useIntl();
  const { lot } = shippingOrder;
  const { isAuthenticated } = useCustomerHelper();
  const { isAboveSm } = useBreakpoint();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <div className={classes.grid}>
          <div className={classes.titleSection}>
            {isAboveSm && (
              <Breadcrumbs
                lot={lot}
                breadcrumbs={[
                  {
                    title: intl.formatMessage({ id: 'shipping.internationalShipping' }),
                    link: RouterService.getRoute('internationalShipping'),
                  },
                  {
                    title: intl.formatMessage({ id: 'shared.label.trackingMyOrder' }),
                    link: RouterService.getRoute('trackMyOrder'),
                  },
                  { title: intl.formatMessage({ id: 'shared.label.trackingInformation' }) },
                ]}
              />
            )}

            <Headline lot={lot} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </ContainerFullScreen>
    </div>
  );
}

export default LotHeader;
