<template>
  <div class="edit" >

    <el-form :model="blogForm" :rules="rules" ref="blogForm"
             label-width="auto" class="demo-ruleForm" label-position="left" >
      <div style="padding-right: 25%; padding-left: 10%">
        <el-form-item label="文章标题" prop="title" >
          <el-input v-model="blogForm.title" ></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="type" v-if="types!=''" >
          <el-select v-model="blogForm.type" placeholder="请选择文章分类" v-if="types!=''" >
            <el-option :value="item.id" :label="item.name"  v-for="(item) in types" :key="item.id"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="定时发布" prop="delivery">
          <el-switch v-model="blogForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="文章描述" prop="description" >
          <el-input type="textarea" v-model="blogForm.description"
                    :autosize="{ minRows:4,maxRows: 6 }" ></el-input>
        </el-form-item>

        <el-upload
                ref="upload"
                class="upload-demo"
                action="http://localhost:8080/firstPicture"
                :file-list="fileList"
                :auto-upload="false"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :on-exceed="exceed"
                :before-upload="beforeAvatarUpload"
                list-type="picture-card">
          <el-button size="small" type="primary">选择封面</el-button>

          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
        </el-upload><el-button size="small" type="success" style="margin: 1%" @click="upload">上传</el-button>
      </div>


        <div class="" id="md-content" >

          <textarea placeholder="博客内容" name="mdContent" id="md"></textarea>

          <!--<el-form-item label="文章内容" prop="content" style="margin-top: -7%">
            <el-input type="textarea"  ref="md" ></el-input>
          </el-form-item>-->

        </div>



      <el-form-item>
        <!--如果传入了文章id，则为更新文章,否则为插入-->
        <el-button type="primary" @click="updateArticleUncompletly('blogForm')" v-if="blogId!='undefined'">存草稿</el-button>
        <el-button type="primary" @click="insertArticleUncompletly('blogForm')" v-else>存草稿</el-button>
        <el-button type="primary" @click="updateArticle('blogForm')" v-if="blogId!='undefined'">重新发布</el-button>
        <el-button type="primary" @click="insertArticle('blogForm')" v-else>发布文章</el-button>
        <el-button @click="back()">返回</el-button>
        <el-button @click="resetForm('blogForm')">重置</el-button>
      </el-form-item>
    </el-form>



    <form action="/test" method="post">

    </form>
  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";




