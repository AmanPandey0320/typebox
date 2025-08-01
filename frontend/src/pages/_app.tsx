import { SidebarProvider } from "@/context/SideBarContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (<SidebarProvider>
    <Component {...pageProps} />
  </SidebarProvider>)
}
