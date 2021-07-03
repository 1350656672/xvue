<template>
  <div class="home">
      <router-link to="/user" class="ui huge teal button animate__animated animate__zoomIn"
                   style="z-index: 2;position: absolute;left: 0px;top:0px;margin: 20px;font-size: 100%">
          <i class="left arrow icon"></i>Xblog</router-link>

      <router-link to="/" class="ui huge teal button animate__animated animate__zoomIn"
                   style="z-index: 2;position: absolute;right: 0px;top:0px;margin: 20px;font-size: 100%">首页
          <i class="right arrow icon"></i></router-link>

      <div class="ui grid" style="margin: 2%;margin-top: 5%">
          <div class="three wide column">
              <div class="ui inverted vertical pointing menu">
                  <router-link :to="{name:'adminEdit'}" tag="a" class="item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      写文章
                  </font></font></router-link>
                  <router-link :to="{name:'adminArticles'}" tag="a" class="item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      文章管理
                  </font></font></router-link>
                  <router-link :to="{name:'adminType'}" tag="a" class=" item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      分类管理
                  </font></font></router-link>
                  <router-link :to="{name:'adminTag'}" tag="a" class=" item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      标签管理
                  </font></font></router-link>
                  <router-link :to="{name:'commentList'}" tag="a" class=" item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      评论管理
                  </font></font></router-link>
                  <router-link :to="{name:'adminMessage'}" tag="a" class=" item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      留言管理
                  </font></font></router-link>
      <!--待开发-->
                  <router-link  tag="a" class=" item"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                      友情链接
                  </font></font></router-link>
                  <a class=" item" @click="logout()">
                      注 销
                  </a>
              </div>

          </div>

          <div class="thirteen wide column">
                <router-view></router-view>
          </div>

      </div>

  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";



export default {
  name: 'user',
  components: {

  },
  // 路由加载完后
  created () {
    //this.getData();
    // alert(this.$islogin())
    console.log("created的this:"+this)
    console.log("已进入home")
  },
  //进入路由前
  /*beforeRouteEnter (to, from, next) {
    console.log("准备进入home");
    // alert(Vue.prototype.$islogin())
    console.log("beforeRouteEnter的this:"+this)
    next(vm => vm.getData())
  },*/
  // 路由更新前（A路由到A路由，或A到A的子路由）
  beforeRouteUpdate (to, from, next) {
    console.log("home更新")
    console.log("beforeRouteUpdate的this:"+this)
    next()
  },
  //离开路由前
  beforeRouteLeave (to, from, next) {
    console.log("home更新")

    //this.getData()
    console.log("beforeRouteLeave的this:"+this)
    next()
  },
  methods:{
    logout(){
        let that = this;
        this.axios({
            method:"post",
            /*url:'http://localhost:8001/text.json'*/
            url:'http://localhost:8080/logout',
            withCredentials: true
        }).then(function (response) {
            alert(response.data);
            that.$router.go(0)
        })
    }

    }

}
</script>
