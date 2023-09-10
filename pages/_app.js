import "@/styles/globals.css";
import { AuthProvider } from "./lib/authContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
