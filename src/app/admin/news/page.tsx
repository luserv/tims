'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface News {
  id: string
  title: string
  content: string
  publishedAt: string | null
  createdAt: string
  author?: { name: string; email: string }
}

export default function AdminNews() {
  const t = useTranslations('admin.news')
  const tAdmin = useTranslations('admin')
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { fetchNews() }, [])

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news')
      if (res.ok) setNews(await res.json())
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) { setFormData({ title: '', content: '' }); fetchNews() }
      else alert(t('createError'))
    } catch { alert(t('createError')) } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('deleteConfirm'))) return
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' })
      if (res.ok) fetchNews()
      else alert(t('deleteError'))
    } catch { alert(t('deleteError')) }
  }

  if (loading) return <div className="text-center py-8">{tAdmin('loading')}</div>

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-foreground mb-6">{t('pageTitle')}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('createTitle')}</CardTitle>
          <CardDescription>{t('createDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">{t('fieldTitle')}</Label>
              <Input id="title" type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="content">{t('fieldContent')}</Label>
              <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} required />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('listTitle')}</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {news.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">{t('empty')}</div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('by')} {item.author?.name || item.author?.email} · {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground mt-2 line-clamp-2">{item.content}</p>
                    </div>
                    <Button onClick={() => handleDelete(item.id)} variant="destructive" size="sm" className="ml-4">
                      {t('delete')}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
