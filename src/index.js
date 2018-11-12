import DevTools from 'mobx-react-devtools';
import GlobalContainer from './components/GlobalContainer';
import GlobalContainerModel from './models/GlobalContainerModel';
import React from 'react';
import { Router, Route, Link } from "react-router-3";
import { useBasename } from "history";
import createHashHistory from "history/lib/createHashHistory";
import createBrowserHistory from "history/lib/createBrowserHistory";


import { render } from 'react-dom';

const store = new GlobalContainerModel();
let hadRouteChange;
const history = useBasename(createBrowserHistory)({
  basename: location.pathname
});

function hookHistoryBoomerang() {
  if (window.BOOMR && BOOMR.version) {
      if (BOOMR.plugins && BOOMR.plugins.History) {
          BOOMR.plugins.History.hook(history, hadRouteChange);
      }
      return true;
  }
}

if (!hookHistoryBoomerang()) {
  if (document.addEventListener) {
      document.addEventListener("onBoomerangLoaded", hookHistoryBoomerang);
  } else if (document.attachEvent) {
      document.attachEvent("onpropertychange", function(e) {
          e = e || window.event;
          if (e && e.propertyName === "onBoomerangLoaded") {
              hookHistoryBoomerang();
          }
      });
  }
}

const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

const Index = () => (
  <div>
    Index
    <Link to="/">Home</Link>
    <Link to="/about/">About</Link>
  </div>
);
const About = () => (
  <div>
    About
    <Link to="/">Home</Link>
    <Link to="/about/">About</Link>
  </div>
);

render(
  <Router history={history} onEnter={hadRouteChange}>
    <div>
      <DevTools />
      <Link to="/">Home</Link>
      <Link to="/about/">About</Link>
      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
    </div>
  </Router>,
  document.getElementById('root')
);

// playing around in the console
window.store = store;
