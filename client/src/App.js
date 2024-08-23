// src/App.js
import React from 'react';
import TotalSalesOverTime from './components/TotalSalesOverTime';
import NewCustomersOverTime from './components/NewCustomersOverTime';
import RepeatCustomers from './components/RepeatCustomers';
import CustomerGeography from './components/CustomerGeography';
import CustomerLifetimeValue from './components/CustomerLifetimeValue';

const App = () => {
  return (
    <div>
      <h1>Shopify Data Visualization</h1>
      <TotalSalesOverTime interval="monthly" />
      <NewCustomersOverTime interval="monthly" />
      <RepeatCustomers />
      <CustomerGeography />
      <CustomerLifetimeValue />
    </div>
  );
};

export default App;
