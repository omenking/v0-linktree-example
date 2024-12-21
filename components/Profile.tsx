'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import LinkForm from './LinkForm'

interface Link {
  id: string
  title: string
  url: string
}

interface ProfileData {
  name: string
  bio: string
  avatar: string
  links: Link[]
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then(setProfile)
  }, [])

  const handleAddLink = async (newLink: Omit<Link, 'id'>) => {
    if (!profile) return

    const updatedLinks = [...profile.links, { ...newLink, id: Date.now().toString() }]
    const updatedProfile = { ...profile, links: updatedLinks }

    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile),
    })

    if (response.ok) {
      setProfile(updatedProfile)
    } else {
      console.error('Failed to update profile')
    }
  }

  if (!profile) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <Image
        src={profile.avatar}
        alt={profile.name}
        width={100}
        height={100}
        className="mx-auto rounded-full"
      />
      <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-gray-600">{profile.bio}</p>
      <div className="mt-6 space-y-4">
        {profile.links.map((link) => (
          <Button
            key={link.id}
            className="w-full"
            variant="outline"
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </Button>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Add New Link</h2>
        <LinkForm onSubmit={handleAddLink} />
      </div>
    </div>
  )
}

