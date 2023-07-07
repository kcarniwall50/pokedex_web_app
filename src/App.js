import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Bookmarks from "./pages/Bookmarks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  if (process.env.REACT_APP_NODE_ENV !== "production") {
    console.log = function () {};
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer className="toast-position" />
    </div>
  );
}

export default App;
