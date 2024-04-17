import { useEffect, useRef, useState } from 'react';

function useInputPadding(inventoryMarket) {
  const DEFAULT_PADDING_LEFT = 14;
  const SELECT_PADDING = 13;
  const inventoryTypeSelectRef = useRef();
  const [inputPadding, setInputPadding] = useState();

  useEffect(() => {
    const selectWidth = inventoryTypeSelectRef?.current?.clientWidth + SELECT_PADDING || 0;
    setInputPadding(Math.max(selectWidth, DEFAULT_PADDING_LEFT));
  }, [inventoryMarket]);

  return { inputPadding, inventoryTypeSelectRef };
}

export default useInputPadding;
