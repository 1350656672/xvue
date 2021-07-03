<template>
  <div class="custom-tree-container">

    <div class="block">
      <p>-- 留言删除后不可恢复，请谨慎操作 --</p>
      <el-tree
              :data="message"
              :props="props"
              show-checkbox
              node-key="id"
              default-expand-all
              :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
  </div>
</template>


<script>


  export default {
    data() {
      return {
        blogId:'',
        props:{
          label:"content",
          children:"relyComments",
        },
        message:[]
      }
    },
    created() {
      this.getMessage()
    },
    methods: {

//异步请求获取博客评论
      getMessage(){
        var that = this
        this.axios({
          method:"get",
          /*url:'http://localhost:8001/text.json'*/
          url:'http://localhost:8080/message',
          withCredentials: true

        }).then(function (response) {
          /*that.recommandBlogs=response.data;*/
          that.message=response.data;
          console.log(that.message)
        })
      },
      remove(node, data) {
        console.log(data)
        //移除节点
        /*const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);*/
        //删除数据
        let formData = new FormData();
        formData.append('_method',"DELETE");
        formData.append('id',data.id);
        var that = this;
        this.axios({
          method:"post",
          /*url:'http://localhost:8001/text.json'*/
          url:'http://localhost:8080/admin/message',
          data:formData,
          withCredentials: true
        }).then(function (response) {
          /*that.recommandBlogs=response.data;*/
          that.message=response.data;
          console.log(that.message)
        })
      },


    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>