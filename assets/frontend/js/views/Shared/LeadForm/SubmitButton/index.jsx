import React from 'react';
import { useFormikContext } from 'formik';
import Button from 'frontend/js/components/Button';

function SubmitButton(props) {
  const { isSubmitting } = useFormikContext();

  return <Button type="submit" color="yellow" isLoading={isSubmitting} {...props} />;
}

export default SubmitButton;
