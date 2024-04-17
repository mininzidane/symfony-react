import ReactDOM from 'react-dom';
import React from 'react';
import Header from './Header';
import Notes from './Notes';

const $brokersHeader = document.getElementById('brokers-header');
ReactDOM.render(<Header brokersCount={$brokersHeader.getAttribute('data-brokers-count')} />, $brokersHeader);

const $notesLinks = document.querySelectorAll('.open-notes');
$notesLinks.forEach(($el) => {
  $el.addEventListener('click', async () => {
    const id = parseInt($el.getAttribute('data-id'), 10);
    const $notesContainer = document.getElementById(`notes${id}`);
    ReactDOM.render(<Notes id={id} />, $notesContainer);
  });
});
