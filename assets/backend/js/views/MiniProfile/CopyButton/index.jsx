import ReactDOM from 'react-dom';
import React from 'react';
import CopyButton from 'backend/js/components/CopyButton';

const $elements = document.getElementsByClassName('block-copy-button');

if ($elements.length > 0) {
  for (let i = 0; i < $elements.length; i++) {
    const $element = $elements.item(i);
    const copyValue = $element.dataset.copyValue ? $element.dataset.copyValue : '';

    ReactDOM.render(<CopyButton value={copyValue} />, $element);
  }
}
