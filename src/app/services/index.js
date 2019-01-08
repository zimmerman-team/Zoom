import 'isomorphic-fetch';
import assign from 'lodash/assign';
import querystring from 'querystring';

function handleResponse(response) {
  return response.json().then(result => {
    if (response.ok) {
      return result;
    } else {
      const error = {
        status: response.status,
        statusText: response.statusText,
        result: result,
      };
      throw error;
    }
  });
}

function handleRequest(url, values = null, method = 'post') {
  let request = {
    method: method !== 'upload' ? method : 'post',
  };
  if (values) {
    if (method === 'post') {
      assign(request, { body: JSON.stringify(values) });
    } else if (method === 'upload') {
      assign(request, { body: values });
      url = url.concat('?', querystring.stringify({ format: 'json' }));
    } else {
      url = url.concat('?', querystring.stringify(values));
    }
  }
  return fetch(url, request).then(handleResponse);
}

export function uploadRequest(values) {
  return handleRequest(
    `${process.env.REACT_APP_BACKEND_HOST}/api/metadata/upload/`,
    values,
    'upload',
  );
}
