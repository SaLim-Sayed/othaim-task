import { cn } from '@/src/lib/cn'
import React from 'react'

export default function Heading({ title, className }: { title: string, className?: string }) {
  return (
    <div className={cn(" text-[40px] font-bold text-secondaryColor-900  my-4", className)}>{title}</div>
  )
}
