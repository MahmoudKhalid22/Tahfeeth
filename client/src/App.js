import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Details from "./components/Details";
import Student from "./pages/Student";
import Register from "./pages/Register";
import Teacher from "./pages/Teacher";
import TeacherPage from "./pages/TeacherPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:id" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/:id" element={<TeacherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
