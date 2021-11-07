<template>
  <div class="box">
    <div class="collapse-item_title" @click="toggle">
      {{ title }}
    </div>
      <div ref="content" class="collapse-item_content" >
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    name: {
      // 唯一标识符
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
  data () {
    return {
      slotHeight: 0
    }
  },
  inject: ['collapse'], // 获取祖先实例注入的数据
  methods: {
    toggle () {
      // 让祖先实例触发事件
      this.collapse.$emit('collapse', this.name)
    },

    setDomHeight (dom, height, paddingBottom) {
      dom.style.paddingBottom = paddingBottom + 'px'
      dom.style.height = height + 'px'
    },
    contentShow () {
      this.setDomHeight(this.$refs.content, 25, this.slotHeight)
    },
    contentHidden () {
      this.setDomHeight(this.$refs.content, 0, 0)
    }
  },
  computed: {
    ifShow () {
      // 是否关闭子项显示,需要根据父组件collapse的value值动态计算
      return this.collapse.nameValue.indexOf(this.name) > -1
    }
  },
  watch: {
    // 手动v-show
    ifShow (newVal, oldVal) {
      if (newVal) {
        this.contentShow()
      } else {
        this.contentHidden()
      }
    }
  },
  mounted () {
    // 获取slot的初始值
    this.$slots.default.forEach(slot => {
      this.slotHeight += slot.elm.offsetHeight
    })
    // 判断是否默认展开面板
    if (this.ifShow) {
      this.contentShow()
    } else {
      this.contentHidden()
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
// 面板标题
.collapse-item_title {
  border-top: 1px solid @bdColor;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
}

// 面板内容
.collapse-item_content {

  overflow: hidden;
  transition: all .5s;
}
.collapse-item_content:active {
  color: red;
}

</style>
