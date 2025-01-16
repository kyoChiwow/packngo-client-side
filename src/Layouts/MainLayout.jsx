import useAuth from "@/Hooks/useAuth";
import Loading from "@/Pages/Loading/Loading";
import Footer from "@/Shared/Footer/Footer";
import NavBar from "@/Shared/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    <Loading></Loading>;
  }
  return (
    <div>
      {/* Header div here */}
      <header>
        <NavBar></NavBar>
      </header>
      {/* Header div here */}

      {/* Outlet div here */}
      <main>
        <Outlet></Outlet>
      </main>
      {/* Outlet div here */}

      {/* Footer div here */}
      <footer>
        <Footer></Footer>
      </footer>
      {/* Footer div here */}
    </div>
  );
};

export default MainLayout;
