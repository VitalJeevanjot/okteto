
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'dashboard', component: () => import('pages/dashboard.vue') },
      {
        path: 'namespace/:id',
        component: () => import('pages/apps.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/namespaceActions.vue'),
            children: [
              { path: '', component: () => import('pages/listingapps.vue') }
            ]
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
