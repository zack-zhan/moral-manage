<template>
  <div class="box">
    <div class="searchBox">
        <i class="mint-toast-icon mintui mintui-search searchIcon"></i>
        <input type="text" class="search" placeholder="学生名字/学号" autofocus="autofocus" v-model="value" @change="search">
        <a href="javascript:history.back()" style="color:#108EE9;">取消</a>
      </div>

    <div class="default" v-show="isDefault">
      <div>可以在这里搜索到</div>
      <img src="../assets/tipsIcon.png" alt="">
      <div>学生个人信息</div>
    </div>

    <div class="main" v-show="isShow">
      <div class="jieguo">查询结果：共{{total}}条</div>
      <div class="content" v-for="item in searchList" :key="item.index" @click="jumpBtn(item)">
        <div class="one">{{item.studentName}}</div>
        <div class="two">
          <span>学号：{{item.studentCode}}</span>
          <span>入学年份：{{item.schoolDate}}</span>
        </div>
        <div class="three">
          <span>班级：{{item.gradeClass}}</span>
          <span>宿舍：{{item.dormitory}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getStudentListByNameOrCode} from '@/api'

import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      value: '',
      isDefault: true, // 默认显示未搜索的样式
      isShow: false, // 显示搜索的样式
      total: '', // 总条数

      searchList: []
    }
  },
  methods: {
    // 搜索获取数据
    search () {
      getStudentListByNameOrCode(this.value)
        .then(res => {
          if (res.code === 200) {
            this.searchList = res.body
            this.isDefault = false
            this.isShow = true
            this.total = this.searchList.length
          } else {
            Toast(res.message)
          }
        })
    },
    // 点击跳转页面，并带参数
    jumpBtn (item) {
      // this.$router.push({name: 'Statistics', params: item})
      this.$router.push({path: '/statistics', query: {id: item.studentId}})
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBox{
  height: 44px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #eee;
  padding-left: 8px;
  .search{
    padding-left: 28px;
    width: 80%;
    height: 26px;
    border: none;
    background: #f8f8f8;
    margin: 8px 0;
    font-size: 15px;
    outline: none;
  }
}
.searchIcon{
  position: absolute;
  top: 16px;
  left: 5px;
  font-size: 14px;
}
.default{
  width: 114px;
  margin: 100px auto 0;
  font-size: 13px;
  color:#BABABA;
  text-align: center;
  img{
    display: block;
    width: 40px;
    height: 32px;
    margin: 30px auto 10px;
  }
}
.jieguo{
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color:#888888;
  padding-left: 12px;
  background: #FAFAFA;
}
.content{
  height: 22vw;
  padding-left: 12px;
  border-bottom: 1px solid #eee;
  .one{
    font-size: 18px;
    margin: 15px 0;
  }
  .two,.three{
    font-size: 14px;
    color: #888888;
    margin-bottom: 10px;
    span{
      width: 45vw;
      display: inline-block;
    }
  }

}
</style>

<style scoped>
.box >>> .mint-search{
  height: 44px;
}
.box >>> .mint-searchbar-inner{
  padding: 0;
}
.box >>> .mintui-search{
  padding-left: 10px;
  padding-right: 5px;
}
</style>
