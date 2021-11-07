<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <div class="center">
      <div class="btn">
        <button @click="openNotice">打开弹框</button>
      </div>
      <!-- <div class="tree-kinds"> -->
      <h3 class="title">树形结构</h3>
      <p class="description">
        基本树形结构展示,可绑定结点点击事件,获取相应结点信息
      </p>
      <div class="comp-box">
        <Tree :treeData="treeData"></Tree>
      </div>
      <h3 class="title">开启复选框的树形结构</h3>
      <p class="description">
        开启节点前的复选框,可实时显示父子节点之间的选中关系,可绑定复选框状态改变事件,获取所有状态发生改变的结点信息
      </p>
      <!-- <div class="tree-kinds"> -->
      <div class="comp-box">
        <Tree
          :treeData="treeData"
          show-checkbox
          @state-changed="handleCheckChange"
          @node-clicked="handleNodeClick"
        ></Tree>
      </div>
      <!-- </div> -->
      <!-- </div> -->
      <h3 class="title">折叠面板</h3>
      <p class="description">可同时展开多个面板，面板之间不影响</p>
      <div class="comp-box">
        <Collapse :value="activeNames" @change="collapseChange">
          <CollapseItem title="浮动特性" name="1">
            <div>脱标：脱离标准流，位置任由其它元素占有</div>
            <div>浮起来：一行显示，父盒子放不下会另起一行</div>
            <div>具有行内块特性：可设置宽高</div>
          </CollapseItem>
          <CollapseItem title="浮动原则" name="2">
            <div>孩子一浮全浮动，不要有的浮有的不浮，会乱</div>
            <div>为什么不使用行内块？行内块中间有间隙</div>
          </CollapseItem>
          <CollapseItem title="清除浮动原因" name="3">
            <div>
              原因：父盒子不方便给高度，浮动盒子无法撑开父盒子，会挡住下方标准流盒子
            </div>
            <div>
              本质：清除浮动对下边标准流的影响。如果父盒子给了高度，不用清除浮动
            </div>
          </CollapseItem>
          <CollapseItem title="清除浮动方法" name="4">
            <div>
              额外标签法/隔墙法：在最后一个浮动的元素后面再加一个块级元素标签
            </div>
            <div>给父元素添加溢出隐藏</div>
          </CollapseItem>
        </Collapse>
      </div>

      <h3 class="title">折叠面板-手风琴模式</h3>
      <p class="description">每次只能展开一个面板</p>
      <div class="comp-box">
        <Collapse :value="activeName" accordion @change="collapseChange">
          <CollapseItem title="浮动特性" name="1">
            <div>脱标：脱离标准流，位置任由其它元素占有</div>
            <div>浮起来：一行显示，父盒子放不下会另起一行</div>
            <div>具有行内块特性：可设置宽高</div>
          </CollapseItem>
          <CollapseItem title="浮动原则" name="2">
            <div>孩子一浮全浮动，不要有的浮有的不浮，会乱</div>
            <div>为什么不使用行内块？行内块中间有间隙</div>
          </CollapseItem>
          <CollapseItem title="清除浮动原因" name="3">
            <div>
              原因：父盒子不方便给高度，浮动盒子无法撑开父盒子，会挡住下方标准流盒子
            </div>
            <div>
              本质：清除浮动对下边标准流的影响。如果父盒子给了高度，不用清除浮动
            </div>
          </CollapseItem>
          <CollapseItem title="清除浮动方法" name="4">
            <div>
              额外标签法/隔墙法：在最后一个浮动的元素后面再加一个块级元素标签
            </div>
            <div>给父元素添加溢出隐藏</div>
          </CollapseItem>
        </Collapse>
      </div>
    </div>

    <!-- <button-counter></button-counter> -->
  </div>
</template>
<script>
import Tree from '@/components/tree/Tree.vue'
import Collapse from '@/components/collapse/Collapse.vue'
import CollapseItem from '@/components/collapse/CollapseItem.vue'

export default {
  components: {
    Tree,
    Collapse,
    CollapseItem
  },
  data () {
    return {
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            },
            {
              label: '二级 1-2',
              children: [
                {
                  label: '三级 1-2-1'
                },
                {
                  label: '三级 1-2-2'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            },
            {
              label: '二级 3-3',
              children: [
                {
                  label: '三级 3-3-1'
                }
              ]
            }
          ]
        }
      ],
      activeNames: ['3'],
      activeName: '3'
    }
  },
  methods: {
    openNotice () {
      this.$notice({
        title: 'Hi',
        message: 'Have a nice day !'
        // duration: 0
      })
    },
    //* 调试 */
    print () {
      const arr = []
      const a = '23'
      console.log(a)
      console.log(arr)
      console.dir(this)
    },
    /* 调试结束 */
    handleCheckChange (data, checked, indeterminate) {
      console.log('改变选中状态:', data, checked, indeterminate)
    },
    handleNodeClick (data) {
      console.log('点击了node:', data)
    },
    collapseChange (val) {
      console.log('点击了', val)
    }
  }
}
</script>
<style lang="less">
// * {
//   margin: 0;
//   padding: 0;
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 1600px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.center {
  width: 70%;

  margin: 0 auto;
  // background-color: blue;
  text-align: left;
}
.comp-box {
  text-align: left;
  margin: 30px 0;
  padding: 24px;
  // padding-left: 24px;
  // padding-bottom: 30px;
  border: 1px solid #ebeef5;
}

.tree-kinds {
  // background-color: pink;
  margin-top: 30px;
}

.title {
  margin-top: 50px;
  color: #1f2f3d;
  // text-align: center;
  font-weight: 400;
}
.description {
  font-size: 14px;
  // padding: 20px 0;
  color: #5e6d82;
}
.btn {
  padding-top: 50px;
}
button {
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 500;
  outline: none;
  background: #fff;
  cursor: pointer;
  border: 1px solid #dcdfe6;
}
// Tree {

// }
</style>
