<template>
  <div class="box">
    <router-link to="/search">
      <div class="searchBox">
        <i class="mint-toast-icon mintui mintui-search searchIcon"></i>
        <input type="text" class="search" placeholder="搜索">
      </div>
    </router-link>
    <div class="title">
      <span style="color:#4A90E2;" @click="backFirst">{{corpName}}</span>
      <span v-for="(item,index) in navArr" :key="index" @click="back(index)">
          <span :class="index < navArr.length - 1 ? 'isColor':''">
            <span style="color:#ccc;font-size:18px;"> > </span>
            {{item.name}}
            </span>
      </span>
    </div>
    <div class="content" v-if="show">
      <div class="hang" v-for="(item,index) in list" :key="index" @click="select(item)">
          <div class="fl">{{item.name}}</div>
          <div class="ts fr">></div>
      </div>
    </div>
    <div class="content" v-if="!show">
      <div class="hang" v-for="(item,index) in data" :key="index" @click="btn(item)">
          <div class="fl">{{item.name}}</div>
          <div class="ts fr">></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDormitoryStudentList, getGradeStudentList} from '@/api'

import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      corpName: '广州天河中学',
      show: true,
      list: [{name: '按宿舍查询'}, {name: '按班级查询'}],

      navArr: [], // 导航数组
      data: [],
      originData: []
    }
  },
  methods: {
    // 选择那种方式查询
    select (item) {
      this.show = false
      if (item.name === '按宿舍查询') {
        getDormitoryStudentList()
          .then(res => {
            if (res.code === 200) {
              this.data = res.body
              this.originData = res.body
              this.navArr.push(item)
            } else {
              Toast(res.message)
            }
          })
      } else {
        getGradeStudentList()
          .then(res => {
            if (res.code === 200) {
              res.body.map(item => {
                item.name = item.gradeName
              })
              this.data = res.body
              this.originData = res.body
              this.navArr.push(item)
            } else {
              Toast(res.message)
            }
          })
      }
    },
    // 每一项的点击事件
    btn (item) {
      console.log(item, '---')
      if (item.childList && item.childList.length > 0) {
        this.data = item.childList
        this.navArr.push(item)
      }
      if (item.isLast === 2) {
        this.$router.push({path: '/statistics', query: {id: item.id}})
      }

      if (item.classDtoList) {
        item.classDtoList.map(x => {
          x.name = x.className
        })
        this.data = item.classDtoList
        this.navArr.push(item)
      }
      if (item.studentList) {
        item.studentList.map(x => {
          x.name = x.studentName
        })
        this.data = item.studentList
        this.navArr.push(item)
      }

      if (item.studentId) {
        this.$router.push({path: '/statistics', query: {id: item.studentId}})
      }
      if (item.isStudent === 1) {
        this.$router.push({path: '/statistics', query: {id: item.id}})
      }
    },
    // 回退到上一步
    back (index) {
      if (index === this.navArr.length - 1 && index !== 0) return
      const item = this.navArr[index]
      this.navArr.splice(index + 1, this.navArr.length - index - 1)
      console.log(item, '--')
      if (item.childList) {
        this.data = item.childList
      }
      if (item.classDtoList) {
        this.data = item.classDtoList
      }
      if (item.name === '按宿舍查询' || item.name === '按班级查询') {
        this.data = this.originData
      }
    },
    // 回退到第一步
    backFirst () {
      this.show = true
      this.navArr = []
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  background: #f8f8f8;
}
.searchBox{
  height: 44px;
  text-align: center;
  background: #fff;
  position: relative;
  .search{
    width: 359px;
    height: 26px;
    border: none;
    background: #f8f8f8;
    margin: 8px 0;
    font-size: 15px;
    outline: none;
  }
}
input::-webkit-input-placeholder {
  text-align: center;
}
.searchIcon{
  position: absolute;
  top: 16px;
  left: 40vw;
  font-size: 14px;
}
.title{
  overflow: auto;
  white-space: nowrap;
  height: 50px;
  background: #f8f8f8;
  font-size: 15px;
  line-height: 45px;
  padding-left: 14px;
  padding-right: 14px;
}
.hang{
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
    padding-right: 15px;
    background: #fff;
}
.ts{
    font-size: 20px;
    color: #C7C7CC;
}
.isColor{
  color:#4A90E2;
}
</style>
