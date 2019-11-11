<template>
  <div class="box">
    <div class="all">
      <div class="one" @click="openPicker">
        <div class="fl" style="font-size:18px;">{{list.studentName}}</div>
        <div class="fr" style="font-size:16px;color: #888;">{{selectDate}}&nbsp;<span class="icon iconfont icon-xiajiantou"  style="font-size:20px;"></span></div>
      </div>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue"
        @confirm="confirm">
      </mt-datetime-picker>

      <div class="two">
        <div class="two_1">
          <span class="fl">学号：{{list.studentCode}}</span>
          <span class="fr">入学年份：{{list.enrollmentYear}}</span>
        </div>
        <div class="two_2">
          <span class="fl">班级：{{list.gradeClassName}}</span>
          <span class="fr">宿舍：{{list.dormitoryName}}</span>
        </div>
      </div>
    </div>

    <div class="hang_box">
      <div class="hang">
        <span>德育总分</span>
        <span style="padding-right:20px;">{{list.totalScore}}分</span>
      </div>

      <div class="hang" @click="recordShow = !recordShow">
        <span>德育记录</span>
        <span>
          {{recordTotal}}次&nbsp;<span class="icon iconfont icon-xiajiantou"></span>
        </span>
      </div>
      <div class="hang" v-show="recordShow" v-for="(item,index) in list.recordList" :key="index" @click="jumpTo(item.recorsId)">
        <span class="ts" style="font-size:14px;">{{item.createTime}} {{item.description}}</span>
        <span style="padding-right:35px;">{{item.score}}</span>
      </div>

      <div class="hang" @click="awardShow = !awardShow">
        <span>奖励</span>
        <span>
          {{awardTotal}}次&nbsp;<span class="icon iconfont icon-xiajiantou"></span>
        </span>
      </div>
      <div class="hang" v-show="awardShow" v-for="(item,index) in list.rewardCountList" :key="index + 100" @click="jumpTo(item.recorsId)">
        <span class="ts" style="font-size:14px;">{{item.createTime}} {{item.description}}</span>
        <span style="padding-right:35px;">{{item.score}}</span>
      </div>

      <div class="hang" @click="disciplineShow = !disciplineShow">
        <span>违纪</span>
        <span>
          {{disciplineTotal}}次&nbsp;<span class="icon iconfont icon-xiajiantou"></span>
        </span>
      </div>
      <div class="hang" v-show="disciplineShow" v-for="(item,index) in list.violationCountList" :key="index + 1000" @click="jumpTo(item.recorsId)">
        <span class="ts" style="font-size:14px;">{{item.createTime}} {{item.description}}</span>
        <span style="padding-right:35px;">{{item.score}}</span>
      </div>
    </div>

    <div style="background:#fff;">
      <router-link to="/record">
        <div class="add_record">
          <span>添加记录</span>
          <span class="fr ts icon iconfont icon-youjiantou" style="font-size:22px"></span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getSummaryRecordByStudentId } from '@/api'

import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      popupVisible: false, // 默认隐藏弹出框
      pickerValue: '',
      selectDate: '请选择',

      recordShow: false,
      recordTotal: '',
      awardShow: false,
      awardTotal: '',
      disciplineShow: false,
      disciplineTotal: '',

      list: [],
      y: '',
      m: ''
    }
  },
  methods: {
    getList () {
      const obj = {
        id: this.$route.query.id,
        y: this.y,
        m: this.m
      }
      getSummaryRecordByStudentId(obj)
        .then(res => {
          if (res.code === 200) {
            this.list = res.body
            this.recordTotal = res.body.recordList.length
            this.awardTotal = res.body.rewardCountList.length
            this.disciplineTotal = res.body.violationCountList.length
          } else {
            Toast(res.message)
          }
        })
    },

    openPicker () {
      this.$refs.picker.open()
      this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
    },
    // 日期转字符串方法
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      return y + '年' + m + '月'
    },
    confirm () {
      console.log(this.pickerValue, '-----------')
      if (this.pickerValue) {
        this.y = this.pickerValue.getFullYear()
        this.m = this.pickerValue.getMonth()
        this.selectDate = this.formatDate(this.pickerValue)
      }
    },

    // 点击跳转并带参数
    jumpTo (id) {
      this.$router.push({name: 'Revocation', query: {id: id}})
    }
  },
  mounted () {
    // 接收路由跳转带过来的参数
    console.log(this.$route.query.id)
    this.getList()
  },
  watch: {
    selectDate (val) {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  background: #f8f8f8;
}
.all{
  margin-top: 15px;
  background: #fff;
  .one{
    height: 44px;
    line-height: 44px;
    margin-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #eee;
  }
  .two{
    height: 54px;
    margin-left: 15px;
    margin-top: 10px;
    color: #888888;
    border-bottom: 1px solid #eee;
    .two_1{
      height: 20px;
      margin-bottom: 5px;
      display: flex;
      span{
        flex: 1;
      }
    }
    .two_2{
      display: flex;
      span{
        flex: 1;
      }
    }
  }
}
.hang_box{
  background: #fff;
  .hang{
    height: 45px;
    line-height: 45px;
    margin-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #eee;
    background: #fff;
    span:nth-child(1){
      float: left;
      font-size: 18px;
    }
    span:nth-child(2){
      float: right;
      font-size: 14px;
      color: #888888;
      span{
        float: right;
        font-size: 20px;
      }
    }
    .ts{
      width: 70vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.add_record{
  margin-top: 15px;
  height: 45px;
  line-height: 45px;
  margin-left: 15px;
  padding-right: 15px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fff;
}
</style>

<style scoped>
.all >>> .mint-datetime-cancel{
  width: calc(50% - 20px);
  text-align: left;
  padding-left: 20px;
}
.all >>> .mint-datetime-confirm{
  width: calc(50% - 20px);
  text-align: right;
  padding-right: 20px;
}
</style>
