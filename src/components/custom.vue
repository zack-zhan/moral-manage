<template>
  <div>
      <div class="add">
        <div class="mtb-10" style="color:#000;font-size:17px;">被记录人</div>
        <div class="box" v-for="(item,index) in list" :key="index">
          <router-link :to="{path:'/select',query:{id:'2'}}">
            <img :src="item.icon" alt="" style="width:35px;height:35px;">
            <div style="color:#555;font-size:14px;padding-top:10px;">{{item.name}}</div>
          </router-link>
        </div>
        <div class="box" v-for="(item,index) in $store.state.customRecordList" :key="index + 100">
          <img :src="item.icon" alt="" style="width:35px;height:35px;">
          <div style="color:#555;font-size:14px;padding-top:10px;">{{item.name}}</div>
        </div>
      </div>

        <div class="custom">
          <textarea maxlength="200" rows="2" placeholder="自定义新的事件" style="height: 54px;" v-model="value"></textarea>
          <span class="number"><span>{{textLength}}</span>/200</span>
        </div>
        <div class="select mt_100" @click="popupVisible = true">
            <div class="select_l fl">选择分值</div>
            <div class="select_r fr">{{pickerValue}}分&nbsp;></div>
        </div>

        <!-- 弹出框部分 -->
        <mt-popup position="bottom" v-model="popupVisible" class="picker_style">
          <div class="pickerTitle">
            <span class="fl" style="padding-left: 14px;color:#108EE9" @click="popupVisible = false">取消</span>
            <span>选择德育分</span>
            <span class="fr" style="padding-right: 14px;color:#108EE9" @click="confirm">确认</span>
          </div>
            <mt-picker :slots="slots" defaultIndex:13 @change="onValuesChange"></mt-picker>
        </mt-popup>

        <div class="bottom" @click="confirmBtn">
            <mt-button class="btn" :class="{btnColor:allValue}">记录</mt-button>
        </div>
  </div>
</template>

<script>
import { customCreate } from '@/api'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      list: [{icon: require('../assets/plus.svg'), name: '添加'}], // 默认数组

      value: '', // 文本框

      pickerValue: '0', // 默认显示0分
      slots: [{defaultIndex: 12, values: ['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10', '-11', '-12']}],

      popupVisible: false, // 默认隐藏弹出框
      pickerValue_confirm: '' // 选择的分值
    }
  },
  computed: {
    allValue () {
      return this.$store.state.customRecordList.length > 0 && this.value && this.pickerValue !== '0'
    },
    textLength () {
      return this.value.length
    }
  },
  methods: {
    // picker的change事件
    onValuesChange (picker, values) {
      this.pickerValue_confirm = values[0]
    },
    // 点击确认，关闭弹出框并赋值
    confirm () {
      this.pickerValue = this.pickerValue_confirm
      this.popupVisible = false
    },

    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      let second = date.getSeconds()
      second = minute < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    confirmBtn () {
      if (this.$store.state.customRecordList.length > 0 && this.value && this.pickerValue !== '0') {
        let studentId = []
        this.$store.state.customRecordList.map(item => {
          studentId.push(item.id)
        })
        const date = new Date()
        const obj = {
          studentId: studentId.toString(),
          description: this.value,
          score: this.pickerValue,
          occurTime: this.formatDate(date)
        }
        customCreate(obj)
          .then(res => {
            if (res.code === 200) {
              Toast('记录成功')
            } else {
              Toast(res.message)
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add{
    margin: 20px 0;
    padding: 10px 12px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #ffff;
    overflow: hidden;
    .box{
      margin: 20px 10px;
      width: 45px;
      height: 60px;
      text-align: center;
      float: left;
    }
}
.select{
    height: 45px;
    line-height: 45px;
    padding-left: 15px;
    padding-right: 15px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 17px;
    background: #fff;
    margin-top: 20px;
    .select_r{
        color: #888888;
    }
}
.mt_100{
  margin-bottom:100px;
}
.custom{
    width: 100%;
    height: 66px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-top: 20px;
    background: #fff;
    position: relative;
    textarea {
        width: 346px;
        border: none;
        outline: none;
        font-size: 17px;
        color: #000;
        padding-left: 15px;
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        overflow: visible;
        display: block;
        resize: none;
        word-break: break-all;
        word-wrap: break-word;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color:    #BBB;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
        color:    #BBB;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color:    #BBB;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color:    #BBB;
    }
    .number{
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 12px;
        color: #BBB;
    }
}
.picker_style{
    width: 100%;
    height: 280px;
    .pickerTitle{
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
    }
}
.btnColor{
  background: #4F77AA !important;
}
.bottom{
    width: 90%;
    height: 47px;
    position:fixed;
    bottom:10px;
    left: 5%;
    .btn{
        width: 100%;
        height: 100%;
        background: #ccc;
        color:#fff;
    }
}
</style>
