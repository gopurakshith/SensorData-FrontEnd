import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Sidenav from './components/Sidenav/Sidenav';
import Explore from "./pages/Explore/Expore";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <div className="App">
      <Sidenav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;