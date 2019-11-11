<template>
  <div class="box">
    <div class="title">{{data.studentName}}</div>
    <img src="../assets/cancel.png" alt="" class="img" v-if="imgShow">
    <div class="hang" style="margin-top:20px;">
      <span>学号</span>
      <span>{{data.studentName}}</span>
    </div>
    <div class="hang">
      <span>宿舍</span>
      <span>{{data.dormitoryName}}</span>
    </div>
    <div class="hang">
      <span>班级</span>
      <span>{{data.gradeName}}{{data.className}}</span>
    </div>
    <div class="hang">
      <span>细则分类</span>
      <span>{{data.ruleGroupName}}</span>
    </div>
    <div class="hang">
      <span>细则内容</span>
      <span>{{data.ruleName}}</span>
    </div>
    <div class="hang">
      <span>德育分</span>
      <span>{{data.score}}</span>
    </div>
    <div class="hang">
      <span>问题描述</span>
      <span>{{data.description}}</span>
    </div>
    <div class="hang">
      <span>处理时间</span>
      <span>{{data.processingTime}}</span>
    </div>

    <div class="revocation" @click="popupVisible = true" v-if="isShow">撤销</div>
    <div class="bottom" v-else>
        <mt-button class="btn">已撤销</mt-button>
    </div>

    <mt-popup position="bottom" v-model="popupVisible" class="repealStyle">
      <div class="repealBox">
        <div class="box_title">
          <span class="fl" style="color:#108EE9" @click="cancel">取消</span>
          <span>撤销</span>
          <span class="fr" style="color:#108EE9" @click="confirm">确认</span>
        </div>
        <div class="box_content">
          <textarea maxlength="36" rows="5" placeholder="输入撤销原因，最多36个字" v-model="value"></textarea>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { recordsone, recordsrevoke } from '@/api'

import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      isShow: true,
      popupVisible: false,
      value: '',
      imgShow: false,

      data: []
    }
  },
  methods: {
    // 获取详情
    list () {
      recordsone(this.$route.query.id)
        .then(res => {
          if (res.code === 200) {
            this.data = res.body
          } else {
            Toast(res.message)
          }
        })
    },
    // 确认
    confirm () {
      const obj = {
        recordid: this.$route.query.id,
        cancelReason: this.value
      }
      recordsrevoke(obj)
        .then(res => {
          if (res.code === 200) {
            this.popupVisible = false
            this.value = ''
            this.imgShow = true
            this.isShow = false
          } else {
            Toast(res.message)
          }
        })
    },
    // 取消
    cancel () {
      this.popupVisible = false
      this.value = ''
    }
  },
  mounted () {
    console.log(this.$route.query.id, '-------')
    this.list()
  }
}
</script>

<style lang="scss" scoped>
.box{
  position: relative;
  margin-left: 20px;
  padding-top: 20px;
  width: 355px;
  height: 647px;
  .title{
    font-size: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .img{
    width: 128px;
    height: 100px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .hang{
    display: flex;
    margin-bottom: 15px;
    span:nth-child(1){
      width: 83px;
      color: #888888;
    }
  }
  .revocation{
    width: 90%;
    color: #0C60AA;
    position: fixed;
    bottom: 50px;
    text-align: center;
  }
}
.repealStyle{
  // margin: -10px -10px 35px -10px;
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
  .repealBox{
    padding: 20px;
    .box_title{
      height: 25px;
      span:nth-child(2){
        width: 80%;
        float: left;
        text-align: center;
      }
    }
    .box_content{
      background: #F8F8F8;
      padding: 10px;
      border-radius: 10px;
      height: 120px;
      textarea{
        border: none;
        outline: none;
        width: 310px;
        height: 115px;
        background: #F8F8F8;
        font-size: 17px;
        font-family: '微软雅黑';
      }
    }
  }
}
.bottom{
    width: 100%;
    height: 47px;
    position:fixed;
    bottom: 0;
    left: 0;
    .btn{
        width: 100%;
        height: 100%;
        background: #ccc;
        color: rgba(0,0,0,.3);
        border-radius: 5px;
    }
}
</style>
