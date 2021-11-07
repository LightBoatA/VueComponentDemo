<template>
  <div >
    <div class="node-line">
      <div  class="node-label common-text "  @click="toggleExpand" >
        <span v-show="!isleaf" ref="icon" class="icon-play3 placeholder-text" ></span>
        <span class="node-text" ref="label" >{{node.label}}</span>
      </div>
      <input class="checkbox" v-if="showCheckbox" type="checkbox" name="" id="" v-model="checkState" ref="cbox" @change="checkStateChanged" >
    </div>
    <!-- <div  class="node-label common-text "   >
      <span v-show="!isleaf" ref="icon" class="icon-play3 placeholder-text" @click="toggleExpand"></span>
      <input class="checkbox" v-if="showCheckbox" type="checkbox" name="" id="" v-model="checkState" ref="cbox" @change="checkStateChanged" >
      <span class="node-text"  @click="toggleExpand">{{node.label}}</span>
    </div> -->
      <ul class="child-node" ref="child" >
        <!--  -->
        <tree-node
          v-show="expanted"
          v-for="(obj,index) in node.children"
          :key="obj.label"
          :node="obj"
          :shouldCheck="checkStates[index]"
          :index="index"
          :showCheckbox="showCheckbox"
          @check-change="handleCheckChange"
          >
        </tree-node>
      </ul>
  </div>
</template>

<script>
import bus from '@/components/eventBus.js'

export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    shouldCheck: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    /** ***************************工具方法*****************************/
    initCheckStates (state) {
      if (this.node.children) {
        for (let i = 0; i < this.node.children.length; i++) {
          this.checkStates.push(state)
        }
      }
    },
    changeChildrenCheckStates () {
      if (this.checkStates.length) {
        this.checkStates.length = 0
        this.initCheckStates(this.checkState)
      }
    },
    changeParentCheckState () {
      const eventVal = {
        isChecked: this.checkState,
        index: this.index
      }
      this.$emit('check-change', eventVal)
    },
    getChildHeight () {

    },
    contentShow () {
      this.$refs.child.style.height = this.getChildHeight() + 'px'
    },
    contentHidden () {
      console.log('hidden')
      this.$refs.child.style.height = 0
    },
    /** ***************************工具方法*****************************/
    toggleExpand () {
      if (this.node.children && this.node.children.length) {
        this.expanted = !this.expanted
        // 图标旋转
        if (this.expanted) {
          this.$refs.icon.style.transform = 'rotate(' + 90 + 'deg)'
        } else {
          this.$refs.icon.style.transform = 'rotate(' + 0 + 'deg)'
        }
      }
      console.log('点击了')
      // 点击了谁,传到顶层
      bus.$emit('clicked', this.$data)
    },
    // 用户点击
    checkStateChanged (e) {
      this.changeChildrenCheckStates() // 孩子数组修改
      this.changeParentCheckState() // 影响父亲
    },
    // 处理子组件触发的事件
    handleCheckChange (e) {
      // 通过子节点控制自己
      this.checkStates[e.index] = e.isChecked
      if (this.checkStates.every(ele => ele === this.checkStates[0])) { // 子节点的checkState全相同
        this.$refs.cbox.indeterminate = false
        this.checkState = this.checkStates[0]
      } else { // 子节点的checkState不同
        this.checkState = 'indeterminate'
        this.$refs.cbox.indeterminate = true
      }
      // console.log('自定义事件传播到', this.node.label)
      // 向父节点传递
      this.changeParentCheckState()
    }
  },
  computed: {

  },
  data () {
    return {
      expanted: false,
      checkStates: [], // 子节点的状态
      checkState: false, // 本节点的状态
      isleaf: true
    }
  },
  watch: {
    // 处理父组件传来的消息
    shouldCheck (newVal, oldVal) {
      // 上头传来消息,你自己要变,还要将消息传下去
      this.checkState = newVal
      this.changeChildrenCheckStates()
    },
    // checked状态变化,向顶层发通知
    checkState (newVal, oldVal) {
      if (oldVal !== newVal) {
        // 传到顶层 (本组件,选中状态,是否不明确)
        // console.log(this.node.label, '改变了')
        const state = this.$refs.cbox.indeterminate ? false : this.checkState
        bus.$emit('nodeCheckChanged', this.$data, state, this.$refs.cbox.indeterminate)
      }
    }
    // 手动v-show
    // expanted (newVal, oldVal) {

    // }
  },
  created () {
    // 初始化孩子节点的checked状态
    this.initCheckStates(false)
    // 判断自己是不是叶子节点
    if (this.node.children && this.node.children.length) {
      this.isleaf = false
    }
    // this.$data.$treeLabel = 3
  },
  mounted () {
    // 如果有复选框,留出位置
    if (this.showCheckbox) {
      this.$refs.label.style.marginLeft = 26 + 'px'
      // 如果是叶子节点,定位的left值要改变
      if (this.isleaf) {
        this.$refs.cbox.style.left = 0 + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  // @import '@/assets/css/font-icon.css';
  // @import url('@/assets/css/font-icon.css');
  // @import '../../assets/css/base.css';
  @import '../../assets/css/font-icon.css';
  @import '../../assets/css/color.css';

  .node-line {
    position: relative;
  }
  .node-label {
    height: 26px;
    cursor: pointer;
    background-color: #fff;
  }
  .node-label:hover {
    background-color: #F5F7FA;
  }
  .node-text {
    width: 100%;
    font-size: 14px;
  }
  // 小三角图标
  .icon-play3 {

    display: inline-block;
    font-size: 5px;
    margin-right: 5px;
    transition: all 0.5s;
  }
  // 选框
  .checkbox {
    position: absolute;
    top: 0;
    left: 15px;
    display: inline-block;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid red;
    margin-right: 10px;
  }
  .child-node {
    overflow: hidden;
    margin: 0;
  }

  .node-label {

    margin: 0;
    padding: 0;;

  }

</style>
