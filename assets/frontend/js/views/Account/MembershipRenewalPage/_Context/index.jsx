import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SurveyService from 'frontend/js/api/SurveyService';
import CustomerService from 'frontend/js/api/CustomerService';
import PaymentService from 'frontend/js/api/PaymentService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useMembershipDiscount from './helpers/useMembershipDiscount';
import MembershipRenewalContext from './MembershipRenewalContext';

const DESCRIPTION_STEP = 0;
const COUPON_STEP = 1;
const COUPON_APPLIED_STEP = 2;
const SURVEY_STEP = 3;
const MEMBERSHIP_RENEWAL_COUPON = 'MEMRENEWAL';

const MembershipRenewalContextProvider = ({ children }) => {
  const customer = useCustomerHelper();
  const { membershipAutoRenewal } = customer;

  const [loading, setIsLoading] = useState(true);
  const [autoRenewStatus, setAutoRenewStatus] = useState(membershipAutoRenewal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelStep, setCancelStep] = useState(DESCRIPTION_STEP);
  const [survey, setSurvey] = useState(null);
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveySubmitting, setSurveySubmitting] = useState(false);
  const [surveyError, setSurveyError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);
  const [couponCode, setCouponCode] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const surveyService = new SurveyService();
  const membershipDiscount = useMembershipDiscount(customer, couponCode);

  async function initSurvey() {
    setSurveyLoading(true);
    setSurveyError(false);
    try {
      const { survey: surveyData } = await surveyService.getSurvey(SurveyService.cancelMembershipSurveyId);
      const { questions } = surveyData;
      const surveyQuestion = questions[0];

      setSurvey(surveyQuestion);
    } catch (e) {
      setSurveyError(true);
    }

    setSurveyLoading(false);
  }

  async function initCoupon() {
    try {
      const { coupon, customerCoupon } = await PaymentService.coupon(MEMBERSHIP_RENEWAL_COUPON, true);
      setCouponCode(coupon);
      let appliedCoupon = false;
      if (customerCoupon) {
        appliedCoupon = true;
      }

      setCouponApplied(appliedCoupon);
      setIsCouponAvailable(!appliedCoupon);
    } catch (e) {
      /** Ignore */
    }
  }

  useEffect(() => {
    (async () => {
      await initSurvey();
      await initCoupon();
      setIsLoading(false);
    })();
  }, []);

  function onModalClose() {
    setCancelStep(DESCRIPTION_STEP);
    setIsModalOpen(false);
  }

  async function onSubmit(newAutoRenewStatus) {
    setSubmitting(true);
    const payload = {
      membership_auto_renewal: newAutoRenewStatus === true ? 1 : 0,
    };

    try {
      const { customer: customerData } = await CustomerService.updateAutorenewStatus(customer.id, payload);
      window.customer = customerData;
      setSubmitStatus(true);
    } catch (e) {
      setSubmitStatus(false);
    }

    setSubmitting(false);
  }

  async function onSurveySubmit(payload) {
    setSurveySubmitting(true);
    setSurveyError(false);
    try {
      const { answers } = await surveyService.submitSurvey(SurveyService.cancelMembershipSurveyId, payload);
      setSurveySubmitting(false);
      return answers && answers.length > 0;
    } catch (e) {
      setSurveyError(true);
      setSurveySubmitting(false);
    }

    return false;
  }

  async function onCouponConfirm() {
    try {
      await PaymentService.applySystemCoupon(MEMBERSHIP_RENEWAL_COUPON);

      setIsCouponAvailable(false);
      setCouponApplied(true);
      setCancelStep(COUPON_APPLIED_STEP);
    } catch (e) {
      setSubmitStatus(false);
      onModalClose();
    }
  }

  return (
    <MembershipRenewalContext.Provider
      value={{
        loading,
        customer,
        membershipDiscount,
        steps: {
          isDescriptionStep: cancelStep === DESCRIPTION_STEP,
          isCouponStep: cancelStep === COUPON_STEP,
          isCouponAppliedStep: cancelStep === COUPON_APPLIED_STEP,
          isSurveyStep: cancelStep === SURVEY_STEP,
          setSurveyStep: () => setCancelStep(SURVEY_STEP),
          setCouponStep: () => {
            if (isCouponAvailable) {
              setCancelStep(COUPON_STEP);
            } else {
              setCancelStep(SURVEY_STEP);
            }
          },
        },
        modal: {
          isOpen: isModalOpen,
          open: () => setIsModalOpen(true),
          close: onModalClose,
        },
        form: {
          autoRenewStatus,
          setAutoRenewStatus,
          isCouponAvailable,
          couponApplied,
          survey,
          surveyLoading,
          surveySubmitting,
          surveyError,
          submitting,
          submitStatus,
          onSubmit,
          onSurveySubmit,
          onCouponConfirm,
          resetSubmitStatus: () => setSubmitStatus(null),
        },
      }}
    >
      {children}
    </MembershipRenewalContext.Provider>
  );
};

MembershipRenewalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MembershipRenewalContextProvider;
