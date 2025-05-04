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
// import useNewsStore from "./stores/useNewsStore";
// import TestDrag from "./components/testTdrag";
// import { SheetDemo } from "./components/Admin/testTable";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:name/:id" element={<CategoryNews />} />
            <Route path="/addNews" element={<AddNews />} />
            <Route path="/managenews" element={<ManageNews />} />
            <Route path="/news/:id" element={<ArticlePage/>}/>
            {/* <Route path="/img" element={<TestDrag/>}/> */}
            {/* <Route path="test" element={<SheetDemo/>} /> */}
          </Routes>
        </Layout>
        <Toaster richColors />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
