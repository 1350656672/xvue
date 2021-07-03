<template>
  <div class="commentList">
    <el-table
            :data="data"
            style="width: 100%">
      <el-table-column
              label="创作日期"
              width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="文章标题"
              width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="评论数"
              width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.commentCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row.id)">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";




export default {
  name: 'commentList',
  components: {

  },
  data() {
    return {
      data:[],

    }
  },
  // 路由加载完后
  created () {
    this.getData();
  },
  mounted() {

  },

  methods:{
    getData(){
      var that = this
      this.axios({
        method:"get",
        /*url:'http://localhost:8001/text.json'*/
        url:'http://localhost:8080/blog/all',
        withCredentials: true

      }).then(function (response) {
        /*that.recommandBlogs=response.data;*/
        that.data=response.data;
        console.log(that.data)
      })
    },
    handleEdit(index, id) {
      console.log(index, id);
      this.$router.push({name:'commentDetail',query:{blogId:id,convert:false}})
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },

}


</script>
<style>

</style>
