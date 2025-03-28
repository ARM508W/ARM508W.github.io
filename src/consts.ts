import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'astro-erudite',
  locale: 'en-US',
  description:
    'ARMW blog site. Based on Astro',
  href: 'https://armw.github.io/',
  featuredPostCount: 1,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/ARM508W',
    label: 'GitHub',
  },
]

export const ICON_MAP: IconMap = {
  GitHub: 'lucide:github',
  Email: 'lucide:mail',
}
