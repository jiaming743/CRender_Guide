module.exports = {
  title: 'CRender_Guide',
  description: 'Just playing around',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  host: '192.168.10.150',
  port: 5002,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'CRender',
      description: '基于Canvas的矢量图形渲染插件'
    },
    '/EN/': {
      lang: 'en-US',
      title: 'CRender',
      description: 'Canvas-based vector graphics rendering plugin'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          {
            text: '指南',
            link: '/guide/'
          },
          {
            text: '扩展',
            link: '/extend/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/jiaming743/CRender_Guide'
          }
        ],
        sidebar: {
          '/guide/': [
            ''
          ],
          '/extend/': [
            ''
          ]
        }
      },
      '/EN/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/jiaming743/CRender_Guide'
          }
        ],
        sidebar: {
          '/EN/guide/': [
            ''
          ]
        }
      }
    }
  }
}
