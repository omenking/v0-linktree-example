'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Link {
  id: string
  title: string
  url: string
}

interface LinkFormProps {
  onSubmit: (link: Omit<Link, 'id'>) => void
}

export default function LinkForm({ onSubmit }: LinkFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, url })
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Link Title"
        required
      />
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Link URL"
        required
      />
      <Button type="submit" className="w-full">
        Add Link
      </Button>
    </form>
  )
}

