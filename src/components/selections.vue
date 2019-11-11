<template>
  <div class="box">
        <div class="content">
            <div class="checkTitle">
              <span @click="backFirst" class="isColor">{{corpName}}</span>
              <span v-for="(item,index) in navArr" :key="index" @click="back(index)">
                  <span :class="index < navArr.length - 1 ? 'isColor':''">
                    <span style="color:#ccc;font-size:18px;"> > </span>
                    {{item.name}}
                    </span>
              </span>
            </div>
            <div class="checkbox" v-for="(item,index) in data" :key="index">
              <div class="left_box" @click="selectBtn(item)">
                <span class="yuan" v-if="!item.checked && !item.indeterminate"></span>
                <span class="selectY select_gray" v-if="item.indeterminate"></span>
                <span class="selectY select_blue" v-if="item.checked"></span>
                <span class="select_icon">✓</span>
              </div>
              <div class="right_box" @click="btn(item)">
                <img :src="defaultImg" alt="" v-if="!item.isStudent">
                <img :src="item.icon" alt="" v-else>
                <span>{{item.name}}</span>
              </div>
            </div>
        </div>
        <div class="bottom">
            <mt-button type='primary' :class="array.length>0?'bg':''" @click="getResult">确认</mt-button>
        </div>
  </div>
</template>

<script>
import { getDormitoryStudentList, getGradeStudentList } from '@/api'

