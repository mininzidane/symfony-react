import React, { useEffect, useState, useRef } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import useBankName from 'frontend/js/hooks/useBankName';
import ButtonLink from 'frontend/js/components/ButtonLink';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import InfoCircleBlueSvg from 'frontend/images/shared/various/info-circle-blue.svg';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import CrossRedSvg from 'frontend/images/shared/various/cross-red.svg';
import useStyles from './useStyles';

function ACHForm({ formik }) {
  const intl = useIntl();
  const classes = useStyles();
  const triggerRef = useRef();
  const [bankName, bankNameIsLoading] = useBankName(formik.values.routingNumber);
  const [isNameDisabled, setIsNameDisabled] = useState(Boolean(formik.values.senderName));

  function handleChangeName() {
    setIsNameDisabled((value) => {
      formik.setFieldValue('name', !value ? formik.values.senderName : '');
      return !value;
    });
  }

  const translationSets = {
    name: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.name' }),
    routingNumber: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.routingNumber' }),
    accountNumber: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.accountNumber' }),
    confirmAccountNumber: intl.formatMessage({ id: 'depositsPage.transactions.deposits.confirmModal.confirmAccount' }),
    routingNumberLabel: intl.formatMessage({
      id: 'depositsPage.transactions.deposits.confirmModal.routingNumberLabel',
    }),
  };

  const isNeedVoidedCheck = !formik.values.senderName || formik.values.senderName !== formik.values.name;

  useEffect(() => {
    formik.setFieldValue('bankName', bankName);
    if (bankName) {
      formik.setFieldTouched('routingNumber');
    }
  }, [bankName]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="pt-2">
        <div className={formik.values.senderName ? 'mt-5' : 'mt-10 pt-2'}>
          {formik.values.senderName && (
            <div className="ta-r mb-5">
              <ButtonLink onClick={handleChangeName} label={isNameDisabled ? 'Change Name' : 'Refund To Sender'} />
            </div>
          )}

          <InputPlane
            id="name"
            name="name"
            label={translationSets.name}
            value={formik.values.name}
            touched={formik.touched.name}
            error={formik.errors.name}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
            disabled={isNameDisabled}
          />
        </div>

        {isNeedVoidedCheck && (
          <>
            <div>
              {formik.values.voidedCheck.length === 0 ? (
                <div className={classnames(classes.notification, classes.uploadVoidedCheckNotification)}>
                  <img width={14} src={InfoCircleBlueSvg} alt="Notification" />
                  <div>
                    <FormattedMessage
                      id="depositsPage.transactions.deposits.confirmModal.uploadVoidedCheckNotification"
                      values={{ a: (chunk) => <ButtonLink label={chunk} onClick={() => triggerRef.current.click()} /> }}
                    />
                  </div>
                </div>
              ) : (
                <div className={classnames(classes.notification, classes.uploadedSuccess)}>
                  <img width={14} src={CheckmarkRoundGreenSvg} alt="Checkmark" />
                  <div>
                    <FormattedMessage
                      id="depositsPage.transactions.deposits.confirmModal.uploadSuccess"
                      values={{ fileName: formik.values.voidedCheck[0].name }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => formik.setFieldValue('voidedCheck', [])}
                    className={classes.clear}
                  >
                    <img src={CrossRedSvg} alt="Close" />
                  </button>
                </div>
              )}
            </div>

            <FilesUpload
              id="voidedCheck"
              name="voidedCheck"
              fileValues={formik.values.voidedCheck}
              accept="image/png,image/jpg,image/jpeg,.pdf"
              error={formik.errors.voidedCheck}
              touched={formik.touched.voidedCheck}
              onTouched={formik.setFieldTouched}
              onError={formik.setFieldError}
              onChange={formik.setFieldValue}
              rootClassName={classes.filesForm}
              triggerRef={triggerRef}
              label="Upload"
            />
          </>
        )}

        <div className="mt-10">{translationSets.routingNumberLabel}</div>

        <InputPlane
          className="mt-10 pt-2"
          id="routingNumber"
          name="routingNumber"
          label={translationSets.routingNumber}
          value={formik.values.routingNumber}
          touched={formik.touched.routingNumber}
          error={formik.errors.routingNumber}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
          loading={bankNameIsLoading}
          checkmark={!formik.errors.routingNumber}
        />

        {!formik.errors.routingNumber && Boolean(bankName) && <div className={classes.bankName}>{bankName}</div>}

        <InputPlane
          className="mt-10 pt-2"
          id="accountNumber"
          name="accountNumber"
          label={translationSets.accountNumber}
          value={formik.values.accountNumber}
          touched={formik.touched.accountNumber}
          error={formik.errors.accountNumber}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          onError={formik.setFieldError}
        />

        {formik.values.accountNumber && (
          <InputPlane
            className="mt-10 pt-2"
            id="confirmAccountNumber"
            name="confirmAccountNumber"
            label={translationSets.confirmAccountNumber}
            value={formik.values.confirmAccountNumber}
            touched={formik.touched.confirmAccountNumber}
            error={formik.errors.confirmAccountNumber}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            onError={formik.setFieldError}
          />
        )}
      </form>
    </>
  );
}

ACHForm.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ACHForm;
