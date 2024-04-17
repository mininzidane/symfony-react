import { useContext } from 'react';
import ContactInformationContext from './ContactInformationContext';

function useContactInformationContext() {
  return useContext(ContactInformationContext);
}

export default useContactInformationContext;
