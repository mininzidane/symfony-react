import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import TitleReceivedApp from './TitleReceived';

const $el = document.getElementById('title-received-at-office-app');
const { carriers } = window.TITLE_RECEIVED_AT_OFFICE_PROPS;

ReactDOM.render(
  <ThemeProvider>
    <SnackbarProvider>
      <TitleReceivedApp carriers={carriers} />
    </SnackbarProvider>
  </ThemeProvider>,
  $el,
);
