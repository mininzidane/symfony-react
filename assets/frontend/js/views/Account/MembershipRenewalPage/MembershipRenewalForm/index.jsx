import React from 'react';
import classnames from 'classnames';
import { Formik } from 'formik';
import { FormattedMessage } from 'react-intl-phraseapp';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import Button from 'frontend/js/components/Button';
import useMembershipRenewalContext from '../_Context/useMembershipRenewalContext';
import useStyles from './useStyles';

function MembershipRenewalForm() {
  const { customer, membershipDiscount, modal, form } = useMembershipRenewalContext();
  const { autoRenewStatus, setAutoRenewStatus, couponApplied } = form;
  const { discount } = membershipDiscount;
  const { membershipAutoRenewal, membershipType, membershipValidity } = customer;
  const classes = useStyles();

  const membershipPrice = couponApplied ? discount : membershipType.price;

  const eventTrackingService = new EventTrackingService();
  const validDate = DateTimeService.formatFromISOString(membershipValidity);

  async function handleFormSubmit(values) {
    const { autoRenew } = values;
    if (autoRenew === false) {
      modal.open();
      return;
    }

    await form.onSubmit(autoRenew);
  }

  return (
    <>
      <p className={classes.currentMembershipLabel}>
        <FormattedMessage
          id="membershipSettings.header"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
            membership: membershipType.name,
          }}
        />
      </p>

      {membershipType.upgradeable && (
        <Button
          href={RouterService.getRoute('membershipPlans')}
          label={<FormattedMessage id="membershipSettings.ctaUpgrade" />}
          size="lg"
          color="yellow"
          className="sm-wide mt-25"
          isInline
        />
      )}

      {membershipType.eligibleForRenewal && (
        <>
          <Formik
            initialValues={{
              autoRenew: Boolean(autoRenewStatus),
            }}
            enableReinitialize
            onSubmit={handleFormSubmit}
          >
            {({ values, handleSubmit }) => (
              <>
                <div className={classnames(classes.header, { 'is-renew': values.autoRenew === true })}>
                  <FormattedMessage
                    id="membershipSettings.description"
                    values={{
                      strong: (chunks) => <strong>{chunks}</strong>,
                      membership: membershipType.name,
                      date: validDate,
                    }}
                  />
                </div>

                <div className={classes.content}>
                  <form onSubmit={handleSubmit}>
                    <div className={classes.radioWrapper}>
                      <RadioButton
                        id="membership-auto-renew-enable"
                        label={
                          <FormattedMessage
                            id="membershipSettings.keepMembership"
                            values={{
                              price: membershipPrice,
                              date: validDate,
                            }}
                          />
                        }
                        // eslint-disable-next-line react/jsx-boolean-value
                        value={true}
                        isChecked={values.autoRenew}
                        name="autoRenew"
                        className="mb-15"
                        onChange={() => {
                          setAutoRenewStatus(true);
                        }}
                        animate
                      />

                      <RadioButton
                        id="membership-auto-renew-disable"
                        label={<FormattedMessage id="membershipSettings.cancelMembership" />}
                        value={false}
                        isChecked={!values.autoRenew}
                        name="autoRenew"
                        onChange={() => {
                          setAutoRenewStatus(false);
                          eventTrackingService.sendEvent({
                            step: 'abm_dashboard_renewal_settings',
                            substep: 'No',
                            product_id: 1,
                          });
                        }}
                        animate
                      />
                    </div>

                    <Button
                      type="submit"
                      label={<FormattedMessage id="membershipSettings.ctaSave" />}
                      size="lg"
                      color="yellow"
                      className="sm-wide mt-30"
                      isInline
                      isDisabled={values.autoRenew === membershipAutoRenewal}
                      onClick={() => {
                        eventTrackingService.sendEvent({
                          step: 'abm_dashboard_renewal_settings',
                          substep: 'Save Information',
                          product_id: 1,
                        });
                      }}
                      isLoading={form.submitting}
                    />
                  </form>
                </div>
              </>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

export default MembershipRenewalForm;
