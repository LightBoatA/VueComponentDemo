<template>
<div class="box">
  <div class="collapse-item_title"  @click="toggle" >
    {{title}}
  </div>
  <div ref="content" class="collapse-item_content"  v-if="ifShow">
    <slot></slot>
  </div>

</div>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    name: { // 唯一标识符
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },

  inject: ['collapse'], // 获取祖先实例注入的数据
  methods: {
    toggle () {
      // 让祖先实例触发事件
      this.collapse.$emit('collapse', this.name)
      // if (this.ifShow) {

      // } else {
      //   this.collapse()
      // }
    },
    // 折叠
    // collapse () {
    //   console.log(this.$refs.content)
    // },
    // 展开
    unCollapse () {

    }
  },
  computed: {
    ifShow () {
      // 是否关闭子项显示,需要根据父组件collapse的value值动态计算

      return this.collapse.nameValue.indexOf(this.name) > -1
    }

  }
}
</script>

<style lang="less" scoped>
  @bdColor: #ebeef5;
  @textColor: #303133;
  .box {
    text-align: left;
    color: @textColor;
    font-size: 13px;
  }
  .collapse-item_title {
    border-top: 1px solid @bdColor;
    // padding:10px 0;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
  }
  .collapse-item_content {
    // border-bottom: 1px solid @bdcolor;
    padding-bottom: 25px;
  }
  .collapse-item_content:active {
    color: red
  }
</style>
