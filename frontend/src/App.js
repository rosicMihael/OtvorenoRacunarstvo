import Layout from "./components/Layout";
import Public from "./components/Public";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import DvdList from "./features/dvds/DvdList";
import Dvd from "./features/dvds/Dvd";
import CitySquareList from "./features/dvds/CitySquareList";
import EmailList from "./features/dvds/EmailList";
import WebPageList from "./features/dvds/WebPageList";
import CreateForm from "./features/dvds/CreateForm";
import EditForm from "./features/dvds/EditForm";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="dvdi">
          <Route index element={<DvdList />} />
          <Route path="id/:id" element={<Dvd />} />
          <Route path="gradske_cetvrti" element={<CitySquareList />} />
          <Route path="emailovi" element={<EmailList />} />
          <Route path="web_stranice" element={<WebPageList />} />
          <Route path="novi" element={<CreateForm />} />
          <Route path="edit/:id" element={<EditForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
