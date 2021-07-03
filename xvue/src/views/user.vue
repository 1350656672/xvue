<template>
  <div class="home " style="
  background-image: url('/星夜2.jpg') ;
  background-attachment:fixed;
  background-size: cover !important;">
<!--
头部
-->






      <div class="segment" style="background-image: url('/55.jpg') !important;background-size: cover;
        position:absolute; left:0px; top:0px;
        width: 100%; height:50%">
          <router-link to="/" class="ui huge teal button animate__animated animate__zoomIn"
                       style="z-index: 2;position: absolute;left: 0px;top:0px;margin: 20px;font-size: 100%">
              <i class="left arrow icon"></i>首页</router-link>
          <router-link to="/admin" class="ui huge teal button animate__animated animate__zoomIn"
                       style="z-index: 2;position: absolute;right: 0px;top:0px;margin: 20px;font-size: 100%">管理员
              <i class="right arrow icon"></i></router-link>
          <br>
          <div class="ui main text  inverted header " >
              <h1 class="ui header my-text animate__animated animate__zoomInUp" style="margin-top: 3%" >Xblog</h1>
              <p class="animate__animated animate__zoomIn">愿 你 血 液 里 时 刻 流 淌 着 灵 感 与 不 安 分</p>
          </div>

      </div>






<!--
中间内容
-->
      <div class="ui grid" style="margin-top: 13%">
          <div class="three wide column">
              <navigation></navigation>
          </div>

          <div class="ten wide column" style="
    margin-top: 20px;margin-bottom: 0px!important;
    "  >

              <div style="background-color: rgba(248, 248, 248, 0.9) !important;padding: 40px;border-radius:1%">

                  <transition
                          name="custom-classes-transition"
                          enter-active-class="animate__animated animate__fadeInDown"
                          leave-active-class="animate__animated animate__zoomOutUp"
                  >
                      <router-view></router-view>

                  </transition>

              </div>

          </div>

          <div class="three wide column">
              <card></card>
          </div>
      </div>

      <!--<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>-->
<!--
尾部
-->
    <footer style="margin-top: 0px!important;">
        <div class="ui inverted vertical footer segment" >
            <div class="ui center aligned container">
                <div class="ui stackable inverted divided grid">
                    <div class="three wide column">
                        <h4 class="ui inverted header">Group 1</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Link One</a>
                            <a href="#" class="item">Link Two</a>
                            <a href="#" class="item">Link Three</a>
                            <a href="#" class="item">Link Four</a>
                        </div>
                    </div>
                    <div class="three wide column">
                        <h4 class="ui inverted header">Group 2</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Link One</a>
                            <a href="#" class="item">Link Two</a>
                            <a href="#" class="item">Link Three</a>
                            <a href="#" class="item">Link Four</a>
                        </div>
                    </div>
                    <div class="three wide column">
                        <h4 class="ui inverted header">Group 3</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Link One</a>
                            <a href="#" class="item">Link Two</a>
                            <a href="#" class="item">Link Three</a>
                            <a href="#" class="item">Link Four</a>
                        </div>
                    </div>
                    <div class="seven wide column">
                        <h4 class="ui inverted header">Footer Header</h4>
                        <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                    </div>
                </div>
                <div class="ui inverted section divider"></div>
                <img src="assets/images/logo.png" class="ui centered mini image">
                <div class="ui horizontal inverted small divided link list">
                    <a class="item" href="#">Site Map</a>
                    <a class="item" href="#">Contact Us</a>
                    <a class="item" href="#">Terms and Conditions</a>
                    <a class="item" href="#">Privacy Policy</a>
                </div>
                <!--<p>{{recommandBlogs[0].content}}</p>-->
            </div>
        </div>
    </footer>
</div>
</template>

<script>
//import $ from 'jquery'
import navigation from "../components/user/navigation";
import card from "../components/user/card";



// @ is an alias to /src

// eslint-disable-next-line no-unused-vars


export default {
  name: 'user',
  components: {
      navigation,
      card
  },
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            recommandBlogs:'',
            searchKey:''
        };
    },
    //dom渲染后
    mounted: function () {
        this.$nextTick(function () {
            /*document.getElementById("aa").value="aaaaa";
            this.$refs.input1.value="aaa"
            $("#aa").val("aaaaaaaa")*/

            })


    },
    // 加入路由后,dom渲染前
  created () {
    //this.getData();
    // alert(this.$islogin())
    console.log("created的this:"+this)
    console.log("已进入home")
    //this.recommandBlogs=this.$route.
      console.log("开始获取数据")
      //this.getData()
      console.log("数据已获取")
    //console.log(this.recommandBlogs[0].content)
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

      search(){
        alert("搜索");
      },
      handleSelect(key, keyPath) {
          console.log(key, keyPath);
      },
      bt(){
        alert("按钮")
      }
}
}
/*$("#aa").val("a")*/
/*document.getElementById("aa").value="a"*/
</script>
<style>
    body {
        background-color: #FFFFFF;
    }
    .main.container {
        margin-top: 2em;
    }

    .main.menu {
        margin-top: 4em;
        border-radius: 0;
        border: none;
        box-shadow: none;
        transition:
                box-shadow 0.5s ease,
                padding 0.5s ease
    ;
    }
    .main.menu .item img.logo {
        margin-right: 1.5em;
    }

    .overlay {
        float: left;
        margin: 0em 3em 1em 0em;
    }
    .overlay .menu {
        position: relative;
        left: 0;
        transition: left 0.5s ease;
    }

    .main.menu.fixed {
        background-color: #FFFFFF;
        border: 1px solid #DDD;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    }
    .overlay.fixed .menu {
        left: 800px;
    }

    .text.container .left.floated.image {
        margin: 2em 2em 2em -4em;
    }
    .text.container .right.floated.image {
        margin: 2em -4em 2em 2em;
    }

    .ui.footer.segment {
        margin: 5em 0em 0em;
        padding: 5em 0em;
    }

    .landing-image {
        background-image: url('/星夜2.jpg') !important;
        background-size: cover !important;
    }
    .padding{
        margin-right: 20px;
        padding-left: 10px;
    }
    .opacity{
        background-color: rgba(248, 248, 248, 0) !important;
    }
    .my-text{
        color: #ffffff !important;
        font-size: 1cm !important;
        font-style: italic;
    }
    .navigate{
        background-color: rgba(248, 248, 248, 1) !important;
    }
</style>