<template>
  <div class="messageBorad">
    <message-board></message-board>
  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import messageBoard from "../../components/user/messageBoard";



export default {
  name: 'user',
  components: {
    messageBoard
  },
  // 路由加载完后
  created () {


  },

  methods:{


  }
}
</script>
