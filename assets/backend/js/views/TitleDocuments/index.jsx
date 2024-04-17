import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import Upload from './Upload';

const $el = document.getElementById('title-documents-upload');
if ($el) {
  ReactDOM.render(
    <ThemeProvider>
      <SnackbarProvider>
        <Upload />
      </SnackbarProvider>
    </ThemeProvider>,
    $el,
  );
}
