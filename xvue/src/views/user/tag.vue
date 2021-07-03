<template>
  <div class="home">

    <div class="ui middle labels"  style="position:relative">
      <span >
        <a v-for="(item,index) in tags" :key="item.id"
           class="ui label large" :class="{'massive':isHuge[index]}"  @click='getBlogsByTags(index)'
           style="color: #0d71bb;" >
          {{item.name}}}
        </a>
      </span>


      <span  class="ui horizontal divider"
             style="float: top"
      ><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
        同时具有所选标签的文章如下：
      </font></font></span>
    </div>




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
  name: 'user',
  components: {
    blogList
  },
  data(){
    return {
      //获取的标签
      tags:'',
      //把标签id取出来存到这
      tagIds:[],
      //vue无法探测到数组中属性的变更
      isHuge : [false,false,false,false],
      //由标签获取的文章
      blogs:''
    }
  },
  // 路由加载完后
  created () {
    this.getTags()
  },

  methods:{
    getBlogsByTags(index){
      //响应式设置数组元素
      Vue.set(this.isHuge, index, !this.isHuge[index])
      var check=[];
      for (let i=0;i<this.tagIds.length;i++){
        if (this.isHuge[i]){
          check.push(this.tagIds[i])
        }
      }
      console.log(check)
      var formData = new FormData;
      formData.append("tags",check)
      formData.append("_method","POST")
      var that = this
      this.axios({
        method:"post",
        url:'http://localhost:8080/getBlogsByTags',
        data:formData,
        withCredentials: true
      }).then(function (response) {
        console.log(response.data)
        that.blogs=response.data
      })
    },
    getTags(){
      var that = this;
      this.axios({
        method:"get",
        url:'http://localhost:8080/tag',
        withCredentials: true
      }).then(function (response) {
        for (let i=0;i<response.data.length;i++){
          that.tagIds[i]=response.data[i].id
        }
        that.tags=response.data;
        console.log(that.tags)
        console.log(that.tagIds)
      })
    },

  }
}
</script>
