import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createTheme, useTheme } from '@material-ui/core/styles';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import VehicleCalculatorConfigShape from 'frontend/js/lib/propshapes/VehicleCalculatorConfigShape';
import CalculatorContextProvider from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext';
import Content from './Content';

function VehicleCalculator({ defaultValues, config, isMobileView, isLegacyView, onOrderIntent }) {
  const outerTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme({
        ...outerTheme,
        isMobileView,
        isLegacyView,
      }),
    [outerTheme, isMobileView],
  );
  return (
    <ThemeProvider theme={theme}>
      <CalculatorContextProvider defaultValues={defaultValues} config={config}>
        <Content onOrderIntent={onOrderIntent} />
      </CalculatorContextProvider>
    </ThemeProvider>
  );
}

VehicleCalculator.defaultProps = {
  defaultValues: undefined,
  config: undefined,
  isMobileView: false,
  isLegacyView: false,
  onOrderIntent: () => {},
};

VehicleCalculator.propTypes = {
  defaultValues: PropTypes.shape({}),
  config: VehicleCalculatorConfigShape,
  isMobileView: PropTypes.bool,
  isLegacyView: PropTypes.bool,
  onOrderIntent: PropTypes.func,
};

export default VehicleCalculator;
