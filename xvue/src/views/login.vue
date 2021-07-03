<template>
    <div style="padding-top:10%;margin-left: 38%;margin-right: 42%">
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="uid">
          <el-input type="text" v-model="form.uid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input type="password" v-model="form.passwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

</template>

<script>
// @ is an alias to /src


// eslint-disable-next-line no-unused-vars
import Vue from "vue";




export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      form: {
        uid: '',
        passwd: '',
      },
      rules: {
        uid: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          let data = new FormData();
          data.append("uid",this.form.uid)
          data.append("passwd",this.form.passwd)
          this.axios({
            method:"post",
            /*url:'http://localhost:8001/text.json'*/
            url:'http://localhost:8080/login',
            data:data,
            withCredentials: true
          }).then(function (response) {
            console.log(response.data)
            if(response.data.code==1){
              /*var date = new Date(+new Date() - 1);
              document.cookie="userid="+response.data.user.uid+";expires="+date.toUTCString();
              document.cookie="username="+response.data.user.username+";expires="+date.toUTCString();*/
              alert(response.data.msg);
              that.$router.push({path:that.$route.query.redirect})
            }else {
              alert(response.data.msg);
            }
          })
        } else {
          return false;
        }
      });
    },
    back() {
      this.$router.push({path:'/user'})
    }
  }
}


</script>
