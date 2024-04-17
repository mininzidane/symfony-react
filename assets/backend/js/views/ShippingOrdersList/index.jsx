import ReactDOM from 'react-dom';
import React from 'react';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import Notes from './Notes';
import Consignee from '../ShippingOrderDetails/Consignee';

const $notesLinks = document.querySelectorAll('.open-notes');
$notesLinks.forEach(($el) => {
  $el.addEventListener('click', async () => {
    const id = parseInt($el.getAttribute('data-id'), 10);
    const $notesContainer = document.getElementById($el.getAttribute('href').replace('#', ''));
    ReactDOM.render(
      <ThemeProvider>
        <SnackbarProvider>
          <Notes id={id} />
        </SnackbarProvider>
      </ThemeProvider>,
      $notesContainer,
    );
  });
});

const advancedFilterAction = document.querySelector('#advanced-filter-action');
if (advancedFilterAction) {
  advancedFilterAction.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.querySelector('.glyphicon-minus').classList.toggle('hidden');
    e.target.querySelector('.glyphicon-plus').classList.toggle('hidden');

    const results = document.querySelector('#advanced-filter-results');
    if (results.innerHTML.length > 0) {
      results.innerHTML = '';
      return;
    }

    fetch(e.target.getAttribute('data-route'))
      .then((result) => result.text())
      .then((result) => {
        results.innerHTML = `
            <div class="ibox float-e-margins"><div class="ibox-content">${result}</div></div>
        `;
      });
  });
}

const $consignees = document.querySelectorAll('.consignee-container');
$consignees.forEach(($consignee) => {
  const orderId = parseInt($consignee.getAttribute('data-order-id'), 10);
  const consignee = $consignee.getAttribute('data-consignee');
  ReactDOM.render(<Consignee id={orderId} consignee={consignee} />, $consignee);
});
