<template>
  <div>
    <scrollbar height="100">
      <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae distinctio ea, optio harum sapiente illo voluptatibus quo cupiditate fugiat dolores deleniti ad ex numquam quasi, accusantium id reprehenderit dignissimos. Totam!
      </div>
    </scrollbar>
  </div>
</template>

<script>
import Scrollbar from './scrollbar'

export default {
  name: 'App',
  components: {
    Scrollbar
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 200px;
  width: 100px;
}
</style>

