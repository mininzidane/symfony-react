const xhr = new XMLHttpRequest();

xhr.open('GET', '/en/data/v2/customer/current', false);
xhr.send();
if (xhr.status === 200) {
  const { isLoggedIn, customer } = JSON.parse(xhr?.response) || {};

  if (isLoggedIn) {
    window.customer = customer;
  }
}
