import 'isomorphic-fetch';
import assign from 'lodash/assign';
import querystring from 'querystring';

function handleResponse(response) {
  return response.json().then(result => {
    if (response.ok) {
      return result;
    }
    const error = {
      status: response.status,
      statusText: response.statusText,
      result,
    };
    throw error;
  });
}

function handleRequest(url, values = null, method = 'post') {
  const request = {
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

export function validateRequest(values) {
  return handleRequest(
    `${process.env.REACT_APP_BACKEND_HOST}/api/validate/`,
    values,
  );
}

export function errorCorrectionRequest(values) {
  return handleRequest(
    `${process.env.REACT_APP_BACKEND_HOST}/api/error-correction/`,
    values,
  );
}

export function manualMapDataRequest(values) {
  return handleRequest(
    `${process.env.REACT_APP_BACKEND_HOST}/api/manual-mapping/get_data/`,
    values,
  );
}

function oipaURL(url) {
  return process.env.REACT_APP_OIPA_HOST.concat(url);
}

function wikiURL(url) {
  return process.env.REACT_APP_WIKIPEDIA_API_HOST.concat(url);
}

function formatJSON(values) {
  values.format = 'json';
  return values;
}

export function activitiesRequest(values) {
  return handleRequest(oipaURL('/api/activities/'), formatJSON(values), 'get');
}

export function activityRequest(values) {
  return handleRequest(
    oipaURL(`/api/activities/${values.activityID}`),
    formatJSON({ fields: values.fields }),
    'get',
  );
}

export function wikipediaExcerptRequest(values) {
  return handleRequest(wikiURL('/w/api.php'), formatJSON(values), 'get');
}
