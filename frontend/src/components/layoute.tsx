import type { PropsWithChildren } from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted ">
      {/* <div className="container mx-auto"> */}

      <Header/>
      {/* </div> */}
      <main className="min-h-screen container mx-auto  py-8 px-4">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
