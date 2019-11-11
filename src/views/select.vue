<template>
    <div class="content">
        <div v-if="isShow">
            <div class="hang" v-for="item in list" :key="item.index" @click="btn(item)">
                <div class="fl">{{item.name}}</div>
                <div class="ts fr">></div>
            </div>
        </div>
        <Selections v-else :name="name"></Selections>
    </div>
</template>

<script>
import Selections from '@/components/selections'
export default {
  data () {
    return {
      list: [{name: '按宿舍查询'}, {name: '按班级查询'}],
      isShow: true,
      name: ''
    }
  },
  methods: {
    // 点击切换显示并传值给子组件
    btn (item) {
      this.name = item.name
      this.isShow = false
    }
  },
  components: {
    Selections
  }
}
</script>

<style lang="scss" scoped>
.content{
    background: #f8f8f8;
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
</style>
