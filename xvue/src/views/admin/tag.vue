<template>
  <div class="tag">
    <template>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                label="名称"
                width="180">
          <el-tag size="medium" slot-scope="scope">{{scope.row.name}}</el-tag>
        </el-table-column>
        <el-table-column
                prop="count"
                label="文章数量"
                width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="modifyTag(scope.row.id)">编辑</el-button>
            <el-popconfirm
                    title="确定删除该标签？"
                    @confirm="deleteTag(scope.row.id)"
            >
              <el-button slot="reference"
                         size="mini"
                         type="danger"
                        >删除</el-button>
            </el-popconfirm>
          </template>

        </el-table-column>
      </el-table>
      <el-row style="margin: 20px">
        <el-button type="success" round @click="addTag()">新增标签</el-button>
      </el-row>
    </template>

  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";




export default {
  name: 'tag',
  components: {

  },
  data() {
    return {
      tableData: []
    }
  },
  // 路由加载完后
  created () {
    this.getData()
  },
  mounted() {

  },

  methods:{
    getData(){
      let that = this
      this.axios({
          method:"get",
          url:'http://localhost:8080/tag',
        withCredentials: true
      }).then(function (response) {
          that.tableData=response.data
      })
    },
    modifyTag(id) {
      this.$prompt('新输入新名称','修改标签名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: "",
        inputErrorMessage: '名称不能为空'
      }).then(({ value }) => {
        let that = this
        let data = new FormData();
        data.append("_method","POST")
        data.append("id",id)
        data.append("name",value)
        this.axios({
          method:"POST",
          url:'http://localhost:8080/admin/tag',
          data:data,
          withCredentials: true
        }).then(function (response) {
          // this.$message({
          //   type: 'success',
          //   message: response.data
          // });
          alert(response.data)
          that.$router.go(0)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    deleteTag(id){
      let that = this
      let data = new FormData();
      data.append("_method","DELETE")
      data.append("id",id)
      this.axios({
        method:"post",
        url:'http://localhost:8080/admin/tag',
        data:data,
        withCredentials: true
      }).then(function (response) {
        alert(response.data)
        that.$router.go(0)
      })
    },
    addTag(){
      this.$prompt('请输入标签名', '新增标签', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: "",
        inputErrorMessage: '名称不能为空'
      }).then(({ value }) => {
        let that = this
        let data = new FormData();
        data.append("_method","PUT")
        data.append("name",value)
        this.axios({
          method:"POST",
          url:'http://localhost:8080/admin/tag',
          data:data,
          withCredentials: true
        }).then(function (response) {
          alert(response.data)
          that.$router.go(0)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },



}


</script>
