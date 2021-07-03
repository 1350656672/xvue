<template>
  <div class="recommend">

    <div class="ui divided items" >

      <div class="item" style="text-align:left;height: 150px;"
           v-for="(item) in blogs" :key="item.id" >
            <!--v-if完全不编译，而v-show会编译不显示-->


              <img class="ui medium rounded image" :src="item.firstPicture" style="width: 150px;height: 100%">
              <!--<img :src="item.firstPicture">-->
              <div class="content">
                <router-link tag="a" class="header" :to="{name:'userBlog',query:{blogId:item.id,convert:true}}" >{{item.title}}</router-link>
                <div class="meta">
                  <span>{{item.description}}</span>
                </div>
                <div class="description">
                  <p></p>
                </div>
                <div class="extra" style="margin-top: 8%">
                  <span>{{item.createTime}}</span>
                  <span style="margin-left: 20%">评论数量：{{item.commentCount}}</span>
                </div>




        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    blogs: Array
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

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
