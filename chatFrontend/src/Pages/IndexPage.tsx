import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function IndexPage() {
  return (
    <div>
    <Navbar />
    <Outlet />
  </div>
  )
}

export default IndexPage