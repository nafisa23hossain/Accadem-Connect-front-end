import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}
