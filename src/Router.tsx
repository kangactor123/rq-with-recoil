import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InfiniteScroll, OptimisticUpdate } from "./component";
import Main from "./page/main";
import FirstPage from "./page/firstPage";
import SecondPage from "./page/secondPage";
import {
  FIRST_PAGE_PATH,
  INFINITY_SCROLL_PATH,
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
        <Route element={<InfiniteScroll />} path={INFINITY_SCROLL_PATH} />
        <Route element={<Main />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
