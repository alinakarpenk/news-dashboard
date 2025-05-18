import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
         <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
