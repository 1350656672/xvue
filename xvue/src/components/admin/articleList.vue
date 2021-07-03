<template>
  <div class="articleList">

    <el-table
            :data="tableData"
            border
            style="width: 80%">
      <el-table-column
              fixed
              prop="title"
              label="标题"
              width="150">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="创作日期"
              width="120">
      </el-table-column>
      <el-table-column
              prop="description"
              label="描述"
              width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.description}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.description}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
              prop="userId"
              label="作者"
              width="120">
      </el-table-column>
      <el-table-column
              prop="views"
              label="浏览量"
              width="120">
      </el-table-column>
      <el-table-column
              prop="updateTime"
              label="更新时间"
              width="120">
      </el-table-column>


      <!--如果是回收站，则操作不同-->
      <el-table-column v-if="!trash"
              fixed="right"
              label="操作"
              width="100">

        <template slot-scope="scope" >
          <el-button @click="editBlog(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="trashBlog(scope.row.id)" type="text" size="small">删除</el-button>
        </template>

      </el-table-column>


      <el-table-column v-if="trash"
              fixed="right"
              label="操作"
              width="120">

        <template slot-scope="scope" >
          <el-button @click="restoreBlog(scope.row.id)" type="text" size="small">还原</el-button>
          <el-button @click="deleteBlog(scope.row.id)" type="text" size="small">彻底删除</el-button>
        </template>

      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'articleList',
  props: {
    msg: String,
    tableData: Array,
    trash:Boolean
  },
  data() {
    return {

    }
  },
  created () {

      console.log(this.tableData)

  },


  methods: {
    editBlog(blogId) {
      this.$router.push({name:'adminEdit',query:{blogId:blogId,convert:false}})
    },
    trashBlog(blogId){
      let that = this
      let data = new FormData();
      data.append('id',blogId);
      this.axios({
        method:"post",
        url:'http://localhost:8080/admin/trashBlog',
        data:data,
        withCredentials: true
      }).then(function (response) {
        alert(response.data)
        that.$router.go(0)
      })
    },
    restoreBlog(blogId){
      let that = this
      let data = new FormData();
      data.append('id',blogId);
      this.axios({
        method:"post",
        url:'http://localhost:8080/admin/restoreBlog',
        data:data,
        withCredentials: true
      }).then(function (response) {
        alert(response.data)
        that.$router.go(0)
      })
    },
    deleteBlog(blogId){
      let that = this
      let data = new FormData();
      data.append('id',blogId);
      data.append('_method','DELETE');
      this.axios({
        method:"post",
        url:'http://localhost:8080/admin/blog',
        data:data,
        withCredentials: true
      }).then(function (response) {
        alert(response.data)
        that.$router.go(0)
      })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
