import useLoading from 'frontend/js/hooks/useLoading';
import useServerError from 'frontend/js/hooks/useServerError';
import CustomerService from 'frontend/js/api/CustomerService';

function useUploadUserId({ customerId, onSubmitSuccess }) {
  const [isLoading, setIsLoading] = useLoading(false);
  const { errorMsg, resetError, extractAndSetErrorMsg } = useServerError();

  async function onSubmit(fileList) {
    const formData = new FormData();
    Object.keys(fileList).forEach((key) => {
      formData.append(`image_${key}`, fileList[key]);
    });

    return CustomerService.uploadUserId(customerId, formData);
  }

  async function handleFileUpload(files) {
    setIsLoading(true);
    resetError();
    try {
      const { customer } = await onSubmit(files);
      if (onSubmitSuccess) {
        onSubmitSuccess(customer);
      }
    } catch (error) {
      extractAndSetErrorMsg(error);
    }

    setIsLoading(false);
  }

  return {
    isLoading,
    handleFileUpload,
    errorMsg,
  };
}

export default useUploadUserId;
