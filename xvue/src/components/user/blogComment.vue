<template>
  <div class="comment" style=" ">

    <div id="commentDiv" class="ui threaded comments" style="margin:30px ;text-align:left;font-size: 15px;padding-bottom: 20px">
      <h3 class="ui dividing header">评论区：</h3>
<!--评论功能-->
      <div class="ui comments" style="width: 100%;z-index: 1">
        <div class="comment">
          <a class="avatar">
            <img src="/admin.png">
          </a>
          <div class="content">
            <a class="author">游客</a>

            <div class="text">
              发布友善的评论：
            </div>
            <form class="ui reply form" action="/comment/add" method="post" @submit.prevent="Commentsubmit" >
              <div class="inline field">
                <input id="commentNickname" @blur="isUserInput()" name="nickname" v-model="form.nickname" type="text" placeholder="用户名">
                <div v-show="!userInput"
                     class="ui left pointing red basic label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  请输入用户名！
                </font></font></div>
              </div>
              <div class="field" >
                <textarea v-model="form.content" @blur="isContentInput()" id="commentText" name="content" :placeholder="isRely?('@'+relyNickname):'评论内容'"></textarea>
                <div v-show="!contentInput"
                     class="ui left pointing red basic label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  请输入评论内容！
                </font></font></div>
              </div>

              <span class="ui primary submit labeled icon button" @click="Commentsubmit">
                <i class="icon edit" ></i> 评论
              </span>
              <a class="ui label" v-show="isRely" :title=" '回复'+'@'+relyNickname " style="color: #0d71bb">
                 {{isRely?('@'+relyNickname):''}}
                <i class="icon close" @click="cancelRely" title="取消回复，评论文章"></i>
              </a>

            </form>
          </div>
        </div>
      </div>

<!--评论内容-->
      <div v-if="comment!=''">
        <div  v-for="(item,index) in comment" :key="item.id" >

          <a class="ui blue ribbon label" style="font-size: 80%">#{{index+1}}楼</a>
          <div class="comment" >

            <a class="avatar">
              <img :src="item.avatar!='-1'?item.avatar:'/admin.png'">
            </a>
            <div class="content">
              <a class="author">{{item.nickname}}:</a>
              <div class="metadata">
                <span class="date">{{item.createTime}}</span>
              </div>
              <div class="text">
                <p>{{item.content}}</p>
              </div>
              <div class="actions">
                <a class="reply" @click="reply(item.id,item.nickname)">回复</a>
              </div>
            </div>

            <div class="comments" v-for="(innerItem) in item.relyComments" :key="innerItem.id">
              <div class="comment">
                <a class="avatar" >
                  <img :src="innerItem.avatar!='-1'?innerItem.avatar:'/admin.png'">
                </a>
                <div class="content">
                  <a class="author">{{innerItem.nickname}} :</a>
                  <div class="metadata">
                    <span class="date">{{item.createTime}}</span>
                  </div>
                  <div class="text">
                    <!-- 如果是二级评论，则不加@，如果是多级评论，则加@xx，注：后端数据中二级评论没有parentNickname-->
                    <i v-if="innerItem.parentNickname!=null" style="color: #00c4ff">@{{innerItem.parentNickname}}</i>
                    {{innerItem.content}}
                  </div>
                  <div class="actions">
                    <a class="reply" @click="reply(innerItem.id,innerItem.nickname)" >回复</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
export default {
  name: 'blogComment',
  props: {
    blogId: String
  },
  data(){
    return {
      comment:"",
      form:{
        content:"",
        blogId:"",
        nickname:"",
        parentCommentId:""
      },
      relyNickname:"",
      //区别评论与回复
      isRely:false,
      //输入提示标签
      userInput:true,
      contentInput:true
    }
  },
  mounted() {
    //把文章id放到评论表单
    this.form.blogId=this.blogId
  },
  created () {
    // 组件创建完后获取数据
    this.getCommentById(this.blogId)


  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
  },
  methods: {
//异步请求获取博客评论
    getCommentById(id){
      let data = new FormData();
      data.append('blogId',id);
      var that = this
      this.axios({
        method:"post",
        /*url:'http://localhost:8001/text.json'*/
        url:'http://localhost:8080/comment',
        data:data,
        withCredentials: true

      }).then(function (response) {
        /*that.recommandBlogs=response.data;*/
        that.comment=response.data;
        console.log(that.comment)
      })
    },
    isUserInput:function(){
      if(this.form.nickname==""){
        this.userInput=false;
      }else{
        this.userInput=true;
      }
    },
    isContentInput:function(){
      if(this.form.content==""){
        this.contentInput=false;
      }else{
        this.contentInput=true;
      }
    },
    Commentsubmit:function () {
      if (this.form.content!=""&&this.form.nickname!=""){
        var that = this;
        let formData = new FormData();
        formData.append('blogId', this.blogId);
        formData.append('nickname', this.form.nickname);
        formData.append('parentCommentId', this.form.parentCommentId);
        formData.append('content', this.form.content);
        //alert(formData)
        this.axios({
          method:"post",
          url:'http://localhost:8080/comment/add',
          data:formData,
          withCredentials: true

        }).then(function (response) {
          /*that.recommandBlogs=response.data;*/
          //评论后返回更新后的评论数据
          that.comment=response.data;
          console.log(that.comment)
          //回复后清空输入
          that.form.content=""
          //每次回复/评论完取消回复状态，变回评论状态
          that.cancelRely();
          document.getElementById("commentDiv").scrollIntoView();
        })
      }else {
        alert("请完善评论信息！")
      }
    },
    reply:function (commentId,nickname) {
      this.isRely=true;
      this.relyNickname=nickname;
      this.form.parentCommentId=commentId;
      document.getElementById("commentDiv").scrollIntoView();
    },
    cancelRely:function () {
      this.isRely=false;
      this.relyNickname='';
      this.form.parentCommentId=''
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
