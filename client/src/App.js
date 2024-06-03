import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "react-image-crop/dist/ReactCrop.css";
import { AppLayout, Home } from "./ui/index";
import {
  Register,
  Student,
  Settings,
  Edit,
  NotFound,
  Verification,
  Verified,
  ForgetPassword,
  RedirectPage,
  ResetPasswordForm,
  ProfilePage,
} from "./pages/index";
import Teacher from "./features/teacher/Teacher";
import { AuthProvider } from "./utils/context";
import useMedia from "./utils/toastQuery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 86400000,
    },
  },
});

function App() {
  const bigScreen = useMedia("(min-width: 768px)");

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
              <Route path="/details" element={<ProfilePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/details/:id" element={<Student />} />
              <Route path="/teacher/:id" element={<Teacher />} />
              <Route path="/settings">
                <Route index element={<Settings />} />
                <Route path="edit" element={<Edit />} />
              </Route>

              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
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
