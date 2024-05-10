import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Details from "./components/Details";
import Student from "./pages/Student";
import Register from "./pages/Register";
import Teacher from "./components/Teacher/Teacher";
import TeacherPage from "./pages/TeacherPage";
import Verification from "./pages/Verification";
import { useEffect, useState } from "react";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Verified from "./pages/Verified";
import Edit from "./pages/Edit";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import RedirectPage from "./pages/redirectedPage";

const initialStatus = JSON.parse(localStorage.getItem("status"));

function App() {
  const [isLogin, setIsLogin] = useState(initialStatus?.isLogin ? true : false);

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify({ isLogin }));
  }, [isLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Root isLogin={isLogin} onSetIsLogin={setIsLogin} />}
        >
          <Route index element={<Home />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/verified" element={<Verified />} />
          <Route
            path="/details"
            element={<Details onSetIsLogin={setIsLogin} />}
          />
          <Route
            path="/register"
            element={<Register onSetIsLogin={setIsLogin} />}
          />
          <Route path="/details/:id" element={<Student />} />
          <Route path="/teacher/:id" element={<Teacher />} />
          <Route path="/teacher/:id" element={<TeacherPage />} />
          <Route path="/settings">
            <Route index element={<Settings />} />
            <Route path="edit" element={<Edit />} />
          </Route>

          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/redirect"
            element={<RedirectPage onSetIsLogin={setIsLogin} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
