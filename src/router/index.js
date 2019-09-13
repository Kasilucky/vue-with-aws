import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ServiceProvider from '@/components/ServiceProvider'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/serviceprovider',
      name: 'ServiceProvider',
      component: ServiceProvider
    }
  ]
})
