import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
function App() {
  return (
    <div className=" bg-blue-500 ">
      <NavBar />
      <ItemListContainer text="texto enviado por una props" />
    </div>
  );
}

export default App;
