import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import Button from 'frontend/js/components/Button';
import Image from 'frontend/js/components/Image';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import StickerHomeDelivery from './StickerHomeDelivery';
import Step from './Step';
import Step1Img from './img/step1.png';
import Step1MobileImg from './img/step1-mobile.png';
import Step2Img from './img/step2.png';
import Step2MobileImg from './img/step2-mobile.png';
import Step3Img from './img/step3.png';
import useStyles from './useStyles';

function HowToBidModal({ onSubmitSuccess }) {
  const intl = useIntl();
  const classes = useStyles();
  const { stateCode: customerStateCode } = useCustomerHelper();
  const { StateCA, StateTX } = ShippingOrderService;

  const [checked, setChecked] = useState(false);

  const isScheduleAcustomer = get(window.customer, 'scheduleA');
  const isScheduleA2Ccustomer = get(window.customer, 'scheduleA2C');

  const displayHomeDelivery = [StateCA, StateTX].includes(customerStateCode);
  const grid = { md: displayHomeDelivery ? 4 : 6, sm: 12 };

  return (
    <ModalWindow isOpen onClose={() => {}} width={displayHomeDelivery ? 1112 : 770}>
      <ModalWindowHeader title={intl.formatMessage({ id: 'joinAuctions.howToBid.title' })} />

      <ModalWindowBody hasFooter>
        <>
          <div className={classes.description}>
            <FormattedMessage id="joinAuctions.howToBid.description" />
          </div>

          <div className={classes.grid}>
            <Grid container spacing={1}>
              <Grid item md={grid.md} sm={grid.sm}>
                <Step
                  number="1"
                  text={intl.formatMessage({ id: 'joinAuctions.howToBid.step1' })}
                  images={{
                    big: <Image className={classes.step1Image} ratio={74} src={Step1Img} height="auto" alt="Step" />,
                    small: <Image ratio={100} src={Step1MobileImg} alt="Step" />,
                  }}
                />
              </Grid>
              <Grid item md={grid.md} sm={grid.sm}>
                <Step
                  number="2"
                  text={intl.formatMessage(
                    { id: 'joinAuctions.howToBid.step2' },
                    { isAbmNamedBid: isScheduleAcustomer || isScheduleA2Ccustomer },
                  )}
                  images={{
                    big: <Image className={classes.step2Image} ratio={82} src={Step2Img} height="auto" alt="Step" />,
                    small: <Image ratio={100} src={Step2MobileImg} alt="Step" />,
                  }}
                />
              </Grid>
              {displayHomeDelivery && (
                <Grid item md={grid.md} sm={grid.sm}>
                  <Step
                    number="3"
                    text={
                      <>
                        {intl.formatMessage({ id: 'shipping.homeDeliveryOnly' })}
                        <TooltipOnHover
                          content={
                            <div>
                              <FormattedMessage id="shipping.homeDeliveryOnly.tooltip" />
                            </div>
                          }
                          maxWidth={380}
                          isFlipEnabled={false}
                        />
                      </>
                    }
                    images={{
                      big: (
                        <div className={classes.step3Image}>
                          <Image ratio={82} src={Step3Img} height="auto" alt="Step" />
                          <StickerHomeDelivery />
                        </div>
                      ),
                      small: <StickerHomeDelivery />,
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        </>
      </ModalWindowBody>

      <ModalWindowFooter>
        <div className={classes.footer}>
          <div className="ta-c">
            <Tickbox
              className="d-ib"
              onChange={(_, value) => setChecked(value)}
              value={checked}
              name="agree"
              id="agree"
            >
              <FormattedMessage id="joinAuctions.howToBid.checkbox" />
            </Tickbox>
          </div>

          <Button
            className={classes.confirmButton}
            size="lg"
            label={intl.formatMessage({ id: 'joinAuctions.howToBid.action' })}
            onClick={onSubmitSuccess}
            isDisabled={!checked}
            isInline
          />
        </div>
      </ModalWindowFooter>
    </ModalWindow>
  );
}

HowToBidModal.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default HowToBidModal;
