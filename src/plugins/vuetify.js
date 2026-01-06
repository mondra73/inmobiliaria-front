import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css' // Cambiado a .min.css

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', 
  },
  theme: {
    defaultTheme: 'customDark',
    themes: {
      customDark: {
        dark: true,
        colors: {
          background: '#1e1e1e',
          surface: '#1e1e1e',
          primary: '#1867C0',
          secondary: '#5CBBF6',
          'on-surface': '#FFFFFF',
        }
      },
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        }
      }
    }
  }
})