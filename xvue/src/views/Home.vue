<template>
  <div >
      <!-- Following Menu -->
      <div class="ui large top fixed hidden menu">
          <div class="ui container">
              <a class="active item">Home</a>

              <div class="right menu">
                  <div class="item">
                      <a class="ui button">Log in</a>
                  </div>
                  <div class="item">
                      <a class="ui primary button">Sign Up</a>
                  </div>
              </div>
          </div>
      </div>

      <!-- Sidebar Menu -->
      <div class="ui vertical inverted sidebar menu">
          <a class="active item">Home</a>
          <a class="item">Login</a>
          <a class="item">Signup</a>
      </div>


      <!-- Page Contents -->
      <div class="pusher ">
          <!--主体-背景图设置 -->
          <div class="ui inverted vertical masthead center aligned segment "
               style="background-image: url('/55.jpg') !important;
        background-size: cover !important;">

              <div class="ui container  ">
                  <div class="ui large secondary inverted pointing menu">
                      <a class="toc item">
                          <i class="sidebar icon"></i>
                      </a>
                      <a class="active item">Home</a>
                      <div class="right item">
                          <router-link to="/admin" class="ui inverted button">管理员</router-link>
                      </div>
                  </div>
              </div>

              <div class="ui text container ">
                  <h1 class="ui inverted header animate__animated animate__zoomInUp" >
                      Xblog
                  </h1>
                  <h2 class="animate__animated animate__zoomIn">愿你血液里时刻流淌着灵感与不安分</h2>
                  <router-link to="/user" class="ui huge teal button animate__animated animate__zoomIn">进入 <i class="right arrow icon"></i></router-link>
              </div>


          </div>

          <div class="ui vertical stripe segment">
              <div class="ui middle aligned stackable grid container">
                  <div class="row">
                      <div class="eight wide column">
                          <h3 class="ui header">We Help Companies and Companions</h3>
                          <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
                      </div>
                     <!-- <div class="six wide right floated column">
                          <img src="assets/images/wireframe/white-image.png" class="ui large bordered rounded image">
                      </div>-->
                  </div>
                  <div class="row">
                      <div class="center aligned column">
                          <a class="ui huge button">github</a>
                      </div>
                  </div>
              </div>
          </div>





          <div class="ui inverted vertical footer segment">
              <div class="ui container">
                  <div class="ui stackable inverted divided equal height stackable grid">
                      <h4 class="ui inverted header">Footer Header</h4>
                      <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                  </div>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import Vue from "vue";



export default {
  name: 'test',
  components: {

  }
}
</script>

<style type="text/css">

    .hidden.menu {
        display: none;

    }

    .masthead.segment {
        min-height: 700px;
        padding: 1em 0em;
    }
    .masthead .logo.item img {
        margin-right: 1em;
    }
    .masthead .ui.menu .ui.button {
        margin-left: 0.5em;
    }
    .masthead h1.ui.header {
        margin-top: 3em;
        margin-bottom: 0em;
        font-size: 4em;
        font-weight: normal;
    }
    .masthead h2 {
        font-size: 1.7em;
        font-weight: normal;
    }

    .ui.vertical.stripe {
        padding: 8em 0em;
    }
    .ui.vertical.stripe h3 {
        font-size: 2em;
    }
    .ui.vertical.stripe .button + h3,
    .ui.vertical.stripe p + h3 {
        margin-top: 3em;
    }
    .ui.vertical.stripe .floated.image {
        clear: both;
    }
    .ui.vertical.stripe p {
        font-size: 1.33em;
    }
    .ui.vertical.stripe .horizontal.divider {
        margin: 3em 0em;
    }

    .quote.stripe.segment {
        padding: 0em;
    }
    .quote.stripe.segment .grid .column {
        padding-top: 5em;
        padding-bottom: 5em;
    }

    .footer.segment {
        padding: 5em 0em;
    }

    .secondary.pointing.menu .toc.item {
        display: none;
    }

    @media only screen and (max-width: 700px) {
        .ui.fixed.menu {
            display: none !important;
        }
        .secondary.pointing.menu .item,
        .secondary.pointing.menu .menu {
            display: none;
        }
        .secondary.pointing.menu .toc.item {
            display: block;
        }
        .masthead.segment {
            min-height: 350px;
        }
        .masthead h1.ui.header {
            font-size: 2em;
            margin-top: 1.5em;
        }
        .masthead h2 {
            margin-top: 0.5em;
            font-size: 1.5em;
        }
    }

</style>