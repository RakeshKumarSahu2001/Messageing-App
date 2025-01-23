import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function HomePage() {
  return (
    <>
    <div>
      <Navbar />
      <Outlet />
    </div>
    </>
  )
}

export default HomePage;