import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import Report from './report';

const $el = document.getElementById('title-report-app');

ReactDOM.render(
  <ThemeProvider>
    <SnackbarProvider>
      <Report id={window.id} values={window.data} labelRelatedWithReassignment={window.labelRelatedWithReassignment} />
    </SnackbarProvider>
  </ThemeProvider>,
  $el,
);
