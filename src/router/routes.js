import { Trans } from '@/services/Translation'

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

export default [
  {
    path: '/:lang',
    component: {
      template: '<router-view></router-view>'
    },
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: '',
        name: 'HelloWorld',
        component: load('HelloWorld')
      },
      {
        path: 'about',
        name: 'about',
        component: load('About')
      },
      {
        path: '*',
        component: load('404')
      }
    ]
  },
  {
    // Redirect user to supported lang version.
    path: '*',
    redirect (to) {
      return Trans.getUserSupportedLang()
    }
  }
]
