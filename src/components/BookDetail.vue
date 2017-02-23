<template>
  <div>
  测试2:{{ book }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      book: this.$route.query.data
    }
  }
}
</script>
