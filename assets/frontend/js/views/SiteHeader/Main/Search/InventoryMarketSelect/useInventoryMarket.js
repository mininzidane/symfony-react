import { useState } from 'react';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import CountryService from 'frontend/js/api/CountryService';
import useInputPadding from 'frontend/js/views/SiteHeader/Main/Search/SearchSuggestions/useInputPadding';

function useInventoryMarket() {
  const INVENTORY_MARKET_KEY = 'Abm::InventoryMarket';
  const [market, setMarket] = useState(!CountryService.isUsa() ? LocalStorageService.get(INVENTORY_MARKET_KEY) : null);
  const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false);
  const { inputPadding, inventoryTypeSelectRef } = useInputPadding(market);

  return {
    market,
    marketKey: market?.key,
    setMarket,
    marketStorageKey: INVENTORY_MARKET_KEY,
    isMarketDropdownOpen,
    setIsMarketDropdownOpen,
    inputPadding,
    inventoryTypeSelectRef,
  };
}

export default useInventoryMarket;
