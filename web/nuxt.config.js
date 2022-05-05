import i18n from './config/i18n'
export default {
  target: 'static',
  components: true,
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    // script: [
    //   {
    //     src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
    //     type: "text/javascript"
    //   }
    // ],
    htmlAttrs: {
      lang: 'en'
    },
  },
  render: {
    resourceHints: false,
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: {
  //   color: 'blue',
  // },
  // loading: 'components/Loading.vue',
  // loadingindicator: {
  //   name: 'circle',
  //   color: '#3B8070',
  //   background: 'white'
  // },
  /*
   ** Global CSS
   */
  css: ["~assets/application.scss", "~assets/tailwind.css",'@fortawesome/fontawesome-svg-core/styles.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/vue-superagent", ssr: false },
    { src: "~/plugins/localStorage", ssr: false, mode: "client" },
    "~/plugins/sweetalert2",
    "~/plugins/mixins",
    "~/plugins/font-awesome",
    { src: "~/plugins/photo-grid", mode: "client" },
    { src: "~/plugins/vux-upload", ssr:false, mode: "client" },
    '~plugins/vue-js-modal.js',
    { src: '~/plugins/v-lightbox', ssr: false },
    { src: '~/plugins/date-picker' },
    { src: '~/plugins/waterfall', ssr: false },
    { src: '~/plugins/filters', ssr: true},
    {
      src: '~/plugins/dateformat',
      ssr: true
    },
    { src: '@/plugins/vue-mavon-editor', ssr: false },
    { src: '~/plugins/lodash.js'},
    { src: '~/plugins/jquery.min.js', mode: 'client'},
    { src: '~/plugins/tooltip.js', ssr: false},
    { src: '~/plugins/vue-calendar.js', ssr: false },
    { src: '~/plugins/vue-slide-verify.js', ssr: false },
    // { src: '~/locales/index.js' }, // locales 目录没有放置在 plugins 目录下主要是为了引用 json 文件方便
    // { src: '@/plugins/vue-i18n' },
    '~/plugins/router',
    {src:'~/plugins/storeCache',ssr: false},
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // "bootstrap-vue/nuxt",
    "nuxt-fontawesome",
    "vue-sweetalert2/nuxt",
    "@nuxtjs/axios",
    '@nuxt/image',
    '@nuxtjs/markdownit',
    '@nuxt/content', 
    ['@nuxtjs/i18n', {
      defaultLocale: 'zh',
      vueI18nLoader: true,
      detectBrowserLanguage: false,
      locales: [
        {name: 'English', code: 'en', iso: 'en-US', file: 'en.js'},
        {name: '中文', code: 'zh', iso: 'zh-cn', file: 'zh.js'},
      ],
      vueI18n: i18n,
    }]
  ],
  axios: {
    // proxy: true, //开启代理
  },
  fontawesome: {
    // See https://github.com/vaso2/nuxt-fontawesome
    // 这里设置了组建的标签为fa
    // 如果不设置，则默认为在font-awesome.js中，生成的：font-awesome-icon
    component: "fa",
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons",
        icons: ["fas"],
      },
      {
        set: "@fortawesome/free-regular-svg-icons",
        icons: ["far"],
      },
      {
        set: "@fortawesome/free-brands-svg-icons",
        icons: ["fab"],
      },
    ],
  },
  router: {
    linkExactActiveClass: "active",
    base: "/"
  },
  watchQuery: true,
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  image: {
    // Options
    presets: [
      {
        name: 'jpg-cover',
        modifiers: {
          fit: 'cover',
          format: 'jpg',
          width: 300,
          height: 300
        }
      }
    ]
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    runtime: true
  },
  content: {
    markdown: {
    },
    nestedProperties: ['author.name']
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
};
