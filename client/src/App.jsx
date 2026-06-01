import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CylinderStock from "./pages/CylinderStock";
import Selling from "./pages/SellingPOS";
import SalesReport from "./pages/SalesReport";
import LoginPage from "./pages/LoginPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Default Page */}

        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />

        {/* Other Pages */}

        <Route path="/stock" element={<CylinderStock />} />

        <Route path="/selling" element={<Selling />} />

        <Route path="/profit" element={<SalesReport />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;