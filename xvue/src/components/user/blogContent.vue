<template>
  <div class="blogContent" >
    <h2 class="ui center aligned icon header" style="font-size: 20px">
      <img class="ui medium circular image" style="margin: 10px" :src="content.firstPicture" ><br>
      {{content.title}}
    </h2>
    <div class="ui piled segment" style="font-size: 20px">
    <!--  <h4 class="ui header">A header</h4>-->
      <div v-html="content.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogContent',
  props: {
    blogId: String,
    convert:String
  },
  data() {
    return {
      content: String
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getContentById(this.blogId)
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
  },
  methods: {
//异步请求获取博客内容
    getContentById(id){
      console.log("getData");
      var that = this
      this.axios({
        method:"get",
        url:'http://localhost:8080/blog',
        withCredentials: true,
        params:{
          id:id,
          convert:that.convert
        }
      }).then(function (response) {
        that.content=response.data;
        console.log(that.content.content)
      })
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
