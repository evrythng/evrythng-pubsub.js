evrythng.use(PubSub);

/**
 * Get a query parameter value.
 *
 * @param {string} name - Name of the query parameter.
 * @returns {string} Value of the query parameter.
 */
const getQueryParam = name => new URLSearchParams(window.location.search).get(name);

/**
 * The main function.
 */
const main = async () => {
  const operator = getQueryParam('operator');
  const accessToken = getQueryParam('accessToken');
  if (!operator && !accessToken) {
    alert('Please specify \'operator\' or \'accessToken\' query parameter');
    return;
  }

  const apiUrl = getQueryParam('apiUrl');
  if (apiUrl) PubSub.setup({ apiUrl });

  if (operator) {
    const operatorScope = new evrythng.Operator(operator);
    await operatorScope.init();

    window.operator = operatorScope;
  }

  if (accessToken) {
    const accessTokenScope = new evrythng.AccessToken(accessToken);
    await accessTokenScope.init();

    window.accessToken = accessTokenScope;
  }
}

main();
