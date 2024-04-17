import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Routes>
    <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<LayoutScreen />}>
          <Route index element={<ProfileScreen />} />
          <Route path="computation" element={<ComputationScreen />} />
          <Route path="inventory" element={<InventoryScreen />} />
          <Route path="food" element={<FoodSearch />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
