<template>
  <div class="blog" v-if="blogId!=''">

      <blogContent :blogId="blogId" :convert="convert"></blogContent>
      <blog-comment :blogId="blogId"></blog-comment>


  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import blogContent from "../../components/user/blogContent";
import blogComment from "../../components/user/blogComment";



export default {
  name: 'blog',
  components: {
      blogContent,
      blogComment
  },
    data(){
      return {
          //统一为string类型
          blogId:String,
          convert:String
      }
    },
  // 路由加载完后
  created () {
      //  +''转为string类型
      this.blogId=this.$route.query.blogId+'';
      this.convert=this.$route.query.convert+'';
      console.log("博客id:"+this.blogId)


  },
    mounted() {

    },

    methods:{



  }
}
</script>
