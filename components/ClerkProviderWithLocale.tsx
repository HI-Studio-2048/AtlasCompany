'use client'
import { ClerkProvider } from '@clerk/nextjs'
import {
  enUS, zhCN, zhTW, jaJP, koKR, arSA, frFR, deDE,
  esES, ptBR, ruRU, idID, viVN, thTH, msMY, itIT,
} from '@clerk/localizations'
import { useLang } from '@/context/LanguageContext'
import type { ReactNode } from 'react'

const LOCALES = {
  en:   enUS,
  zh:   zhCN,
  'zh-TW': zhTW,
  ja:   jaJP,
  ko:   koKR,
  ar:   arSA,
  fr:   frFR,
  de:   deDE,
  es:   esES,
  pt:   ptBR,
  ru:   ruRU,
  id:   idID,
  vi:   viVN,
  th:   thTH,
  ms:   msMY,
  it:   itIT,
} as const

export default function ClerkProviderWithLocale({ children }: { children: ReactNode }) {
  const { lang } = useLang()
  const localization = LOCALES[lang as keyof typeof LOCALES] ?? enUS

  return (
    <ClerkProvider localization={localization}>
      {children}
    </ClerkProvider>
  )
}
