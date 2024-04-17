import React from 'react';
import ReactDOM from 'react-dom';
import BidsTable from 'backend/js/views/Bid/CounterBid/BidsTable';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import CounterBidContextProvider from 'backend/js/views/Bid/CounterBid/_Context';
import BidsHeader from 'backend/js/views/Bid/CounterBid/BidsHeader';

function CounterBid() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <ReactQueryProvider>
          <SnackbarProvider>
            <CounterBidContextProvider>
              <BidsHeader />
              <BidsTable />
            </CounterBidContextProvider>
          </SnackbarProvider>
        </ReactQueryProvider>
      </TranslationProvider>
    </ThemeProvider>
  );
}

const $el = document.getElementById('counter-bid-page');
if ($el) {
  ReactDOM.render(<CounterBid />, $el);
}
