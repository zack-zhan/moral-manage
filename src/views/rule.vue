<template>
  <div class="box">
    <div class="left_box">
      <div v-for="item in rulegroupsAllList" :key="item.index">
        <div class="left_hang" :class="{fffColor:selectedGroupId === item.id}" @click="selectBtn1(item)">{{item.name}}</div>
      </div>
    </div>

    <div class="right_box">
      <div v-for="(item,index) in rulesAllList" :key="index" style="padding-left:15px;" :class="selectedRuleId === item.ruleId?'selected':''">
        <div class="right_hang" @click="selectBtn2(item)">
          <span class="fl">{{item.ruleName}}</span>
          <span class="fr" style="font-size:12px;color:#888888">{{item.score}}分</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <mt-button type="default" :class="selectRules !== undefined?'btnColor':''" @click="affirm">确认</mt-button>
    </div>
  </div>
</template>

<script>
import { groupsall, allbygroupid } from '@/api'

import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      selectedGroupId: undefined, // 左侧选中id
      selectedRuleId: undefined, // 右侧选中id

      rulegroupsAllList: [], // 德育细则分类数组
      rulesAllList: [], // 德育细则数组

      selectRules: undefined, // 选中的细则

      list: '',
      id: ''
    }
  },
  methods: {
    // 获取分组列表
    groupList () {
      groupsall()
        .then(res => {
          if (res.code === 200) {
            this.rulegroupsAllList = res.body
            this.selectedGroupId = res.body[0].id
            this.rulesList(this.selectedGroupId)
          } else {
            Toast(res.message)
          }
        })
    },
    // 根据分组id获取细则列表
    rulesList (id) {
      allbygroupid(id)
        .then(res => {
          if (res.code === 200) {
            this.rulesAllList = res.body
          } else {
            Toast(res.message)
            this.rulesAllList = []
          }
        })
    },
    // 左侧点击事件
    selectBtn1 (item) {
      this.selectedGroupId = item.id
      this.rulesList(item.id)
    },
    // 右侧点击事件
    selectBtn2 (item) {
      console.log(item, '00')
      this.selectedRuleId = item.ruleId
      this.selectRules = item
    },

    // 确认
    affirm () {
      if (this.selectRules) {
        this.$store.commit('setRuleMutation', this.selectRules)
        this.$router.push('/record')
      }
    }
  },
  mounted () {
    this.selectedRuleId = this.$store.state.selectRuleList.ruleId
    this.groupList()
  }
}
</script>

<style lang="scss" scoped>
.left_box{
  float: left;
  width: 30vw;
  margin-bottom: 60px;
  .left_hang{
    height: 45px;
    line-height: 45px;
    padding-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #F7F7F7;
  }
  .fffColor{
    background: #fff;
  }
}
.right_box{
  float: right;
  width: 60vw;
  .right_hang{
    height: 44px;
    line-height: 45px;
    padding-right: 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }
  .selected {
    color:rgba(74,144,226,1);
    background: #F7F7F7;
  }
}
.btnColor{
  background: #4F77AA !important;
}
.bottom{
  width: 100%;
  height: 60px;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
}
</style>

<style scoped>
.box >>> .mint-button--normal{
  width: 90px;
  height: 47px;
  color: #fff;
  background: #ccc;
  position: fixed;
  bottom: 7px;
  right: 14px;
}
</style>
