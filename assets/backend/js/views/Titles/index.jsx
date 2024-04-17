import RouterService from 'backend/js/api/RouterService';

window.toggleAllCheckboxes = (source) => {
  const checkboxes = document.querySelectorAll('.title-tracking input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] !== source) {
      checkboxes[i].checked = source.checked;
    }
  }
};

const $el = document.getElementById('report-btn');
if ($el) {
  $el.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.classList.contains('loading')) {
      return;
    }
    const $reportModalContainer = document.getElementById('report-modal-container');
    if (!$reportModalContainer) {
      return;
    }
    const checkedCheckboxes = document.querySelectorAll('.title-tracking input[type="checkbox"]:checked');
    const ids = [];
    checkedCheckboxes.forEach((checkbox) => {
      ids.push(checkbox.getAttribute('data-id'));
    });
    if (ids.length === 0) {
      return;
    }

    const $form = Object.assign(document.createElement('form'), {
      method: 'POST',
      action: RouterService.getRoute('titleReport'),
      target: '_blank',
    });
    $form.appendChild(
      Object.assign(document.createElement('input'), {
        type: 'hidden',
        name: 'data[]',
        value: JSON.stringify({ tracking: null, purchases: ids.map((id) => ({ id, source: 'ABM' })) }),
      }),
    );
    document.body.appendChild($form);
    $form.submit();
  });
}
