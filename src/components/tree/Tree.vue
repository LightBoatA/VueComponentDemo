<template>
  <div>
    <!-- 此组件接收一个数组,循环数组,创建节点 -->
    <div v-for="(obj,index) in treeData" :key="obj.label">
      <!-- <TreeNode></TreeNode> -->
      <tree-node
      :node="obj"
      :showCheckbox="showCheckbox"
      :shouldCheckedArr="checkStates"
      :shouldCheck="checkStates[index]"
      :index="index"
      ></tree-node>
    </div>
  </div>
</template>

<script>
import TreeNode from '@/components/tree/TreeNode.vue'
import bus from '@/components/eventBus.js'
export default {
  name: 'Tree',
  components: {
    TreeNode
  },
  props: {
    treeData: {
      type: [],
      required: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  },
  computed: {

  },
  data () {
    return {
      checkStates: []
    }
  },
  mounted () {
    bus.$on('nodeCheckChanged', (comp, checked, indeterminate) => {
      this.$emit('state-changed', comp, checked, indeterminate)
    })
    bus.$on('clicked', data => {
      this.$emit('node-clicked', data)
    })
  },
  created () {
    for (let i = 0; i < this.treeData.length; i++) {
      this.checkStates.push(false)
    }
  },
  beforeDestroy () {
    bus.$off(['nodeCheckChanged', 'clicked'])
  }
}
</script>

<style></style>
