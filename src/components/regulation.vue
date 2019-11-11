<template>
  <div>
    <div class="add">
        <div style="color:#000;font-size:17px;">被记录人</div>
        <div class="box" v-for="(item,index) in list" :key="index">
              <router-link :to="{path:'/select',query:{id:'1'}}">
                <img :src="item.icon" alt="" style="width:35px;height:35px;">
                <div style="color:#555;font-size:14px;padding-top:10px;">{{item.name}}</div>
              </router-link>
        </div>
        <div class="box" v-for="(item,index) in $store.state.selectRecordList" :key="index + 100">
          <img :src="item.icon" alt="" style="width:35px;height:35px;">
          <div style="color:#555;font-size:14px;padding-top:10px;">{{item.name}}</div>
        </div>
      </div>
        <div class="select" :class="!isShow?'mt_100':''" @click="selectRule">
          <div class="fl">选择德育细则</div>
          <div class="select_r fr">{{value}}&nbsp;></div>
        </div>
        <div class="follow mt_100" v-show="isShow">
          <div>{{this.$store.state.selectRuleList.ruleName}}</div>
          <div>{{this.$store.state.selectRuleList.score}}分</div>
        </div>

        <div class="bottom" @click="confirm">
            <mt-button class="btn" :class="{btnColor:allValue}">记录</mt-button>
        </div>
  </div>
</template>

<script>
import { recordsCreate } from '@/api'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      list: [{icon: require('../assets/plus.svg'), name: '添加'}], // 默认数组

      value: '请选择',
      isShow: false
    }
  },
  computed: {
    // 判断是否全部有值
    allValue () {
      return this.$store.state.selectRecordList.length > 0 && this.$store.state.selectRuleList.groupName
    }
  },
  methods: {
    selectRule () {
      this.$router.push('/rule')
    },
    confirm () {
      if (this.$store.state.selectRecordList.length > 0 && this.$store.state.selectRuleList.groupName) {
        let studentId = []
        this.$store.state.selectRecordList.map(item => {
          studentId.push(item.id)
        })
        const obj = {
          studentId: studentId.toString(),
          ruleGroupId: this.$store.state.selectRuleList.groupId,
          ruleId: this.$store.state.selectRuleList.ruleId
        }
        recordsCreate(obj)
          .then(res => {
            if (res.code === 200) {
              Toast('记录成功')
            } else {
              Toast(res.message)
            }
          })
      }
    }
  },
  mounted () {
    if (this.$store.state.selectRuleList.groupName) {
      this.isShow = true
      this.value = this.$store.state.selectRuleList.groupName
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
    background: #ffff;
    .select_r{
        color: #888888;
    }
}
.mt_100{
  margin-bottom:100px;
}
.follow{
  height: 85px;
  padding-left: 15px;
  background: #ffff;
  div{
    line-height: 40px;
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
