import { BrowserRouter, Routes, Route } from "react-router-dom";
import OptimisticUpdate from "./component/OptimisticUpdate";
import FirstPage from "./page/FirstPage";
import Main from "./page/Main";
import SecondPage from "./page/SecondPage";
import {
  FIRST_PAGE_PATH,
  OPTIMISTIC_UPDATE_PAGE_PATH,
  SECOND_PAGE_PATH,
} from "./utils/routePath";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FirstPage />} path={FIRST_PAGE_PATH} />
        <Route element={<SecondPage />} path={SECOND_PAGE_PATH} />
        <Route
          element={<OptimisticUpdate />}
          path={OPTIMISTIC_UPDATE_PAGE_PATH}
        />
        <Route element={<Main />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
