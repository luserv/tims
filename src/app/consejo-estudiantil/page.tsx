import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/sections/header/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function ConsejoEstudiantilPage() {
  const t = await getTranslations('council')

  const roles = [
    t('roles.president'),
    t('roles.vicePresident'),
    t('roles.secretary'),
    t('roles.treasurer'),
    t('roles.member'),
  ]

  const functions: string[] = t.raw('functions')

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-primary">◎</span> {t('missionTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">{t('missionText')}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-primary">◎</span> {t('visionTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">{t('visionText')}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>{t('boardTitle')}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div key={role} className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 hover:bg-muted/70 transition-colors">
                  <Badge variant="secondary" className="w-fit text-xs">{role}</Badge>
                  <p className="font-semibold text-foreground">{t('tbd')}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('statutesTitle')}</CardTitle></CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed space-y-4">
            <p>{t('statutesIntro')}</p>
            <p><strong>{t('chapter1')}</strong></p>
            <p><strong>{t('chapter2')}</strong></p>
            <p><strong>{t('chapter3')}</strong></p>
            <p className="text-sm italic border-l-2 border-primary pl-3">{t('statutesNote')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('functionsTitle')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              {functions.map((fn, i) => <li key={i}>{fn}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
