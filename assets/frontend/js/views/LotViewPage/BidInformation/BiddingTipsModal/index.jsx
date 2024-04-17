import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useBidFeeCalculator from 'frontend/js/hooks/useBidFeeCalculator';
import useIntl from 'frontend/js/hooks/useIntl';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCreditCardsCustomer from 'frontend/js/hooks/useCreditCardsCustomer';
import ClearVinButton from 'frontend/js/views/Shared/ClearVinButton';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import MembershipService from 'frontend/js/api/MembershipService';
import CountryService from 'frontend/js/api/CountryService';
import FeesCalculator from '../Sections/BidNow/FeesCalculator';
import Tickbox from './Tickbox';
import validationSchema from './validationSchema';
import ClearvinIconSvg from './img/ic_clearvin.svg';
import CalcIconSvg from './img/ic_calc.svg';
import CcIconSvg from './img/ic_creditcard.svg';
import ShippingIconSvg from './img/ic_shipping.svg';
import useStyles from './useStyles';

function BiddingTipsModal({ lot, isOpen, onSubmitSuccess, onClose, type, fees, customer, maxBid, onRequestLogin }) {
  const intl = useIntl();
  const classes = useStyles();
  const { balance, membershipType } = useCustomerHelper();
  const { freeCvReports } = membershipType;
  const [creditCards, isLoadingCreditCards] = useCreditCardsCustomer();
  const preferredCard = !isLoadingCreditCards && creditCards.find((card) => card.preferred);
  const { isBelowSm } = useBreakpoint();

  const isBIN = type === 'buyItNow';
  const buyItNowAmount = (isBIN && lot?.buyItNow) || 0;
  const { total: totalFees } = useBidFeeCalculator(fees, buyItNowAmount);

  const isDomestic = CountryService.isDomestic();

  async function handleSubmitSuccess() {
    await onSubmitSuccess();
    onClose();
  }

  const formik = useFormik({
    initialValues: {
      tip1: false,
      tip2: false,
      tip3: false,
      tip4: false,
      tip5: false,
      tip6: false,
      tip7: false,
      tip8: false,
      tip9: false,
    },
    validationSchema,
    onSubmit: handleSubmitSuccess,
  });

  const isGuestMembership = membershipType?.level === MembershipService.LEVEL.GUEST;

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} width={790}>
      <ModalWindowHeader
        className={classes.header}
        title={
          <div className={classes.title}>
            <div>{intl.formatMessage({ id: 'lotPage.bidInformation.biddingTipsModal.title' })}</div>
            <div className={classes.subtitle}>
              {intl.formatMessage({ id: 'lotPage.bidInformation.biddingTipsModal.subtitle' })}
            </div>
          </div>
        }
        onClose={onClose}
      />
      <ModalWindowBody hasFooter className={classes.body}>
        <>
          <div className={classes.desc}>
            <FormattedMessage id="lotPage.bidInformation.biddingTipsModal.desc" />
          </div>
          <Tickbox
            name="tip1"
            value={formik.values.tip1}
            onChange={formik.setFieldValue}
            error={formik.touched.tip1 && formik.errors.tip1}
            label={<FormattedMessage id="lotPage.bidInformation.biddingTipsModal.tip1" />}
          />
          <Tickbox
            name="tip2"
            value={formik.values.tip2}
            onChange={formik.setFieldValue}
            error={formik.touched.tip2 && formik.errors.tip2}
            label={
              !isGuestMembership && freeCvReports > 0 ? (
                <FormattedMessage
                  id="lotPage.bidInformation.biddingTipsModal.tip2.1"
                  values={{
                    a: (chunks) => (
                      <span
                        onClick={(e) => e.stopPropagation()}
                        onKeyPress={(e) => e.stopPropagation()}
                        role="button"
                        tabIndex={0}
                      >
                        <ClearVinButton
                          lot={lot}
                          component={({ isLoading, creditsCount, ...props }) => (
                            <span className={classes.clearVinCtaWrap}>
                              <ButtonLink {...props} label={chunks} size="md" data-cta />

                              {isLoading && (
                                <div className={classes.clearVinSpinner}>
                                  <SpinnerWheel size={14} thickness={2} color={formik.values.tip2 ? 'white' : 'blue'} />
                                </div>
                              )}
                            </span>
                          )}
                        />
                      </span>
                    ),
                    clearvinIcon: (
                      <img src={ClearvinIconSvg} width={18} height={18} alt="Clearvin" className={classes.icon} />
                    ),
                    nbsp: <>&nbsp;</>,
                  }}
                />
              ) : (
                <FormattedMessage
                  id="lotPage.bidInformation.biddingTipsModal.tip2.2"
                  values={{
                    clearvinIcon: (
                      <img src={ClearvinIconSvg} width={18} height={18} alt="Clearvin" className={classes.icon} />
                    ),
                    nbsp: <>&nbsp;</>,
                  }}
                />
              )
            }
          />
          <Tickbox
            name="tip3"
            value={formik.values.tip3}
            onChange={formik.setFieldValue}
            error={formik.touched.tip3 && formik.errors.tip3}
            label={
              <FormattedMessage
                id="lotPage.bidInformation.biddingTipsModal.tip3"
                values={{ depositAmount: NumberService.formatCurrency(balance) }}
              />
            }
          />
          <Tickbox
            name="tip4"
            value={formik.values.tip4}
            onChange={formik.setFieldValue}
            error={formik.touched.tip4 && formik.errors.tip4}
            label={
              isBIN ? (
                <FormattedMessage
                  id="lotPage.bidInformation.biddingTipsModal.tip4.2"
                  values={{
                    buyItNowPrice: NumberService.formatCurrency(buyItNowAmount),
                    totalPriceForThisMembership: NumberService.formatCurrency(totalFees),
                    calcIcon: (
                      <img
                        src={CalcIconSvg}
                        width={18}
                        height={20}
                        alt="Calc"
                        className={`${classes.icon} ${classes.calcIcon}`}
                      />
                    ),
                    nbsp: <>&nbsp;</>,
                    a: (chunks) => (
                      <span
                        onClick={(e) => e.stopPropagation()}
                        onKeyPress={(e) => e.stopPropagation()}
                        role="button"
                        tabIndex={0}
                        className="d-ib"
                      >
                        <FeesCalculator
                          customer={customer}
                          lot={lot}
                          fees={fees}
                          amount={buyItNowAmount}
                          onRequestLogin={onRequestLogin}
                          trigger={chunks}
                        />
                      </span>
                    ),
                  }}
                />
              ) : (
                <FormattedMessage
                  id="lotPage.bidInformation.biddingTipsModal.tip4.1"
                  values={{
                    calcIcon: (
                      <img
                        src={CalcIconSvg}
                        width={18}
                        height={20}
                        alt="Calc"
                        className={`${classes.icon} ${classes.calcIcon}`}
                      />
                    ),
                    nbsp: <>&nbsp;</>,
                    a: (chunks) => (
                      <span
                        onClick={(e) => e.stopPropagation()}
                        onKeyPress={(e) => e.stopPropagation()}
                        role="button"
                        tabIndex={0}
                        className="d-ib"
                      >
                        <FeesCalculator
                          customer={customer}
                          lot={lot}
                          fees={fees}
                          amount={maxBid}
                          onRequestLogin={onRequestLogin}
                          trigger={chunks}
                        />
                      </span>
                    ),
                  }}
                />
              )
            }
          />
          <Tickbox
            name="tip5"
            value={formik.values.tip5}
            onChange={formik.setFieldValue}
            error={formik.touched.tip5 && formik.errors.tip5}
            label={
              <FormattedMessage
                id={
                  isDomestic
                    ? 'lotPage.bidInformation.biddingTipsModal.tip5.domestic'
                    : 'lotPage.bidInformation.biddingTipsModal.tip5.intl'
                }
              />
            }
          />
          <Tickbox
            name="tip6"
            value={formik.values.tip6}
            onChange={formik.setFieldValue}
            error={formik.touched.tip6 && formik.errors.tip6}
            label={
              <FormattedMessage
                id="lotPage.bidInformation.biddingTipsModal.tip6"
                values={{
                  ccType: preferredCard?.type || '-',
                  ccLast4digits: preferredCard?.last4 || '-',
                  ccIcon: (
                    <img
                      src={CcIconSvg}
                      width={24}
                      height={24}
                      alt="Credit Card"
                      className={`${classes.icon} ${classes.creditCardIcon}`}
                    />
                  ),
                  nbsp: <>&nbsp;</>,
                }}
              />
            }
          />
          <Tickbox
            name="tip7"
            value={formik.values.tip7}
            onChange={formik.setFieldValue}
            error={formik.touched.tip7 && formik.errors.tip7}
            label={
              <FormattedMessage
                id="lotPage.bidInformation.biddingTipsModal.tip7"
                values={{
                  shippingIcon: (
                    <img
                      src={ShippingIconSvg}
                      width={22}
                      height={14}
                      alt="Shipping"
                      className={`${classes.icon} ${classes.shippingIcon}`}
                    />
                  ),
                  nbsp: <>&nbsp;</>,
                }}
              />
            }
          />
          <Tickbox
            name="tip8"
            value={formik.values.tip8}
            onChange={formik.setFieldValue}
            error={formik.touched.tip8 && formik.errors.tip8}
            label={<FormattedMessage id="lotPage.bidInformation.biddingTipsModal.tip8" />}
          />
          <Tickbox
            name="tip9"
            value={formik.values.tip9}
            onChange={formik.setFieldValue}
            error={formik.touched.tip9 && formik.errors.tip9}
            label={<FormattedMessage id="lotPage.bidInformation.biddingTipsModal.tip9" />}
          />
        </>
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <div className={classes.actions}>
          <ButtonOutlined
            className={classes.btn}
            onClick={onClose}
            label={intl.formatMessage({ id: 'shared.cta.cancel' })}
            isBackgroundWhite
          />
          <Button
            className={classes.btn}
            onClick={formik.submitForm}
            label={
              isBelowSm
                ? intl.formatMessage({ id: 'shared.cta.gotIt' })
                : intl.formatMessage({ id: 'lotPage.bidInformation.biddingTipsModal.cta.gotItTakeMeToTheBidding' })
            }
            color="blue"
            isLoading={formik.isSubmitting}
          />
        </div>
      </ModalWindowFooter>
    </ModalWindow>
  );
}

BiddingTipsModal.defaultProps = {
  onSubmitSuccess: () => {},
  isOpen: false,
  onClose: () => {},
  type: '',
  fees: {},
  customer: undefined,
  maxBid: 0,
  onRequestLogin: () => null,
};

BiddingTipsModal.propTypes = {
  lot: LotShape.isRequired,
  isOpen: PropTypes.bool,
  onSubmitSuccess: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.string,
  fees: PropTypes.object,
  customer: CustomerShape,
  maxBid: PropTypes.number,
  onRequestLogin: PropTypes.func,
};

export default BiddingTipsModal;
