import type { ReactNode } from "react";
import { inter, poppins } from "./fonts";
import { metadata } from "./metadata";
import "../styles/globals.css";
import "../styles/brand.css";
import { Providers } from "@/components/providers";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

export { metadata };

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased w-full`}>
        <NextIntlClientProvider>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
