<template>
  <div class="container">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.length
      const fromDepth = from.path.length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
body{
  margin: 0;
  font-family: PingFang SC,STHeiti Light,Microsoft YaHei;
  padding: 0;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li{
  list-style: none;
  margin: 0;
  padding: 0;
}
a, a:hover, a:focus{
  text-decoration: none;
}
div{
  box-sizing: border-box;
}
p{
  margin: 0;
}
.container{
  position: relative;
  min-height: 450px;
  margin: 0 auto;
}
.container .book-detail-div{
  position: absolute;
  width: 100%;
}
.child-view{
  position: absolute;
  width: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1)
}
.slide-right-leave-active, .slide-left-enter-active{
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter{
  opacity: 0;
}
</style>
