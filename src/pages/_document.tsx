import MyNavBar from "@/components/MyNavBar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <MyNavBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
