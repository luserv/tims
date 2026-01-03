import type { Metadata } from "next";
import { geistSans, geistMono } from "./fonts";
import "../styles/globals.css";
import "../styles/brand.css";


export const metadata: Metadata = {
 title: "Tecnologias de la Informacion",
 description: "Pagina de la Carrera Tecnologias de la Informacion de la Escuela Superior Politecnica del Chimborazo sede Morona Santiago, Ecuador",
 keywords: ["Tecnologias de la Informacion", "ESPOCH", "Morona Santiago", "Ecuador"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children} 
        <meta name="google-site-verification" content="9nRuM_4g3lRnTpjyhDxECY8G7v0TzZVplSCH4y9JRI4" />
      </body>
    </html>
  );
}
