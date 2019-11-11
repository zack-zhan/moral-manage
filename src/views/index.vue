<template>
  <div class="box">
    <div class="btn">
      <router-link to="/record">
        <mt-button type="primary">记录德育事件</mt-button>
      </router-link>
      <router-link to="/inquire">
        <mt-button type="primary">德育查询</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {getGeneratelink, getToken} from '@/api'

import { Toast } from 'mint-ui'
export default {
  created () {
    const a = {'access_token': '6d658f3e-4234-4a7d-b063-c41789fea9cf', 'user_info': {'corpId': '0f531581c86e43be89768307d4c5e1cd'}}
    const json = JSON.stringify(a)
    localStorage.setItem('token', json)

    const token = localStorage.getItem('token')
    const code = this.$route.query.code
    if (!token && !code) {
      this.getGeneratelink()
    }
    if (!token && code) {
      this.getAccessToken()
    }
  },
  updated () {
    const token = localStorage.getItem('token')
    const code = this.$route.query.code
    if (!token && !code) {
      this.getGeneratelink()
    }
    if (!token && code) {
      this.getAccessToken()
    }
  },
  methods: {
    getGeneratelink () {
      const data = {
        redirecturl: window.location.host + window.location.pathname,
        parameters: Math.random() // window.location.search.slice(1)
      }
      getGeneratelink(data)
        .then(res => {
          if (res.code === 200) {
            if (res.body) {
              window.location.href = res.body
            }
          } else {
            Toast(res.message)
          }
        })
    },
    getToken () {
      const data = {
        clientId: '3e3b9e2937414cebae93481256a34802',
        code: this.$route.query.code
      }
      console.log(data)
      getToken(data)
        .then(res => {
          if (res.code === 200) {
            if (res.accesstoken) {
              localStorage.setItem('_jwt', res.body)
              if (localStorage.getItem('redirect_url')) {
                location.href = localStorage.getItem('redirect_url')
                localStorage.removeItem('redirect_url')
                return
              }
              this.$router.push({path: '/', query: {t: new Date().getTime()}})
              return
            }
            this.$vux.alert.show({
              content: res.err_msg
            })
          } else {
            Toast(res.message)
          }
        })
    }
  },
  mounted () {
    this.$store.commit('clearRuleMutation')
    this.$store.commit('clearCustomRecord')
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100vw;
  height: 75vh;
  background: url('../assets/bg.jpg') 50% no-repeat;
  background-size: contain;
  .btn{
    position: absolute;
    bottom: 0;
    left: 50%; margin-left: -(240px/2);
    margin-bottom: 6.25vw;
  }
}
</style>
<style scoped>
.btn >>> .mint-button--normal{
  display: block;
  width: 240px;
  height: 47px;
  background: #0C60AA;
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
