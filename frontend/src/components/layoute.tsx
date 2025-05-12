import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-background to-muted ">
      {/* <div className="container mx-auto"> */}

      <Header/>
      {/* </div> */}
      <main className="min-h-screen container mx-auto  py-8 px-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
