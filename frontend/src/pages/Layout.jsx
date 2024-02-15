import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
 

  return (
    <>
      <header className=" text-slate-900">
        <Navbar/>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
