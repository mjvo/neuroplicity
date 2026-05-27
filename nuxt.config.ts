export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/color-mode', 'nuxt-lucide-icons'],
  icon: {
    provider: 'none',
    clientBundle: {
      icons: [
        'simple-icons:facebook',
        'simple-icons:youtube',
        'simple-icons:linkedin'
      ]
    }
  },
  ui: {
    fonts: false
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  css: ['~/assets/css/main.css'],
  ssr: true,
  compatibilityDate: '2026-02-28',
  nitro: {
    preset: 'netlify-static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/team',
        '/explore',
        '/researcher-profiles',
        '/researcher-profiles/nicole-calakos',
        '/researcher-profiles/cagla-eroglu',
        '/researcher-profiles/nina-sherwood',
        '/researcher-profiles/scott-soderling',
        '/people-on-the-street',
        '/understanding-neurons',
        '/conducting-neuroscience-research',
        '/daily-life-of-a-scientist'
      ]
    }
  },
  routeRules: {
    '/**': { prerender: true }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      titleTemplate: '%s | Neuroplicity',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Neuroplicity static archive of a multi-year Duke student/faculty science communication project.'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Nunito+Sans:wght@400;600;700&display=swap'
        },
        { rel: 'icon', type: 'image/png', href: '/images/cropped-neuroplicity_icon-32x32.png' }
      ]
    }
  }
})
