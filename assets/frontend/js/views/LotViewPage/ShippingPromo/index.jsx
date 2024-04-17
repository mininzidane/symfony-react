/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createTheme, useTheme } from '@material-ui/core/styles';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import LotPageBlock from '../LotPageBlock';
import Content from './Content';

function ShippingPromo({ lot, isWideView, isAbmInventory }) {
  const { isAuthenticated } = useCustomerHelper();
  const shouldBeHidden = !isAuthenticated && isAbmInventory;

  if (!lot || lot.FAKE || shouldBeHidden) {
    return null;
  }

  const outerTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme({
        ...outerTheme,
        isWideView,
      }),
    [outerTheme, isWideView],
  );

  return (
    <ThemeProvider theme={theme}>
      <LotPageBlock>
        <Content lot={lot} />
      </LotPageBlock>
    </ThemeProvider>
  );
}

ShippingPromo.propTypes = {
  isWideView: PropTypes.bool,
};

ShippingPromo.defaultProps = {
  isWideView: false,
};

export default ShippingPromo;
