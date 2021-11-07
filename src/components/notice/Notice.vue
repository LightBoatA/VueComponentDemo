<template>
  <div v-if="isShow" class="notice_box">
    <div class="notice_group">
      <h2 class="notice_title">{{title}}</h2>
      <div class="notice_content">{{message}}</div>
      <div class="notice_close" @click="close">×</div>
    </div>
</div>

</template>

<script>
export default {
  data () {
    return {
      title: '默认标题',
      message: '默认消息',
      duration: 4500, // 默认延迟4500毫秒自动关闭
      isShow: false
    }
  },
  methods: {
    close () {
      this.isShow = false
    }
  },
  mounted () { // 最早此时操作dom
    this.isShow = true
    // 绑定定时器事件 duration==0 不自动消失
    if (this.duration) {
      setTimeout(() => {
        this.isShow = false
      }, this.duration)
    }
  }
}
</script>

<style lang="less" scoped>
  .notice_box {
    // display: flex;
    position: fixed;
    top:15px;
    right: 15px;
    width: 330px;
    padding: 14px 26px 14px 13px;
    // height: 75px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0, 0, .1);
  }
  .notice_title {
    color: #303133;
    margin:0;
    font-size: 16px;
  }
  .notice_content {
    font-size: 14px;
    line-height: 21px;
    margin: 6px 0 0;
    color: #606266;
    text-align: justify;
  }
  .notice_close {
    position:absolute;
    top: 14px;
    right: 15px;
    cursor: pointer;
    color:#909399;
    font-size: 18px;
  }
</style>
