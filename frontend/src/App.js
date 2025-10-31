import Layout from "./components/Layout";
import Public from "./components/Public";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import DvdList from "./features/dvds/DvdList";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="datatable" element={<DvdList />} />
      </Route>
    </Routes>
  );
}

export default App;
