const RELIST_TYPE_RELIST = 'Relist';
const RELIST_TYPE_REVERSE = 'Reverse';

document.addEventListener('DOMContentLoaded', () => {
  const choice = document.getElementById('relist_form_reasonChoice');
  const choiceContainer = document.getElementById('other_reason_choice_container');
  const type = document.getElementById('relist_form_relistType');
  const reasonContainer = document.getElementById('other_reason_container');
  if (choice) {
    choice.addEventListener('change', (e) => {
      const { value } = e.currentTarget;
      if (value && type.value === RELIST_TYPE_RELIST) {
        reasonContainer.classList.add('hidden');
      } else {
        reasonContainer.classList.remove('hidden');
      }
    });
    choice.dispatchEvent(new Event('change'));
  }
  type.addEventListener('change', (e) => {
    const { value } = e.currentTarget;
    if (value === RELIST_TYPE_REVERSE) {
      choiceContainer.classList.add('hidden');
    } else {
      choiceContainer.classList.remove('hidden');
    }
    if (choice) {
      choice.dispatchEvent(new Event('change'));
    }
  });
  type.dispatchEvent(new Event('change'));
});
