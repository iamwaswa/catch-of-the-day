import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/catch-of-the-day" component={StorePicker} />
        <Route path="/catch-of-the-day/store/:storeId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;