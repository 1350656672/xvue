<template>
  <div class="card" style=" position: sticky;top: 0;z-index: 1;margin-right: 30px;">
    <div class="ui link cards">
      <div class="card">
        <div class="image">
          <img src="/55.jpg">
        </div>
        <div class="content">
          <div class="header">Tls</div>
          <div class="meta">
            <a>Coworker</a>
          </div>
          <div class="description">
            Elyse is a copywriter working in New York.
          </div>

        </div>
        <div class="extra content">
      <span class="right floated">
        Joined in 2014
      </span>
          <span>
        <i class="user icon"></i>
        151 Friends
      </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    msg: String
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了

  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
  },
  methods: {

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
