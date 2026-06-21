import { RocketIcon } from 'lucide-react'
import React from 'react'

type Props = {
  message: string
  Icon?: typeof RocketIcon
}

export function EmptySlate({ message, Icon}: Props) {
  return (
    <div className="empty-slate py-10 px-3">
      {Icon && <Icon className="size-12 text-muted-foreground/50 mx-auto mb-4" />}
      <p className="text-lg text-muted-foreground text-center">{message}</p>
    </div>
  );
}