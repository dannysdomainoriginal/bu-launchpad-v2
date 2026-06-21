import { RocketIcon } from 'lucide-react'
import React from 'react'

type Props = {
  Icon: typeof RocketIcon
  title: string
  description: string
}

export function SectionHeader({ Icon, title, description }: Props) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <Icon className='size-6 text-primary' />
        <h2 className='text-2xl sm:text-3xl font-bold'>{title}</h2>
      </div>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  )
}