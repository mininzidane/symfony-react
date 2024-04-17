import { useContext } from 'react';
import InventoryPageContext from './InventoryPageContext';

function useInventoryPageContext() {
  return useContext(InventoryPageContext);
}

export default useInventoryPageContext;
