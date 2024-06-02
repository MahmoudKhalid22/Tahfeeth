import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import Details from "./components/Details";
import Student from "./pages/Student";
import Teacher from "./components/Teacher/Teacher";
import Verification from "./pages/Verification";
import { useContext, useEffect, useState } from "react";
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
import { AuthContext, AuthProvider } from "./utils/context";
import useMedia from "./utils/toastQuery";

const queryClient = new QueryClient();

function App() {
  const bigScreen = useMedia("(min-width: 768px)");

  const { isLogin, setIsLogin } = useContext(AuthContext);
  console.log(isLogin);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/verified" element={<Verified />} />
              <Route path="/details" element={<Details />} />
              <Route path="/register" element={<Register />} />
              <Route path="/details/:id" element={<Student />} />
              <Route path="/teacher/:id" element={<Teacher />} />
              <Route path="/settings">
                <Route index element={<Settings />} />
                <Route path="edit" element={<Edit />} />
              </Route>

              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/redirect" element={<RedirectPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          marginTop: "12px",
          width: bigScreen ? "80%" : "auto",
          marginRight: bigScreen ? "auto" : "0",
        }}
        toastOptions={{
          duration: 3500,
          error: {
            style: {
              background: "#8b0000",
              color: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
