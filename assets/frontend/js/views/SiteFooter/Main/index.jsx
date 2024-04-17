import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import OfficesInfo from './OfficesInfo';
import Links from './Links';
import ControlsPanel from './ControlsPanel';
import Copyright from './Copyright';
import SeoLocalBusiness from './SeoLocalBusiness';

function SiteFooter({ noOffices, isSeoLocalBusinessDisabled }) {
  const { isBelowMd } = useBreakpoint();

  return (
    <div>
      {!noOffices && <OfficesInfo />}
      <Links />
      <ControlsPanel />
      {isBelowMd && <Copyright />}
      {!isSeoLocalBusinessDisabled && <SeoLocalBusiness />}
    </div>
  );
}

SiteFooter.defaultProps = {
  noOffices: false,
  isSeoLocalBusinessDisabled: false,
};

SiteFooter.propTypes = {
  noOffices: PropTypes.bool,
  isSeoLocalBusinessDisabled: PropTypes.bool,
};

const $el = document.getElementById('site-footer-container');

if ($el) {
  ReactDOM.render(
    <TranslationProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <SiteFooter />
        </ThemeProvider>
      </ReactQueryProvider>
    </TranslationProvider>,
    $el,
  );
}

export default SiteFooter;
