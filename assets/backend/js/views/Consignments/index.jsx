import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import ConsignmentContextProvider from './_Context';
import ConsignmentHeader from './ConsignmentHeader';
import ConsignmentTable from './ConsignmentTable';
import ConsignmentTabs from './ConsignmentTabs';

function Consignments() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <SnackbarProvider>
          <ReactQueryProvider>
            <PaginationProvider>
              <ConsignmentContextProvider>
                <div className="wrapper wrapper-content">
                  <ConsignmentHeader />
                  <ConsignmentTabs />
                  <div className="ibox">
                    <div className="ibox-content table-responsive">
                      <ConsignmentTable />
                    </div>
                  </div>
                </div>
              </ConsignmentContextProvider>
            </PaginationProvider>
          </ReactQueryProvider>
        </SnackbarProvider>
      </TranslationProvider>
    </ThemeProvider>
  );
}

const $el = document.getElementById('consignments-page');
if ($el) {
  ReactDOM.render(<Consignments />, $el);
}
