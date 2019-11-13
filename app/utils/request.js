/**
 * Parses the JSON returned by a network request
 *
 * @param {object} response A response from a network request
 *
 * @returns {object}        The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

/**
 * Check if a network request came back fine, and throws an error if not
 *
 * @param {object} response     A response from a network request
 *
 * @returns {object|undefined}  Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Request a URL, returning a promise
 *
 * @param {string} url      The URL we want to request
 * @param {object} options  The options we want to pass to "fetch"
 *
 * @returns {object}        The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
