import Vue from 'vue'
import VueRouter from 'vue-router'

import user from "../views/user";
import admin from "../views/admin";
import home from "../views/Home";
import blog from "../views/user/blog";
import recommend from "../views/user/recommend";
import type from "../views/user/type";
import tag from "../views/user/tag";
import edit from "../views/admin/edit";
import articles from "../views/admin/articles";
import adminType from "../views/admin/type";
import adminTag from "../views/admin/tag";
import messageBoard from "../views/user/messageBoard";
import adminComment from "../views/admin/comment";
import commentDetail from "../views/admin/commentDetail";
import commentList from "../views/admin/commentList";
import message from "../views/admin/message";
import search from "../views/user/search";
import login from "../views/login";







Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/admin/',
    name: 'admin',
    component: admin,

    children: [
      {
        name: 'adminArticles',
        path: '',
        component: articles,

      },
      {
        name: 'adminEdit',
        path: 'edit',
        component: edit,

      },
      {
        name: 'adminType',
        path: 'type',
        component: adminType
      },
      {
        name: 'adminTag',
        path: 'tag',
        component: adminTag
      },
      {
        name: 'adminComment',
        path: 'comment',
        component: adminComment,
        children: [
          {
            name: 'commentList',
            path: 'list',
            component: commentList
          },
          {
            name: 'commentDetail',
            path: 'detail',
            component: commentDetail
          },
        ]
      },
      {
        name: 'adminMessage',
        path: 'message',
        component: message
      },
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: user,
    children:[
      {
        name:'userRecommend',
        path: '/',
        component: recommend
      },
      {
        name:'userBlog',
        path: 'blog',
        component: blog
      },
      {
        name:'userType',
        path: 'type',
        component: type
      },
      {
        name:'userTag',
        path: 'tag',
        component: tag
      },
      {
        name:'userMessageBoard',
        path: 'messageBoard',
        component: messageBoard
      },
      {
        name:'userSearch',
        path: 'search',
        component: search
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: login
  }





]

  const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (!to.path.startsWith('/admin')) {
    next()
  } else {
    let islogin = false;
    var strcookie = document.cookie;//获取cookie字符串
    console.log(strcookie);
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      console.log(arr);
      if (arr[0] == 'uid'){
        islogin=true;
      }
    }
    if (!islogin) {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      next()
    }

  }

})



export default router
