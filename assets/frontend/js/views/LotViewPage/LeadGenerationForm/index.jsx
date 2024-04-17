import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import CountryService from 'frontend/js/api/CountryService';
import RouterService from 'frontend/js/api/RouterService';
import LeadService from 'frontend/js/api/LeadService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Button from 'frontend/js/components/Button';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import PhoneInputPlane from 'frontend/js/components/Form/PlaneTheme/PhoneInputPlane';
import TelegramSvg from 'frontend/images/shared/social/telegram-circle-30x30.svg';
import WhatsappSvg from 'frontend/images/shared/social/whatsapp-circle-30x30.svg';
import ViberSvg from 'frontend/images/shared/social/viber-circle-30x32.svg';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import LeadFromSchema from './LeadFromSchema';
import useStyles from './useStyles';

function LeadGenerationForm({ customer, lotId, countryCode, isAbmInventory }) {
  if (!isAbmInventory && !CountryService.isForeignCountryWithOffice(countryCode)) {
    return null;
  }

  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles();
  const officeData =
    OfficeLocationsService.getOfficeData(countryCode) || OfficeLocationsService.getIntlOfficeLocation();
  const eventTrackingService = new EventTrackingService();
  const { getRoute } = RouterService;
  const [isSent, setSent] = useState(false);
  const [senderMessage, setSenderMessage] = useState(null);
  const localStorageKey = 'Abm::LotPageLeeds';
  const LotPageLeeds = LocalStorageService.get(localStorageKey) || [];
  const isAlreadySubmitted = LotPageLeeds.includes(lotId);
  const firstName = (customer && customer.firstName) || '';
  const lastName = (customer && customer.lastName) || '';
  const customerPhoneNumber = customer && customer.phoneNumber ? `+${customer.phoneNumber.replace(/\D/g, '')}` : '';
  const intl = useIntl();
  const leadService = new LeadService();
  const ga = new GoogleAnalyticsService();

  const translationSets = {
    header: intl.formatMessage({ id: 'lotPage.contact.header' }),
    cta: intl.formatMessage({ id: 'lotPage.contact.cta' }),
    yourName: intl.formatMessage({ id: 'shared.label.yourName' }),
    phoneNumber: intl.formatMessage({ id: 'shared.label.phoneNumber' }),
    callOurOffice: intl.formatMessage({ id: 'contactUsPage.callOurOffice' }),
    applicationSent: intl.formatMessage({ id: 'lotPage.contact.applicationSent' }),
    viberInvite: intl.formatMessage({ id: 'lotPage.contact.viberInvite' }),
    copartOnlineAuction: intl.formatMessage({ id: 'lotPage.contact.copartOnlineAuction' }),
  };

  function updateSendMessage(senderFirstName) {
    setSenderMessage(
      (translationSets.contactReceived = intl.formatMessage(
        { id: 'lotPage.contact.contactReceived' },
        { senderFirstName },
      )),
    );
  }

  const formik = useFormik({
    initialValues: {
      name: customer ? `${firstName} ${lastName}` : '',
      phoneNumber: customerPhoneNumber,
    },
    validationSchema: LeadFromSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        country: countryCode,
      };

      if (isAbmInventory) {
        payload.inventory = lotId;
        payload.source = LeadService.SOURCE_AMB_INVENTORY_PAGE;
      } else {
        payload.lot = lotId;
        payload.source = LeadService.SOURCE_LOT_PAGE;
      }

      leadService.createLead(payload).then((response) => {
        if (response && response.lead && response.lead.createdAt) {
          if (!isAuthenticated) {
            ga.sendEvent('click', 'contact', 'contactus');
          }
          const name = response.lead.name.trim().split(' ')[0];
          updateSendMessage(name);
          setSent(true);
          LotPageLeeds.push(lotId);
          LocalStorageService.set(localStorageKey, LotPageLeeds);
        }
      });
    },
  });

  useEffect(() => {
    eventTrackingService.sendEvent({ name: 'lead_block_shown', step: 'abm_lotpage' });
  }, []);

  if (isAlreadySubmitted) {
    return null;
  }

  return (
    <LotPageBlock>
      <Card title={translationSets.header}>
        <CardIndentedContent>
          <div className={classes.root}>
            {isSent ? (
              <>
                <h4 className={classes.caption}>{translationSets.applicationSent}</h4>

                {(officeData.socialContacts.viberInvite && (
                  <p className={classes.subcaption}>
                    {senderMessage}
                    {translationSets.viberInvite}
                    <a href={getRoute(officeData.socialContacts.viberInvite, false, true)}>
                      {translationSets.copartOnlineAuction}
                    </a>
                    .
                  </p>
                )) || <p>{senderMessage}</p>}
              </>
            ) : (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <div className={classes.formWrap}>
                    <InputPlane
                      id="name"
                      name="name"
                      label={translationSets.yourName}
                      value={formik.values.name}
                      error={formik.errors.name}
                      touched={formik.touched.name}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      isLabelOnTop
                    />

                    <PhoneInputPlane
                      id="phoneNumber"
                      name="phoneNumber"
                      label={translationSets.phoneNumber}
                      value={formik.values.phoneNumber}
                      error={formik.errors.phoneNumber}
                      touched={formik.touched.phoneNumber}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      isLabelOnTop
                    />
                  </div>

                  <div className={classes.submitButton}>
                    <Button
                      type="submit"
                      label={translationSets.cta}
                      isLoading={formik.isSubmitting}
                      onClick={() => eventTrackingService.sendEvent({ name: 'lead_block_click', step: 'abm_lotpage' })}
                    />
                  </div>
                </form>

                <div className={classes.contacts}>
                  <div>
                    {translationSets.callOurOffice}
                    &nbsp;
                    {officeData.phoneNumber && (
                      <a href={`tel:${officeData.phoneNumber}`} className={classes.phoneNumber}>
                        {officeData.phoneNumber}
                      </a>
                    )}
                  </div>

                  <div className={classes.social}>
                    {officeData.socialContacts.viber && (
                      <a className="op-h" href={SocialLinksService.viber(officeData.socialContacts.viber)}>
                        <img src={ViberSvg} alt="Viber" />
                      </a>
                    )}

                    {officeData.socialContacts.whatsapp && (
                      <a className="op-h" href={SocialLinksService.whatsapp(officeData.socialContacts.whatsapp)}>
                        <img src={WhatsappSvg} alt="Whatsapp" />
                      </a>
                    )}

                    {officeData.socialContacts.telegram && (
                      <a className="op-h" href={SocialLinksService.telegram(officeData.socialContacts.telegram)}>
                        <img src={TelegramSvg} alt="Telegram" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

LeadGenerationForm.propTypes = {
  customer: CustomerShape,
  lotId: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  isAbmInventory: PropTypes.bool.isRequired,
};

LeadGenerationForm.defaultProps = {
  customer: null,
};

export default LeadGenerationForm;
