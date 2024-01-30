import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        className="mt-[72px] lg:mt-[52px] z-10"
        autoClose={1500}
      />
      <Component {...pageProps} />
    </>
  );
}
