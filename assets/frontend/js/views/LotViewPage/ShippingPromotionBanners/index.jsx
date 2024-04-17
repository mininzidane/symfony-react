/* eslint-disable react/prop-types */
import React, { Component, Fragment, Suspense } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withSnackbar } from 'notistack';
import { injectIntl } from 'react-intl-phraseapp';
import { Hidden } from '@material-ui/core';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import RouterService from 'frontend/js/api/RouterService';
import CustomerService from 'frontend/js/api/CustomerService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ShippingPromotionService from 'frontend/js/api/ShippingPromotionService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ContentPopover from 'frontend/js/components/ContentPopover';
import ButtonCross from 'frontend/js/components/ButtonCross';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

const ShippingPromotionForm = React.lazy(() => import('frontend/js/views/Shared/ShippingPromotionForm'));

class ShippingPromotionBanners extends Component {
  constructor(props) {
    super(props);

    this.localStorageKeyName = 'Abm::RemovedPromotionsList';
    this.state = {
      isShippingPromotionDataReceived: false,
      shippingPromotionData: {},
      countries: [],
      removedPromotions: LocalStorageService.get(this.localStorageKeyName) || [],
    };

    const { intl } = this.props;
    this.shippingPreorderSuccessMessage = intl.formatMessage({ id: 'shipping.shippingOrderHasBeenPlaced' });
    this.shippingPromotionService = new ShippingPromotionService();
    this.shippingOrderService = ShippingOrderService;
    this.eventTrackingService = new EventTrackingService();
    this.customerService = CustomerService;

    this.retrieveCountriesList = this.retrieveCountriesList.bind(this);
    this.getShippingPromotionData = this.getShippingPromotionData.bind(this);
    this.onOrderShippingClick = this.onOrderShippingClick.bind(this);
    this.onPreorderSubmit = this.onPreorderSubmit.bind(this);
    this.removeLot = this.removeLot.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
    this.getPromotionCopyByPurchase = this.getPromotionCopyByPurchase.bind(this);
  }

  componentDidMount() {
    this.retrieveCountriesList();
    this.getShippingPromotionData();
  }

  getPromotionCopyByPurchase(purchase) {
    const { intl } = this.props;

    if (
      typeof purchase === 'object' &&
      purchase.storageDaysRemaining &&
      parseInt(purchase.storageDaysRemaining, 10) > 0
    ) {
      return intl.formatMessage(
        { id: 'shippingPromo.daysOfFreeStorage' },
        { strong: (chunks) => <strong>{chunks}</strong>, days: purchase.storageDaysRemaining },
      );
    }

    return intl.formatMessage({ id: 'shippingPromo.orderShippingNowAndGetTheBestRates' });
  }

  onOrderShippingClick() {
    this.eventTrackingService.shippingPromotionButtonClick();
  }

  onPreorderSubmit({ lotId }) {
    const { enqueueSnackbar } = this.props;
    enqueueSnackbar(this.shippingPreorderSuccessMessage, { variant: 'success' });

    this.removeLot(lotId);
  }

  hideNotification(lotId) {
    const idArray = LocalStorageService.get(this.localStorageKeyName) || [];

    idArray.push(lotId);
    LocalStorageService.set(this.localStorageKeyName, idArray);
    this.eventTrackingService.shippingPromotionClosed();

    this.removeLot(lotId);
  }

  removeLot(lotId) {
    this.setState((prevState) => {
      const { shippingPromotionData } = prevState;
      shippingPromotionData.wonLotPurchases = shippingPromotionData.wonLotPurchases.filter(
        (bid) => bid.lot.id !== lotId,
      );
      shippingPromotionData.highBids = shippingPromotionData.highBids.filter((bid) => bid.lot.id !== lotId);

      return { shippingPromotionData };
    });
  }

  getShippingPromotionData() {
    this.shippingPromotionService
      .getShippingPromotionData()
      .then((json) => {
        this.setState({
          shippingPromotionData: json.data,
          isShippingPromotionDataReceived: true,
        });

        this.eventTrackingService.shippingPromotionShown();
      })
      .catch(() => {
        // Ignore;
      });
  }

  retrieveCountriesList() {
    return this.shippingOrderService
      .getShippingCountriesList()
      .then((countries) => {
        this.setState({ countries });
      })
      .catch(() => {
        // Ignore
      });
  }

