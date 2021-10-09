export default {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  publicRuntimeConfig: {
    APP_ORIGIN: process.env.APP_ORIGIN,
    ORIGIN: process.env.ORIGIN
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'musics-board',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    script: [
      { 
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
      },
      {
        src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
      },
      {
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",
      }
    ],
    link: [
      { rel: 'stylesheet', href: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/modal.js', ssr: false},
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-fontawesome'
  ],
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': {
      target: 'http://backend:8080',
    },
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ],
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  serverMiddleware: ['~/server']
}
