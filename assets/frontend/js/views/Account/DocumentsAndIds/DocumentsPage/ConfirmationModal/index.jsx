/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import RouterService from 'frontend/js/api/RouterService';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import ModalWindow from 'frontend/js/components/ModalWindow';
import Button from 'frontend/js/components/Button';
import PhoneLink from 'frontend/js/components/PhoneLink';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import CompanyService from 'frontend/js/api/CompanyService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useDocuments from '../useDocuments';
import useStyles from './useStyles';

function ConfirmationModal({ document, setDocument }) {
  const classes = useStyles();
  const radioDefaultValue = '';
  const [radioValue, setRadioValue] = useState(radioDefaultValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const { generateDocumentEnvelope } = useDocuments();

  const { email, officePhone } = CompanyService;
  const { fullName, address, city, stateName, zip, countryName } = useCustomerHelper();
  const { token, lot, fl2Fl } = document || {};
  const isFl2fl = fl2Fl || lot?.fl2Fl;
  const defaultRedirect = RouterService.getRoute('documentsSign', null, null, { token });

  const OPTIONS = [
    {
      label: <FormattedMessage id="documentsPage.confirmYourOwnership.flOption1" />,
      value: 0,
    },
    {
      label: <FormattedMessage id="documentsPage.confirmYourOwnership.flOption2" />,
      value: 1,
    },
  ];

  function handleChange(_, v) {
    setRadioValue(+v);
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    setDocument(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitError(false);
    setIsSubmitting(true);
    try {
      const payload = { token };
      if (isFl2fl) {
        payload.flExport = radioValue;
      }

      const { data } = await generateDocumentEnvelope(payload);
      RouterService.customRedirect(get(data, 'redirect', defaultRedirect));
    } catch (e) {
      setSubmitError(true);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setRadioValue(radioDefaultValue);
  }, [document]);

  return (
    <ModalWindow isOpen={Boolean(document)} onClose={handleClose} hasCloseButton={false} size="md">
      <ModalWindowHeader title={<FormattedMessage id="documentsPage.confirmYourOwnership" />} onClose={handleClose} />
      <ModalWindowBody>
        {submitError && (
          <div className="text-red mb-10">
            <FormattedMessage id="form.error.general" />
          </div>
        )}
        <form className={classes.root} onSubmit={handleSubmit}>
          <div>
            <div className={classes.row}>
              <FormattedMessage id="shared.label.name" isWrapped />
              <strong>{fullName}</strong>
            </div>
            <div className={classes.row}>
              <FormattedMessage id="shared.label.address" isWrapped />
              <strong>
                {address}
                ,
                <br />
                {city}, {stateName} {zip}, {countryName}
              </strong>
            </div>
          </div>

          {isFl2fl && (
            <div>
              <FormattedMessage id="documentsPage.confirmYourOwnership.selectOne" />
              <TooltipOnHover content={<FormattedMessage id="documentsPage.confirmYourOwnership.selectOneTooltip" />} />

              <div className={classes.radioButtonWrap}>
                <RadioGroup name="flExport" options={OPTIONS} value={radioValue} onChange={handleChange} />
              </div>
            </div>
          )}

          <FormattedMessage id="documentsPage.confirmYourOwnership.explanation1" isWrapped />
          <FormattedMessage
            id="documentsPage.confirmYourOwnership.explanation2"
            values={{
              email: <a href={email.href}>{email.raw}</a>,
              phone: <PhoneLink phone={officePhone.formatted} className={classes.phone} />,
            }}
            isWrapped
          />
          <FormattedMessage id="documentsPage.confirmYourOwnership.explanation3" className={classes.warningText} />
          <Button
            type="submit"
            isDisabled={isFl2fl && radioValue === radioDefaultValue}
            isLoading={isSubmitting}
            label={<FormattedMessage id="documentsPage.confirmYourOwnership.correctInfo" />}
          />
        </form>
      </ModalWindowBody>
    </ModalWindow>
  );
}

ConfirmationModal.propTypes = {};

export default ConfirmationModal;