  render() {
    const { intl, classes } = this.props;

    const { shippingPromotionData, isShippingPromotionDataReceived, removedPromotions, countries } = this.state;

    if (!isShippingPromotionDataReceived) {
      return null;
    }

    return (
      <>
        {shippingPromotionData.wonLotPurchases.map((purchase) => {
          if (!purchase) {
            return null;
          }

          return (
            <Fragment key={purchase.id}>
              {!removedPromotions.includes(purchase.lot?.id) && (
                <div className={classes.root}>
                  <ContainerFullScreen>
                    <div className="grid-x jc-sb ai-ct no-wrap sm-wrap pos-r">
                      <div className="grid-x w-a ai-ct no-wrap sm:w-100 sm-pr-25">
                        <div className={classnames(classes.badge, 'is-won')}>
                          {intl.formatMessage({ id: 'shippingPromo.wonItem' })}
                        </div>

                        <Hidden smDown>
                          <div className={classes.message}>{this.getPromotionCopyByPurchase(purchase)}</div>
                        </Hidden>

                        <a
                          href={purchase.links?.lot.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-up-hide"
                        >
                          {purchase.lot?.description}
                        </a>
                      </div>

                      <div className="grid-x w-a ai-ct no-wrap ml-a sm-ml-0 sm-wrap sm-mt-10 sm-wide">
                        <a
                          href={purchase.links?.lot.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ws-n mr-15 sm-hide"
                        >
                          {purchase.lot?.description}
                        </a>

                        <Hidden mdUp>
                          <div className={classes.message}>{this.getPromotionCopyByPurchase(purchase)}</div>
                        </Hidden>

                        <Button
                          label={intl.formatMessage({ id: 'shipping.orderShipping' })}
                          href={RouterService.getRoute('lotsWon', { shipping_order: purchase.id })}
                          onClick={this.onOrderShippingClick}
                          color="yellow"
                          size="sm"
                          className="sm-wide sm-mt-10 mr-30 sm-mr-0"
                          isInline
                          isNowrap
                        />

                        <ButtonCross
                          className={classes.cross}
                          isThin
                          onClick={() => this.hideNotification(purchase.lot?.id)}
                        />
                      </div>
                    </div>
                  </ContainerFullScreen>
                </div>
              )}
            </Fragment>
          );
        })}

        {shippingPromotionData.highBids.map((purchase, index) => {
          if (!purchase) {
            return null;
          }

          return (
            <Fragment key={purchase.id}>
              {!removedPromotions.includes(purchase.lot?.id) && (
                <div className={classes.root} key={purchase.id}>
                  <ContainerFullScreen>
                    <div className="grid-x jc-sb ai-ct no-wrap sm-wrap pos-r">
                      <div className="grid-x w-a ai-ct no-wrap sm:w-100 sm-pr-25">
                        <div className={classnames(classes.badge, 'is-high-bidder')}>
                          {intl.formatMessage({ id: 'bid.status.high_bidder' })}
                        </div>

                        <Hidden smDown>
                          <div className={classes.message}>
                            {intl.formatMessage(
                              {
                                id: 'shippingPromo.preorderShipping',
                              },
                              {
                                strong: (chunks) => <strong>{chunks}</strong>,
                              },
                            )}
                          </div>
                        </Hidden>

                        <a
                          href={purchase.links?.lot.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-up-hide"
                        >
                          {purchase.lot?.description}
                        </a>
                      </div>

                      <div className="grid-x w-a ai-ct no-wrap ml-a sm-ml-0 sm-wrap sm-mt-10 sm-wide">
                        <a
                          href={purchase.links?.lot.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ws-n mr-15 sm-hide"
                        >
                          {purchase.lot?.description}
                        </a>

                        <Hidden mdUp>
                          <div className={classes.message}>
                            {intl.formatMessage(
                              {
                                id: 'shippingPromo.preorderShipping',
                              },
                              {
                                strong: (chunks) => <strong>{chunks}</strong>,
                              },
                            )}
                          </div>
                        </Hidden>

                        <ContentPopover
                          trigger={
                            <Button
                              label={intl.formatMessage({ id: 'shipping.preorderShipping' })}
                              size="sm"
                              color="yellow"
                              className="sm-wide sm-mt-10 mr-30 sm-mr-0"
                              isNowrap
                              isInline
                            />
                          }
                          popoverTitle={intl.formatMessage({ id: 'shipping.confirmShippingPreorder' })}
                          popoverClass="mt-10"
                          popoverOptions={{ placement: 'bottom' }}
                          onClick={this.onOrderShippingClick}
                        >
                          <Suspense fallback={null}>
                            <ShippingPromotionForm
                              countries={countries}
                              isDrivable={purchase.lot?.isDrivable}
                              originZip={purchase.lot?.physicalZip}
                              lotId={purchase.lot?.id} // @todo add support for iaa lots
                              auction={purchase.lot?.inventoryAuction}
                              vin={purchase.lot?.vin}
                              onSubmit={this.onPreorderSubmit}
                              index={`high-bid-${index}`}
                            />
                          </Suspense>
                        </ContentPopover>
                      </div>

                      <ButtonCross
                        className={classes.cross}
                        onClick={() => this.hideNotification(purchase.lot?.id)}
                        isThin
                      />
                    </div>
                  </ContainerFullScreen>
                </div>
              )}
            </Fragment>
          );
        })}
      </>
    );
  }
}

function HookWrapper(props) {
  const classes = useStyles();
  return <ShippingPromotionBanners {...props} classes={classes} />;
}

ShippingPromotionBanners.propTypes = {
  enqueueSnackbar: PropTypes.func,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
};

ShippingPromotionBanners.defaultProps = {
  enqueueSnackbar: () => null,
  intl: null,
};

export default injectIntl(withSnackbar(HookWrapper));
