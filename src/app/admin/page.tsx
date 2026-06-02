import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminDashboard() {
  const t = await getTranslations('admin.dashboard')
  return (
    <div className="px-4 py-6 sm:px-0">
      <Card className="h-96 flex items-center justify-center">
        <CardHeader className="text-center">
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-x-4">
            <Button asChild><Link href="/admin/news">{t('manageNews')}</Link></Button>
            <Button asChild variant="secondary"><Link href="/admin/events">{t('manageEvents')}</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
