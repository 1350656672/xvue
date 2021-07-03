<template>
  <div class="home">
    <div class="blog" v-if="recommandBlogs!=''" >
          <blogList :blogs="recommandBlogs"></blogList>
    </div>


      <div class="ui borderless pagination menu" style="margin: 20px">
          <a class="item" @click="getData((pagination.pageNum)-1,5)">
              <i class="left arrow icon" ></i> 上一页  </a>
          <div v-for="(item,index) in pagination.navigatepageNums" :key="index">
              <a class="item" @click="getData(item,5)">{{item}}</a>
          </div>

          <a class="item" @click="getData((pagination.pageNum)+1,5)">
              下一页 <i class="icon right arrow"></i>
          </a></div>
  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import blogList from "../../components/user/blogList";


export default {
  name: 'user',
  components: {
    blogList,

  },
    data() {
        return {
            pagination:'',
            recommandBlogs:''
        };
    },
  // 路由加载完后
  created () {
    this.getData(1,5)
  },

  methods:{
      //异步请求
      getData(pageNum,pageSize){
          if (this.pagination==''||(pageNum!=this.pagination.pageNum && pageNum>0 && pageNum<=this.pagination.pages)){
              console.log("getData");
              var that = this;
              let data = new FormData();
              data.append("pageNum",pageNum)
              data.append("pageSize",pageSize)
              this.axios({
                  method:"post",
                  /*url:'http://localhost:8001/text.json'*/
                  url:'http://localhost:8080/getRecommandBlogs',
                  data:data,
                  withCredentials: true
              }).then(function (response) {
                  console.log(response.data)
                  /*that.recommandBlogs=response.data;*/
                  that.recommandBlogs=response.data.blogs;
                  that.pagination=response.data.pageInfo;
                  console.log(that.recommandBlogs)
                  console.log(that.pagination)
              })
          }

      },
      //同步请求
      getData2(){
          var xmlhttp;
          xmlhttp=new XMLHttpRequest();
          var that = this;
          xmlhttp.onreadystatechange=function()
          {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
              {
                  //转为json对象
                  that.recommandBlogs=JSON.parse(xmlhttp.responseText);
                  console.log(that.recommandBlogs)
              }
          }
          xmlhttp.open("POST","http://localhost:8080/getRecommandBlogs",false);
          xmlhttp.send();
      }

  }
}
</script>
<style>
    [v-cloak] {
        display: none;
    }
</style>