import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const SUPPORTED = ['es', 'en'] as const;
type Locale = (typeof SUPPORTED)[number];

function isSupported(l: string): l is Locale {
  return (SUPPORTED as readonly string[]).includes(l);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Explicit locale passed via getTranslations({locale: 'en'}) takes priority
  const explicit = await requestLocale;
  if (explicit && isSupported(explicit)) {
    return {
      locale: explicit,
      messages: (await import(`../../messages/${explicit}.json`)).default,
    };
  }

  // Auto-detect: cookie → Accept-Language → default 'es'
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get('NEXT_LOCALE')?.value;

  let locale: Locale;
  if (fromCookie && isSupported(fromCookie)) {
    locale = fromCookie;
  } else {
    const acceptLang = (await headers()).get('accept-language') ?? '';
    const lang = acceptLang.split(',')[0].split('-')[0].toLowerCase();
    locale = isSupported(lang) ? lang : 'es';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
