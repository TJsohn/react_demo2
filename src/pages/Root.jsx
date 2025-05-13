import { Outlet } from "react-router";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Root = () => {

  return (
    <>
      <Header name="TJ Sohn" />
      <main>
          <Outlet />
      </main> 
      <Footer year={2025} />
    </>
  );
};

export default Root;