export default {
  name: 'edit',
  components: {

  },
  data() {
    return {
      types:[],
      blogId:undefined,
      convert:undefined,
      blogForm: {
        title: '',
        type: '',
        description: '',
        firstPicture:''
      },
      fileList: [/*{name: '22.jpg', url: '/22.jpg'}*/],

      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写文章描述', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ]
      }
    };
  },
  // 路由加载完后
  created () {
    this.blogId=this.$route.query.blogId+'';
    this.convert=this.$route.query.convert+'';
    console.log(this.blogId);
    this.getTypes()
    this.getData()
  },
  mounted() {
    //初始化Markdown编辑器
    // eslint-disable-next-line no-unused-vars
    var contentEditor;
    // eslint-disable-next-line no-undef
    contentEditor = editormd("md-content", {
      width   : "100%",
      height  : 640,
      syncScrolling : "single",
      path    : "/lib/editormd/lib/",
      emoji: true,
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL: "http://localhost:8080/contentPicture",

    });
  },

  methods:{
    getData(){
      if (this.blogId!='undefined'){
        let that = this
        this.axios({
          method:"get",
          url:'http://localhost:8080/blog',
          params:{
            id:that.blogId,
            convert:that.convert
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response)
          that.blogForm.title=response.data.title
          that.blogForm.type=response.data.typeId
          that.blogForm.description=response.data.description
          that.blogForm.firstPicture=response.data.firstPicture
          document.getElementById("md").value=response.data.content

        })
      }
    },
    getTypes(){
      var that = this
      this.axios({
        method:"get",
        url:'http://localhost:8080/type',
        withCredentials: true
      }).then(function (response) {
        console.log(response)
        that.types = response.data;
      })
      },
    insertArticle(formName) {
      //由于editor.md的渲染抹除了v-model的数据绑定，此处用dom取值，不使用vue
      let content = document.getElementById("md").value;
      this.$refs[formName].validate((valid) => {
        //文章内容元素不在element中，分开验证
        if (valid && content!='') {
          let that = this;
          let data = new FormData();
          //springboot的PUT请求
          data.append('_method',"PUT");
          data.append('title',that.blogForm.title);
          data.append('typeId',that.blogForm.type);
          data.append('description',that.blogForm.description);
          data.append('firstPicture',that.blogForm.firstPicture);
          data.append('content',content);
          data.append('complete',true);
          this.axios({
            method:"post",
            url:'http://localhost:8080/admin/blog',
            data:data,
            withCredentials: true
          }).then(function (response) {
            alert(response.data)
            console.log(response)
            that.$router.push({name:"adminArticles"})
          })
        } else {
            console.log('error submit!!');
            if (content==''){
              alert("文章内容不能空！")
        }
        return false;
        }
      });
    },
    insertArticleUncompletly(formName) {
      //由于editor.md的渲染抹除了v-model的数据绑定，此处用dom取值，不使用vue
      let content = document.getElementById("md").value;
      this.$refs[formName].validate((valid) => {
        //文章内容元素不在element中，分开验证
        if (valid && content!='') {
          let that = this;
          let data = new FormData();
          //springboot的PUT请求
          data.append('_method',"PUT");
          data.append('title',that.blogForm.title);
          data.append('typeId',that.blogForm.type);
          data.append('description',that.blogForm.description);
          data.append('firstPicture',that.blogForm.firstPicture);
          data.append('content',content);
          data.append('complete',false);
          this.axios({
            method:"post",
            url:'http://localhost:8080/admin/blog',
            data:data,
            withCredentials: true
          }).then(function (response) {
            alert(response.data)
            console.log(response)
            that.$router.push({name:"adminArticles"})
          })
        } else {
          console.log('error submit!!');
          if (content==''){
            alert("文章内容不能空！")
          }
          return false;
        }
      });
    },
    updateArticle(formName) {
      //由于editor.md的渲染抹除了v-model的数据绑定，此处用dom取值，不使用vue
      let content = document.getElementById("md").value;
      this.$refs[formName].validate((valid) => {
        //文章内容元素不在element中，分开验证
        if (valid && content!='') {
          let that = this;
          let data = new FormData();
          //springboot的PUT请求
          data.append('_method',"POST");
          data.append('id',that.blogId);
          data.append('title',that.blogForm.title);
          data.append('typeId',that.blogForm.type);
          data.append('description',that.blogForm.description);
          data.append('firstPicture',that.blogForm.firstPicture);
          data.append('content',content);
          data.append('complete',true);
          this.axios({
            method:"post",
            url:'http://localhost:8080/admin/blog',
            data:data,
            withCredentials: true
          }).then(function (response) {
            alert(response.data)
            console.log(response)
            that.$router.push({name:"adminArticles"})
          })
        } else {
          console.log('error submit!!');
          if (content==''){
            alert("文章内容不能空！")
          }
          return false;
        }
      });
    },
    updateArticleUncompletly(formName) {
      //由于editor.md的渲染抹除了v-model的数据绑定，此处用dom取值，不使用vue
      var content = document.getElementById("md").value;
      this.$refs[formName].validate((valid) => {
        //文章内容元素不在element中，分开验证
        if (valid && content!='') {
          let that = this;
          let data = new FormData();
          //springboot的PUT请求
          data.append('_method',"POST");
          data.append('id',that.blogId);
          data.append('title',that.blogForm.title);
          data.append('typeId',that.blogForm.type);
          data.append('description',that.blogForm.description);
          data.append('firstPicture',that.blogForm.firstPicture);
          data.append('content',content);
          data.append('complete',false);
          this.axios({
            method:"post",
            url:'http://localhost:8080/admin/blog',
            data:data,
            withCredentials: true
          }).then(function (response) {
            alert(response.data)
            console.log(response)
            that.$router.push({name:"adminArticles"})
          })
        } else {
          console.log('error submit!!');
          if (content==''){
            alert("文章内容不能空！")
          }
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back(){
      this.$router.back()
    },
    exceed(files,fileList){
      /*this.$set(fileList[0], 'raw', files[0]);
      this.$set(fileList[0], 'name', files[0].name);*/
      fileList[0]=files[0]
      this.$refs['upload'].clearFiles();//清除文件
      this.$refs['upload'].handleStart(files[0]);//选择文件后的赋值方法
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    upload(){
      this.$refs['upload'].submit();
    },
    // eslint-disable-next-line no-unused-vars
    handleAvatarSuccess(response, file, fileList) {
      if (response.success==1){
        console.log(response)
        //this.$set(fileList[0], 'url', response.url);
        this.blogForm.firstPicture=response.url
        console.log(this.blogForm.firstPicture)

      }
    },

    }



}


</script>
