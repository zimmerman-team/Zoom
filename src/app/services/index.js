import 'isomorphic-fetch';
import assign from 'lodash/assign';
import querystring from 'querystring';
import axios from 'axios';
import get from 'lodash/get';
import cryptoJs from 'crypto-js';

function handleResponse(response) {
  return response.json().then(result => {
    if (response.ok) {
      return result;
    }
    const error = {
      status: response.status,
      statusText: response.statusText,
      result
    };
    throw error;
  });
}

function handleRequest(url, values = null, method = 'post', idToken = '') {
  const request = {
    method: method !== 'upload' ? method : 'post'
  };
  if (values) {
    if (method === 'post') {
      assign(request, { body: JSON.stringify(values) });
    } else if (method === 'upload') {
      assign(request, { body: values });
      assign(request, {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      url = url.concat('?', querystring.stringify({ format: 'json' }));
    } else {
      url = url.concat('?', querystring.stringify(values));
    }
  }
  return fetch(url, request).then(handleResponse);
}

export function uploadRequest(values, idToken) {
  return handleRequest(
    `${process.env.REACT_APP_BACKEND_HOST}/api/metadata/upload/`,
    values,
    'upload',
    idToken
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
    'get'
  );
}

export function wikipediaExcerptRequest(values) {
  return handleRequest(wikiURL('/w/api.php'), formatJSON(values), 'get');
}

export function transactionsAggregationsRequest(values) {
  return handleRequest(
    oipaURL('/api/transactions/aggregations'),
    formatJSON(values),
    'get'
  );
}

// NODE BACKEND CALL TYPES
export function nodeBackendGetRequest(request) {
  // so here we encrypt values passed to zoomBackend
  const encValues = cryptoJs.AES.encrypt(
    JSON.stringify(request.values),
    process.env.REACT_APP_ENCRYPTION_SECRET
  ).toString();

  return axios.get(`/api/${request.endpoint}`, {
    params: {
      payload: encValues
    },
    headers: get(request, 'headers', {})
  });
}

export function nodeBackendPostRequest(request) {
  // so here we encrypt values passed to zoomBackend
  const encValues = cryptoJs.AES.encrypt(
    JSON.stringify(request.values),
    process.env.REACT_APP_ENCRYPTION_SECRET
  ).toString();

  return axios.post(
    `/api/${request.endpoint}`,
    {
      payload: encValues
    },
    {
      headers: get(request, 'headers', {})
    }
  );
}

export function nodeBackendDeleteRequest(request) {
  // so here we encrypt values passed to zoomBackend
  const encValues = cryptoJs.AES.encrypt(
    JSON.stringify(request.values),
    process.env.REACT_APP_ENCRYPTION_SECRET
  ).toString();

  return axios.delete(`/api/${request.endpoint}`, {
    params: {
      payload: encValues
    },
    headers: get(request, 'headers', {})
  });
}
