<template>
  <div class="article" >
    <el-tabs type="border-card">
      <!--确保获取到值再加载组件，即使传值前数据未获取，数据获取后会同步进去，第一次传空时仍会报错-->
      <!--不用v-show，因为v-show仍然会加载组件并传值，只是不显示-->
      <el-tab-pane label="已完成" >
        <article-list :table-data="completedList" v-if="completedList!=''" :trash="false"></article-list>
      </el-tab-pane>

      <el-tab-pane label="草稿箱" >
        <article-list :table-data="uncompletedList" v-if="uncompletedList!=''" :trash="false"></article-list>
      </el-tab-pane>

      <el-tab-pane label="按分类" >

        <div v-if="types!=''" style="margin: 2%">
          <div class="ui compact menu" style="margin-left: 2%" v-for="(item) in types" :key="item.id">
            <a class="ui item" style="font-size: medium" @click="getBlogsByType(item)" >
              {{item.name}}
              <div class="floating ui red label">{{item.count}}</div>
            </a>
          </div>
        </div>

        <div v-if="type!=''" class="ui horizontal divider"><font style="vertical-align: inherit;margin: 2px"><font style="vertical-align: inherit;">
          "{{type.name}}" 类型的文章共 {{type.count}} 篇
        </font></font></div>

        <article-list :table-data="blogByTypeList" v-if="blogByTypeList!=''" :trash="false"></article-list>

      </el-tab-pane>

      <el-tab-pane label="按标签">

        <div class="ui middle labels"  style="position:relative" v-if="tags!=''" :trash="false">
          <span >
            <a v-for="(item,index) in tags" :key="item.id"
               class="ui label large" :class="{'huge':isHuge[index]}"  @click='getBlogsByTags(index)'
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

        <article-list :table-data="blogByTagsList" v-if="blogByTagsList!=''" :trash="false"></article-list>

      </el-tab-pane>

      <el-tab-pane label="回收站">

        <article-list :table-data="trashList" v-if="trashList!=''" :trash="true"></article-list>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import articleList from "../../components/admin/articleList";




export default {
  name: 'articles',
  components: {
    articleList
  },
  data() {
    return {
      types:'',
      type:'',
      blogByTypeList:'',

      completedList:'',

      uncompletedList:'',

      //获取的标签
      tags:'',
      //把标签id取出来存到这
      tagIds:[],
      //vue无法探测到数组中属性的变更
      isHuge : [false,false,false,false],
      //由标签获取的文章
      blogByTagsList:'',

      //回收站
      trashList:''
    }
  },
  // 路由加载完后
  created () {
    this.getCompletedList()
    this.getUncompletedList()
    this.getTypes()
    this.getTags()
    this.getTrash()
  },
  mounted() {

  },

  methods:{
    getCompletedList(){
      var that=this
      this.axios({
        method:"get",
        url:'http://localhost:8080/getCompletedBlogs',
        withCredentials: true
      }).then(function (response) {
        that.completedList=response.data
        console.log(that.completedList)
      })
    },
    getUncompletedList(){
      var that=this
      this.axios({
        method:"get",
        url:'http://localhost:8080/admin/getUncompletedBlogs',
        withCredentials: true
      }).then(function (response) {
        that.uncompletedList=response.data
        console.log(that.uncompletedList)
      })
    },

    getTypes(){
      var that = this
      this.axios({
        method:"get",
        url:'http://localhost:8080/type',
        withCredentials: true
      }).then(function (response) {
        console.log(response)
        that.types=response.data;

      })
    },
    getBlogsByType(type){
      this.type=type
      //每次获取特定类型的文章列表，都把该类型缓存,json转为字符串
      var that = this;
      let data = new FormData();
      data.append('id',type.id);
      this.axios({
        method:"post",
        url:'http://localhost:8080/getBlogsByType',
        data:data,
        withCredentials: true
      }).then(function (response) {
        that.blogByTypeList=response.data;
        console.log(that.blogs)


      })
    },

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
        that.blogByTagsList=response.data
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
    getTrash(){
      var that = this;
      let data = new FormData();
      this.axios({
        method:"get",
        url:'http://localhost:8080/admin/getTrashBlogs',
        data:data,
        withCredentials: true
      }).then(function (response) {
        that.trashList=response.data;

      })
    }
  },

}


</script>
