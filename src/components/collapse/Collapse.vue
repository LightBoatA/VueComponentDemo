<template>
<div class="collapse-box">
  <div class="collapse_content">
    <slot></slot>

  </div>
</div>
</template>

<script>
export default {
  name: 'Collapse',
  props: {
    value: { // 存储当前激活的面板
      type: [String, Array],
      // require: true
      default () {
        return []
      }
    },
    accordion: { // 是否为手风琴模式
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      collapse: this
    }
  },
  data () {
    return {
      nameValue: this.value

    }
  },
  created () {
    // 子项点击后,将子项名字存入数组或移除数组
    this.$on('collapse', (val) => {
      this.$emit('change', val)
      if (this.accordion) { // 手风琴模式
        if (val === this.nameValue) {
          this.nameValue = ''
        } else {
          this.nameValue = val
        }
      } else {
        const index = this.nameValue.indexOf(val)
        if (index > -1) {
          // 此时子项是打开状态,需要关闭(从Index位置,删除一个元素)
          this.nameValue.splice(index, 1)
        } else {
          this.nameValue.push(val)
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
  @bdColor: #ebeef5;
  // .collapse-box {
  //   border: 1px solid @bdColor;
  //   padding: 24px;
  // }
  .collapse_content {
    border-bottom: 1px solid @bdColor;
  }
</style>
