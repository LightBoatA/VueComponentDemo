import Vue from 'vue'
import Notice from '@/components/notice/Notice.vue'

// 创建一个vue组件构造器
const NoticeConstructor = Vue.extend(Notice)

// notice 用组件选项创建一个组件,并挂载到dom上
export default function notice (options) {
  /*
  options 是个对象
  options: {
    title:
    message:
  }
  */
  const instance = new NoticeConstructor({
    data: options
  })

  /** ****把组件挂载到dom上 ********/

  // 在文档之外渲染
  instance.$mount() // dom元素渲染完成
  // (手动)挂载到body上
  document.body.appendChild(instance.$el) // $el就是组件的dom对象,template下的div

  /** ****把组件挂载到dom上 ********/

  return instance
  // 再去main.js中挂载
}
