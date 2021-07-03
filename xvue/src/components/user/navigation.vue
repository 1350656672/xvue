<template>
  <div class="navigation" style=" position: sticky;top: 1%;z-index: 1;margin-left: 30px;text-align: left">
    <div class="ui large vertical menu" style="padding-left: 5px;margin-top: 10px">

      <div class="item">
        <div class="ui transparent icon input">
          <input type="text" placeholder="搜索文章..." v-model="searchKey">
          <router-link tag="span" :to="{name:'userSearch',query: { searchKey: searchKey }}">
            <i class="search icon" ></i>
          </router-link>


        </div>
      </div>

      <router-link tag="a" class="item active" :to="{name:'userRecommend'}">
        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
          推荐
        </font></font>
      </router-link>

      <router-link tag="a" class="item active" :to="{name:'userType'}">
        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
        分类
         </font></font>
      </router-link>

      <router-link tag="a" class="item active" :to="{name:'userTag'}">
        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
          标签
        </font></font>
      </router-link>

      <router-link tag="a" class="item active" :to="{name:'userMessageBoard'}">
        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
          留言板
        </font></font>
      </router-link>
      <a class="item ">
        <div class="ui small label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">待开发</font></font></div><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
        音乐
      </font></font></a>
      <a class="item ">
        <div class="ui small label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">待开发</font></font></div>
        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
        友情链接
      </font></font></a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    msg: String
  },
  data(){
    return{
      searchKey: ''
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了

  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
  },
  methods: {
   aaa:function(){
     alert("aa")
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
