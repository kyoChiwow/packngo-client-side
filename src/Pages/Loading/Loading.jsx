// import Footer from "@/Shared/Footer/Footer";
// import NavBar from "@/Shared/NavBar/NavBar";

const Loading = () => {
  return (
    <div>
      {/* Navbar div */}
      {/* <header>
        <NavBar></NavBar>
      </header> */}
      {/* Navbar div */}

      {/* Main div */}
      <main className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </main>
      {/* Main div */}

      {/* Footer Div */}
      {/* <footer>
        <Footer></Footer>
      </footer> */}
      {/* Footer Div */}
    </div>
  );
};

export default Loading;
