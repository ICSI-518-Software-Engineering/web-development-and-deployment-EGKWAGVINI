// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProfileScreen from './screens/Profile.screen';
import ComputationScreen from './screens/Computation.screen';
import LayoutScreen from './screens/Layout.screen';
import InventoryScreen from './screens/Inventory.screen';
import FoodSearch from './screens/food';
import Registration from './screens/registration';
import Login from './screens/login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<LayoutScreen />}>
          <Route index element={<ProfileScreen />} />
          <Route path="computation" element={<ComputationScreen />} />
          <Route path="inventory" element={<InventoryScreen />} />
          <Route path="food" element={<FoodSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
