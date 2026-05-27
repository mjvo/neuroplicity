<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

type NavDoc = {
  path: string
  title?: string
  meta?: {
    navTitle?: string
    navOrder?: number
    navSection?: string
  }
}

type NavLink = {
  label: string
  to: string
}

const { data: navDocs } = await useAsyncData('site-navigation', () =>
  queryCollection('content')
    .select('path', 'title', 'meta')
    .all()
)

const docs = computed(() => (navDocs.value ?? []) as NavDoc[])

const navTitle = (doc: NavDoc) => doc.meta?.navTitle || doc.title || doc.path
const navOrder = (doc: NavDoc) => doc.meta?.navOrder ?? 999
const navSection = (doc: NavDoc) => doc.meta?.navSection

const sortByNavOrder = (a: NavDoc, b: NavDoc) => {
  const orderA = navOrder(a)
  const orderB = navOrder(b)
  if (orderA !== orderB) return orderA - orderB
  return navTitle(a).localeCompare(navTitle(b))
}

const toNavLink = (doc: NavDoc): NavLink => ({
  label: navTitle(doc),
  to: doc.path
})

const homeLink = computed(() => {
  const doc = docs.value.find((item) => item.path === '/')
  return doc ? toNavLink(doc) : null
})

const aboutLink = computed(() => {
  const doc = docs.value.find((item) => item.path === '/about')
  return doc ? toNavLink(doc) : null
})

const teamLink = computed(() => {
  const doc = docs.value.find((item) => item.path === '/team')
  return doc ? toNavLink(doc) : null
})

const profilesRoot = computed(() => {
  const doc = docs.value.find((item) => item.path === '/researcher-profiles')
  return doc ? toNavLink(doc) : null
})

const exploreRoot = computed(() => {
  const doc = docs.value.find((item) => item.path === '/explore')
  return doc ? toNavLink(doc) : { label: 'Explore', to: '/explore' }
})

const profileLinks = computed(() => {
  return docs.value
    .filter((item) => navSection(item) === 'profiles')
    .sort(sortByNavOrder)
    .map(toNavLink)
})

const exploreLinks = computed(() => {
  return docs.value
    .filter((item) => navSection(item) === 'explore')
    .sort(sortByNavOrder)
    .map(toNavLink)
})

const navItems = computed<NavigationMenuItem[]>(() => {
  const items: NavigationMenuItem[] = []

  if (homeLink.value) {
    items.push({ label: homeLink.value.label, to: homeLink.value.to })
  }

  if (profilesRoot.value) {
    items.push({
      label: profilesRoot.value.label,
      to: profilesRoot.value.to,
      children: [
        { label: 'All Profiles', to: profilesRoot.value.to },
        ...profileLinks.value.map((link) => ({ label: link.label, to: link.to }))
      ]
    })
  }

  if (exploreRoot.value) {
    items.push({
      label: exploreRoot.value.label,
      to: exploreRoot.value.to,
      children: [
        ...exploreLinks.value.map((link) => ({ label: link.label, to: link.to }))
      ]
    })
  }

  if (teamLink.value) {
    items.push({ label: teamLink.value.label, to: teamLink.value.to })
  }

  if (aboutLink.value) {
    items.push({ label: aboutLink.value.label, to: aboutLink.value.to })
  }

  return items
})

const mobileNavItems = computed<NavigationMenuItem[][]>(() => {
  const groups: NavigationMenuItem[][] = []

  if (homeLink.value) {
    groups.push([{ label: homeLink.value.label, to: homeLink.value.to }])
  }

  if (profilesRoot.value) {
    groups.push([
      { label: 'Researcher Profiles', type: 'label' },
      { label: 'All Profiles', to: profilesRoot.value.to },
      ...profileLinks.value.map((link) => ({ label: link.label, to: link.to }))
    ])
  }

  if (exploreRoot.value) {
    groups.push([
      { label: 'Explore', type: 'label' },
      { label: 'Explore', to: exploreRoot.value.to },
      ...exploreLinks.value.map((link) => ({ label: link.label, to: link.to }))
    ])
  }

  if (teamLink.value) {
    groups.push([{ label: teamLink.value.label, to: teamLink.value.to }])
  }

  if (aboutLink.value) {
    groups.push([{ label: aboutLink.value.label, to: aboutLink.value.to }])
  }

  return groups
})

const headerUi = {
  root: 'bg-[var(--header-bg)] border-[var(--header-border)]',
  title: 'font-sans tracking-wide text-[var(--brand-color)] hover:text-[var(--brand-hover)]',
  overlay: 'bg-slate-950/70',
  content: 'bg-[var(--menu-bg)] text-[var(--text-main)] ring-[var(--menu-border)] shadow-2xl',
  body: 'text-[var(--text-main)]'
}

const navigationUi = {
  viewport: 'bg-[var(--menu-bg)] ring-[var(--menu-border)] shadow-[var(--shadow)]',
  arrow: 'bg-[var(--menu-bg)] border-[var(--menu-border)]',
  link: 'text-[var(--ui-text)] hover:text-[var(--ui-text-highlighted)] data-[state=open]:text-[var(--ui-text-highlighted)]',
  label: 'text-[var(--ui-text-highlighted)]',
  childLink: 'text-[var(--ui-text)] hover:text-[var(--ui-text-highlighted)]',
  childLinkLabel: '!whitespace-normal !overflow-visible !text-clip',
  childLinkDescription: 'text-[var(--ui-text-muted)]'
}
</script>

<template>
  <UHeader
    title="Neuroplicity"
    to="/"
    :menu="{ title: 'Neuroplicity', description: 'Site navigation' }"
    :ui="headerUi"
  >
    <UNavigationMenu :items="navItems" :ui="navigationUi" />

    <template #right>
      <div class="theme-switch">
        <UColorModeSwitch size="xl" color="neutral" />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="mobileNavItems"
        orientation="vertical"
        class="-mx-2.5"
        :ui="navigationUi"
      />
    </template>
  </UHeader>
</template>
