import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router";
import { ItemDetail } from "./components/ItemDetail";

function App() {
  return (
    <div className="bg-gray-500 h-screen">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/categoria/:categoryName"
            element={<ItemListContainer />}
          />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path= "*" element={<h1> not found 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
