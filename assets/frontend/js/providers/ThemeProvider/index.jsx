import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import ABMTheme from './theme';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function ThemeProvider({ children, theme }) {
  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StylesProvider>
  );
}

ThemeProvider.defaultProps = {
  children: null,
  theme: ABMTheme,
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  theme: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
};

export default ThemeProvider;
