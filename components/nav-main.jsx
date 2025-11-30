'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { IconCirclePlusFilled, IconMail } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'

export function NavMain({ items = [] }) {
  const pathname = usePathname() || '/'

  const isActiveUrl = (itemUrl) => {
    if (!itemUrl) return false

    const clean = (u) => (u === '/' ? '/' : u.replace(/\/$/, ''))

    const path = clean(pathname)
    const url = clean(itemUrl)

    if (url === '/app') {
      return path === '/app'
    }

    return path.startsWith(url)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2 mt-4'>
        {/* Main Menu */}
        <SidebarMenu>
          {items.map((item) => {
            const active = isActiveUrl(item.url)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={active ? 'true' : 'false'}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className='!size-5' />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
