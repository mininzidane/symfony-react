import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import FooterSimple from './FooterSimple';

function SiteFooterSimple() {
  return <FooterSimple />;
}

const $el = document.getElementById('site-footer-simple-container');

if ($el) {
  ReactDOM.render(
    <ThemeProvider>
      <SiteFooterSimple />
    </ThemeProvider>,
    $el,
  );
}

export default SiteFooterSimple;
