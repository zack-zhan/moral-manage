<template>
  <div class="box">
    <div class="nav">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">按细则录入</mt-tab-item>
            <mt-tab-item id="2">自定义录入</mt-tab-item>
        </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <Regulation></Regulation>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
            <Custom></Custom>
        </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Regulation from '@/components/regulation' // 细则录入内容组件
import Custom from '@/components/custom' // 自定义录入内容组件
export default {
  data () {
    return {
      selected: '1' // 默认显示id为1的内容
    }
  },
  components: {
    Regulation,
    Custom
  },
  mounted () {
    console.log(this.$route.query.id)
    if (this.$route.query.id === '1') {
      this.selected = '1'
    } else if (this.$route.query.id === '2') {
      this.selected = '2'
    } else {
      this.selected = '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  height: 100%;
  background: #f8f8f8;
}
.nav{
    height: 44px;
}
.bottom{
    width: 351px;
    height: 47px;
    position:fixed;
    bottom:10px;
    padding-left: 12px;
    .btn{
        width: 100%;
        height: 100%;
        background: #ccc;
        color:#fff;
    }
}
.btnColor{
  background: #4F77AA !important;
}
</style>

<style scoped>
.nav >>> .mint-tab-item-label{
  font-size: 15px;
}
.nav >>> .mint-navbar{
  height: 100%;
}
.nav >>> .is-selected{
  border-bottom: 2px solid #108EE9;
}
.nav >>> .mint-navbar .mint-tab-item.is-selected{
  color:#4A90E2;
}
</style>
