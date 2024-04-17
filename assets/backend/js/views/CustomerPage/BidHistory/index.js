const plusIcon = 'glyphicon-plus-sign';
const minusIcon = 'glyphicon-minus-sign';
document.querySelectorAll('.toggle').forEach((el) => {
  el.addEventListener('click', (e) => {
    const lotId = e.target.getAttribute('data-lot-id');
    e.target.classList.toggle(plusIcon);
    e.target.classList.toggle(minusIcon);
    document.querySelectorAll(`.bid-for-lot-${lotId}`).forEach((bid) => {
      bid.classList.toggle('hidden');
    });
  });
});
