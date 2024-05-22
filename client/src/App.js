import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import Details from "./components/Details";
import Student from "./pages/Student";
import Teacher from "./components/Teacher/Teacher";
import Verification from "./pages/Verification";
import { useEffect, useState } from "react";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Verified from "./pages/Verified";
import Edit from "./pages/Edit";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import RedirectPage from "./pages/redirectedPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppLayout, Home } from "./ui/index";
import { Register } from "./pages";
import { AuthProvider } from "./utils/context";

const initialStatus = JSON.parse(localStorage.getItem("status"));
const queryClient = new QueryClient();

function App() {
  const [isLogin, setIsLogin] = useState(initialStatus?.isLogin ? true : false);

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify({ isLogin }));
  }, [isLogin]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout isLogin={isLogin} onSetIsLogin={setIsLogin} />
              }
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
      </AuthProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ marginTop: "12px" }}
        toastOptions={{
          duration: 3000,
          error: {
            style: { background: "#8b0000", color: "#fff" },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
