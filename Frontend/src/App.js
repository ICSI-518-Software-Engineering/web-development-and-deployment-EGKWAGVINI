// App.js
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import ProfileScreen from './screens/Profile.screen';
import ComputationScreen from './screens/Computation.screen';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LayoutScreen from './screens/Layout.screen';
import InventoryScreen from './screens/Inventory.screen';
import FoodSearch from './screens/food';
const App = () => {
  return (
    
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutScreen />}>
          <Route index element={<ProfileScreen />} />
          <Route path="computation" element={<ComputationScreen />} />
          <Route path="inventory" element={<InventoryScreen />} />
          <Route path="food" element={<FoodSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
