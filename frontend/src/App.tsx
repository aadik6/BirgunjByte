import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layoute";
import { ThemeProvider } from "./context/theme-provider";
import HomePage from "./pages/homePage";
import { Toaster } from "sonner";
import Category from "./components/Admin/addCategory";
import CategoryNews from "./pages/categoryNews";
import AddNews from "./components/Admin/addNews";
import ManageNews from "./components/Admin/manageNews";
import ArticlePage from "./components/articlePage";
import Login from "./components/login";
import AdminLayout from "@/components/adminLayout";
import AdminDashboard from "./components/Admin/adminDashboard";
import ProtectedRoute from "./config/protectedRoute";
import Users from "./components/Admin/users";
import AddUser from "./components/Admin/addUser";
import AccountPage from "./components/Admin/profile";
import ManageAds from "./components/Admin/manageAds";
import NewsInsight from "./components/Admin/newsInsight";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster richColors />
        <Routes>
          {/* Routes for the main layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category/:name/:id" element={<CategoryNews />} />
            <Route path="/news/:id" element={<ArticlePage />} />
          </Route>

          {/* Routes for the admin layout */}
          <Route element={<AdminLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/managenews" element={<ManageNews />} />
              <Route path="/admin/addNews" element={<AddNews />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/adduser" element={<AddUser />} />
              <Route path="/admin/ads" element={<ManageAds />} />
              <Route path="/admin/profile" element={<AccountPage />} />
              <Route path="/admin/news/:id" element={<NewsInsight />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
