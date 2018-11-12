import DevTools from 'mobx-react-devtools';
import GlobalContainer from './components/GlobalContainer';
import GlobalContainerModel from './models/GlobalContainerModel';
import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'


import { render } from 'react-dom';

const store = new GlobalContainerModel();

const history = createHistory({
  basename: '/'
})

function hookHistoryBoomerang() {
  if (window.BOOMR && BOOMR.version) {
      if (BOOMR.plugins && BOOMR.plugins.History) {
          BOOMR.plugins.History.hook(history, true);
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

const Index = () => <div>Index</div>;
const About = () => <div>About</div>;

render(
  <Router history={history}>
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
