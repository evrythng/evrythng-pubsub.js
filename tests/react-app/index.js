import 'regenerator-runtime/runtime';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as evrythng from 'evrythng';
import PubSub from 'evrythng-pubsub';

console.log(evrythng);
console.log(PubSub);

evrythng.use(PubSub);

const getQueryParam = name => new URLSearchParams(window.location.search).get(name);

const Application = () => {
  const [user, setUser] = useState(null);
  const [thng, setThng] = useState(null);
  const [action, setAction] = useState(null);

  const loadAppAndThng = async (appKey, thngId) => {
    const app = new evrythng.Application(appKey);
    await app.init();

    const userScope = await app.appUser().create({ anonymous: true });
    await userScope.init();

    const thngObj = await userScope.thng(thngId).read();
    setUser(userScope);
    setThng(thngObj);
  };

  const subscribeToThngActions = async () => {
    await user.thng(thng.id).action('all').subscribe((action) => {
      setAction(action);
    });
  };

  // Load the thng
  useEffect(() => {
    const thngId = getQueryParam('thng');
    const appKey = getQueryParam('app');

    if (!thngId || !appKey) {
      return;
    }

    loadAppAndThng(appKey, thngId);
  }, []);

  // Subscribe to actions
  useEffect(() => {
    if (!user || !thng) {
      return;
    }

    subscribeToThngActions();
  }, [thng, user]);

  if (!thng) {
    return (
      <div>Set 'app' and 'thng' params</div>
    );
  }

  if (!action) {
    return (
      <div>{JSON.stringify(thng)}</div>
    );
  }

  return (
    <div>{JSON.stringify(action)}</div>
  );
};

ReactDOM.render(<Application />, document.getElementById('app'));
