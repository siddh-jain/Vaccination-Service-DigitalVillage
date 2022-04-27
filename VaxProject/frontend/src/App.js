import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Hm from "./components/common/search";
import Home from "./components/common/home";
import Hmm from "./components/common/notify";
import Navbar from "./components/templates/Navbar";
import Hmmm from "./components/common/list";
import Hmmmm from "./components/common/add";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Hm />} />
          <Route path="notify" element={<Hmm />} />
          <Route path="list" element={<Hmmm />} />
          <Route path="add" element={<Hmmmm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
