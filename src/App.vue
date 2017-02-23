<template>
  <div class="container">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
.container{
  position: relative;
  min-height: 450px;
  margin: 0 auto;
}
</style>
