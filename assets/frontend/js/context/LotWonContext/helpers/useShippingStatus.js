import { useState } from 'react';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useServerError from 'frontend/js/hooks/useServerError';

function useShippingStatus() {
  const [shippingSteps, setShippingSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMsg, resetError, extractAndSetErrorMsg } = useServerError();

  async function getShippingOrderStatus(token) {
    resetError();
    try {
      setIsLoading(true);
      const steps = await ShippingOrderService.getShippingOrderStatus(token);
      setShippingSteps((steps && steps.data) || []);
    } catch (error) {
      extractAndSetErrorMsg(error);
    }
    setIsLoading(false);
  }

  const isCurrentActiveStep = (index) => {
    const shippingStepsLength = shippingSteps.length;
    const currentStep = shippingSteps[index];
    if (shippingStepsLength - 1 === index && currentStep && currentStep.completed) {
      return true;
    }
    if (shippingStepsLength > index + 1 && typeof shippingSteps[index + 1] === 'object') {
      const nextStep = shippingSteps[index + 1];
      if (nextStep.completed === false && currentStep.completed === true) {
        return true;
      }
    }
    return false;
  };

  const currentStep = shippingSteps.find((_, index) => isCurrentActiveStep(index));

  return {
    shippingSteps,
    currentStep,
    isLoading,
    errorMsg,
    setIsLoading,
    isCurrentActiveStep,
    getShippingOrderStatus,
  };
}

export default useShippingStatus;
