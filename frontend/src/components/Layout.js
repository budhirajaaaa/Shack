import Navbar from "./navbar";
import SideNav from "./SideNav";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Layout() {
  return (
    <div className="fullLayout">
      <Navbar />
      <div className="mainLayout">
        <SideNav />
        <div className="mainContent">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