import { Toast } from 'mint-ui'
export default {
  props: ['name'],
  data () {
    return {
      defaultImg: require('../assets/folder.png'), // 默认图片
      corpName: '广州天河中学', // 公司名称

      navArr: [], // 导航数组
      data: [],
      originData: [{
        id: '',
        name: '',
        level: 0,
        isStudent: 0,
        parentId: '',
        checked: false,
        indeterminate: false,
        children: []
      }],

      array: []
    }
  },
  methods: {
    // 获取数据
    List () {
      if (this.name === '按宿舍查询') {
        getDormitoryStudentList()
          .then(res => {
            if (res.code === 200) {
              this.originData = res.body.map(x => this.getOriginData(x))
              this.data = [
                ...this.originData
              ]
              console.log(this.data)
            } else {
              Toast(res.message)
            }
          })
      } else {
        getGradeStudentList()
          .then(res => {
            if (res.code === 200) {
              const data = res.body.map(x => {
                const grade = {
                  id: x.gradeId,
                  name: x.gradeName,
                  level: 0,
                  isStudent: 0,
                  parentId: '0',
                  checked: false,
                  indeterminate: false,
                  children: []
                }
                if (x.classDtoList && x.classDtoList.length > 0) {
                  grade.children = x.classDtoList.map(y => {
                    const clazz = {
                      id: y.classId,
                      name: y.className,
                      level: 1,
                      isStudent: 0,
                      parentId: x.gradeId,
                      checked: false,
                      indeterminate: false,
                      children: []
                    }
                    if (y.studentList && y.studentList.length > 0) {
                      clazz.children = y.studentList.map(z => {
                        return {
                          id: z.studentId,
                          name: z.studentName,
                          level: 2,
                          isStudent: 1,
                          parentId: y.classId,
                          checked: false,
                          indeterminate: false,
                          children: [],
                          icon: z.icon
                        }
                      })
                    }
                    return clazz
                  })
                }
                return grade
              })
              this.originData = data
              this.data = [
                ...data
              ]
              console.log(data)
            } else {
              Toast(res.message)
            }
          })
      }
    },
    getOriginData (parent) {
      const item = {
        id: parent.id,
        name: parent.name,
        level: parent.level,
        isStudent: parent.isStudent === null ? 0 : parent.isStudent,
        parentId: parent.parentId,
        checked: false,
        indeterminate: false,
        icon: parent.icon
      }
      if (parent.childList && parent.childList.length > 0) {
        item.children = parent.childList.map(x => {
          return this.getOriginData(x)
        })
      }
      return item
    },
    // 点击复选框右边的事件
    btn (item) {
      if (item.isStudent === 0 && item.children && item.children.length > 0) {
        this.data = item.children
        this.navArr.push(item)
      }
    },
    // 复选框点击事件
    selectBtn (item) {
      if (item.indeterminate) {
        item.indeterminate = false
      } else if (item.checked) {
        item.checked = false
      } else {
        item.checked = true
      }
      if (item.level !== 0) {
        const parent = this.findParent(item, this.originData)
        this.handleUpRescur(parent)
      }
      if (item.isStudent !== 1) {
        this.handleDownRescur(item, item.checked)
      }

      this.array = []
      this.data.map(x => this.getChildren(x, this.array))
      console.log(this.array)
    },
    // 向上查找方法
    handleUpRescur (parent) {
      console.log(parent.children.filter(x => x.checked || x.indeterminate), 'list')
      if (parent.children.filter(x => x.checked).length === parent.children.length) {
        parent.checked = true
        parent.indeterminate = false
      } else if (parent.children.filter(x => x.checked || x.indeterminate).length === 0) {
        parent.checked = false
        parent.indeterminate = false
      } else {
        parent.checked = false
        parent.indeterminate = true
      }
      if (parent.level !== 0) {
        const item = this.findParent(parent, this.originData)
        this.handleUpRescur(item)
      }
    },
    findParent (item, list) {
      let parent = null
      if (list.findIndex(x => x.id === item.parentId) > -1) {
        return list.find(x => x.id === item.parentId)
      }
      list.map(x => {
        if (x.children && x.children.length > 0) {
          const temp = this.findParent(item, x.children)
          if (temp) {
            parent = temp
          }
        }
      })
      return parent
    },
    // 向下查找方法
    handleDownRescur (item, checked) {
      item.checked = checked
      if (item.isStudent === 0 && item.children && item.children.length > 0) {
        item.children.map(x => this.handleDownRescur(x, checked))
      }
    },
    // 回退到第一步
    backFirst () {
      this.data = this.originData
      this.navArr = []
    },
    // 回退到上一步
    back (index) {
      if (index === this.navArr.length - 1 && index !== 0) return
      const item = this.navArr[index]
      this.navArr.splice(index + 1, this.navArr.length - index - 1)
      if (item.children) {
        this.data = item.children
      }
      if (item.classDtoList) {
        this.data = item.classDtoList
      }
    },

    getResult () {
      // this.array = []
      // this.data.map(x => this.getChildren(x, this.array))
      // console.log(this.array)

      this.array.map(item => {
        if (item.icon === null) {
          item.icon = require('../assets/folder.png')
        }
      })
      if (this.$route.query.id === '1') {
        this.$store.commit('setRecordMutation', this.array)
        this.$router.push({path: '/record', query: {id: '1'}})
      } else {
        this.$store.commit('setCustomRecord', this.array)
        this.$router.push({path: '/record', query: {id: '2'}})
      }
    },
    getChildren (parent, array) {
      if (parent.isStudent === 1 && parent.checked) {
        array.push(parent)
        return
      }
      if (parent.children && parent.children.length > 0) {
        parent.children.map(x => this.getChildren(x, array))
      }
    }
  },
  mounted () {
    this.List()
    if (this.$route.query.id === '1') {
      this.$store.commit('clearRecordMutation')
    } else {
      this.$store.commit('clearCustomRecord')
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  background: #f8f8f8;
}
.checkTitle{
    overflow: auto;
    white-space: nowrap;
    height: 49px;
    line-height: 49px;
    background:#F8F8F8;
    font-size: 16px;
    padding-left: 14px;
}
.checkbox{
  height: 55px;
  line-height: 55px;
  float: left;
  background: #fff;
  .left_box{
    float: left;
    position: relative;
    padding-right: 13px;
    .yuan{
      width: 20px;
      height: 20px;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 100%;
      margin: 17px 0 0 14px;
    }
    .selectY{
      width: 22px;
      height: 22px;
      display: inline-block;
      border-radius: 100%;
      margin: 17px 0 0 14px;
    }
    .select_blue{
      background: #4A90E2;
    }
    .select_gray{
      background: #ccc;
    }
    .select_icon{
      position: absolute;
      top: 0px;
      left: 18px;
      color: #fff;
    }
  }
  .right_box{
    width: 80vw;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eee;
    float: right;
    img{
      width: 35px;height: 35px;
      display: inline-block;
      vertical-align: middle;
    }
    span{
      height: 54px;
      line-height: 54px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.bottom{
    position:fixed;
    bottom:0;
    right: 0;
    height: 74px;
    line-height: 74px;
    width: 100%;
    border-top: 1px solid #ccc;
    background: #fff;
}
.bg{
  background: #4F77AA !important;
}
.isColor{
  color:#4A90E2;
}
</style>
<style scoped>
.bottom >>> .mint-button{
    position:fixed;
    bottom:13.5px;
    right: 20px;
    width: 90px;
    height: 47px;
    /* background: rgba(79,119,170,1); */
    background: #ccc;
}
.bottom >>> .mint-button.is-disabled {
  background: rgba(204,204,204,1);
}
.bottom >>> .mint-button-text {
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
}
</style>
