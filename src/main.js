// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo'
import awsmobile from './AppSync'
const client = new AWSAppSyncClient(
  {
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
      type: awsmobile.aws_appsync_authenticationType,
      apiKey: awsmobile.aws_appsync_apiKey
    }
  },
  {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  }
)
const appsyncProvider = new VueApollo({
  defaultClient: client
})

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueApollo)
new Vue({
  el: '#app',
  router,
  components: { App },
  provide: appsyncProvider.provide(),
  template: '<App/>'
})
