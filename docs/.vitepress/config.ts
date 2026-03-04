import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'AESC Components',
  description: 'Librería de Web Components basada en Lit + Tailwind',
  themeConfig: {
    nav: [
      { text: 'Guía', link: '/' },
      { text: 'Componentes', link: '/components/button' }
    ],
    sidebar: {
      '/components/': [
        {
          text: 'Componentes',
          items: [{ text: 'Button', link: '/components/button' }]
        }
      ]
    }
  }
});
