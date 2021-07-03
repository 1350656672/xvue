<template>
  <div class="classify">

    <div v-if="types!=''" >

      <div class="ui compact menu" style="margin-left: 2%" v-for="(item) in types" :key="item.id">
        <a class="ui item" style="font-size: large" @click="getBlogsByType(item)" >
           {{item.name}}
          <div class="floating ui red label">{{item.count}}</div>
        </a>
      </div>

    </div>


    <div v-if="type!=''" class="ui horizontal divider"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
      "{{type.name}}" 类型的文章共 {{type.count}} 篇
    </font></font></div>

    <div v-if="blogs!=''">
      <blog-list :blogs="blogs"></blog-list>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import blogList from "../../components/user/blogList";



export default {
  name: 'classify',
  components: {
    blogList
  },
  data() {
    return {
      types:'',
      blogs:'',
      //当前类型
      type:''
    };
  },

  /*computed:{
    blogs: {
      get: function () {
        return this.blog
      },
      set: function (blog) {
        this.blog=blog
      }
    }
  },*/
  // 路由加载完后
  created () {
    this.getTypes();
  },

  methods:{
    getTypes(){
      var that = this
      this.axios({
        method:"get",
        url:'http://localhost:8080/type',
        withCredentials: true
      }).then(function (response) {
        console.log(response)
        that.types=response.data;

        //获取类型后，为文章列表获取默认类型
        //从缓存中获取刷新前的文章类型，从字符串转为json
        let defaultType = JSON.parse(window.sessionStorage.getItem("type"))
        //若缓存中没有，则默认是第一个类型
        if (!defaultType){
          defaultType=that.types[0]
        }
        that.type=defaultType
        console.log(that.type.id)
        //每次获取特定类型的文章列表，都把该类型缓存,json转为string
        window.sessionStorage.setItem("type",JSON.stringify(that.type));
        let data = new FormData();
        data.append('id',that.type.id);
        that.axios({
          method:"post",
          url:'http://localhost:8080/getBlogsByType',
          data:data,
          withCredentials: true
        }).then(function (response) {
          that.blogs=response.data;
          console.log(that.blogs)
        })
      })
    },

    getBlogsByType(type){
      this.type=type
      //每次获取特定类型的文章列表，都把该类型缓存,json转为字符串
      window.sessionStorage.setItem("type",JSON.stringify(this.type));


      var that = this;
      let data = new FormData();
      data.append('id',type.id);
      this.axios({
        method:"post",
        url:'http://localhost:8080/getBlogsByType',
        data:data,
        withCredentials: true
      }).then(function (response) {
        that.blogs=response.data;
        console.log(that.blogs)


      })
    },


    }
}

</script>
