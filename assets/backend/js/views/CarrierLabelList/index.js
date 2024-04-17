import CarrierLabelService from 'backend/js/api/CarrierLabelService';

const labelCheckboxClass = '.label-checkbox';
const allCheckboxes = document.querySelectorAll(labelCheckboxClass);
const checkAllLabels = document.querySelector('.check-all-labels');
const printLabels = document.querySelector('.print-labels');

function allCheckboxesIsChecked() {
  return document.querySelectorAll(`${labelCheckboxClass}:checked`).length === allCheckboxes.length;
}

function allCheckboxesIsNotChecked() {
  return document.querySelectorAll(`${labelCheckboxClass}:not(:checked)`).length === allCheckboxes.length;
}

if (checkAllLabels) {
  checkAllLabels.addEventListener('click', (e) => {
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  });
}

allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    if (allCheckboxesIsChecked()) {
      checkAllLabels.checked = true;
    }
    if (allCheckboxesIsNotChecked()) {
      checkAllLabels.checked = false;
    }
  });
});

function form(path, params) {
  const $form = Object.assign(document.createElement('form'), {
    method: 'POST',
    action: path,
    target: '_blank',
  });
  document.body.appendChild($form);

  params.forEach((item) => {
    $form.appendChild(
      Object.assign(document.createElement('input'), {
        type: 'hidden',
        name: item.name,
        value: item.value,
      }),
    );
  });

  return $form;
}

function printLabelLinks(links) {
  if (links.length === 0) {
    return;
  }
  const params = [];
  links.forEach((link) => {
    params.push({
      name: 'links[]',
      value: link,
    });
  });
  form('http://pdf-processor.ms.securebidsolutions.com/combine', params).submit();
}

if (printLabels) {
  printLabels.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('loading')) {
      return;
    }

    const values = [];
    document.querySelectorAll('.label-checkbox:checked').forEach((checkbox) => {
      values.push(checkbox.value);
    });
    if (values.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select labels!');
      return;
    }

    e.target.innerHTML = 'loading...';
    e.target.classList.add('loading');
    const formData = new FormData();
    formData.append('label', values.join(','));
    new CarrierLabelService().getPdfLinks(formData).then(({ links }) => {
      printLabelLinks(links);
      e.target.innerHTML = '<i class="fa fa-print"></i> print';
      e.target.classList.remove('loading');
    });
  });
}
