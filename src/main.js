import Vue from 'vue'
import App from './App.vue'
import router from './router'

import notice from '@/components/notice/index.js'

// 挂载到vue构造函数原型上,所有组件实例都可以使用$notice方法了
Vue.prototype.$notice = notice

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
