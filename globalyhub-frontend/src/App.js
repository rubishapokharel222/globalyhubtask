
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/client/Client";
import AddClient from "./pages/client/AddClient";
import EditClient from "./pages/client/EditClient";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client />} />
          <Route path="/add" element={<AddClient />} />
          <Route path="/edit/:id" element={<EditClient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
