/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import AuthModalProvider from 'frontend/js/providers/AuthModalProvider';
import HeaderSimple from './HeaderSimple';

function SiteHeaderSimple(props) {
  useEffect(() => {
    document.getElementById('site-header-for-seo')?.remove();
  }, []);

  return <HeaderSimple {...props} />;
}

const $el = document.getElementById('site-header-simple-container');

if ($el) {
  const isDefaultPaddings = $el.getAttribute('data-is-default-paddings');
  const isWithoutLabel = Boolean($el.getAttribute('data-no-label'));

  ReactDOM.render(
    <ReactQueryProvider>
      <ThemeProvider>
        <TranslationProvider>
          <AuthModalProvider>
            <SiteHeaderSimple isDefaultPaddings={isDefaultPaddings} isWithoutLabel={isWithoutLabel} />
          </AuthModalProvider>
        </TranslationProvider>
      </ThemeProvider>
    </ReactQueryProvider>,
    $el,
  );
}

export default SiteHeaderSimple;
