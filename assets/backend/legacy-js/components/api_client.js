export function fetchJson(url, options) {
  let headers = {
    'Content-Type': 'application/json'
  };

  if (options && options.headers) {
    headers = {
      ...options.headers,
      headers
    };

    delete options.headers;
  }

  return fetch(url, Object.assign({
      credentials: 'same-origin',
      headers
    }, options))
    .then(checkStatus)
    .then(response => {
      return response.text()
        .then(text => text ? JSON.parse(text) : '');
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error
}
