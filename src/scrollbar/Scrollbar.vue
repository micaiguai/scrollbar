<template>
  <div :class="['scrollbar', isScroll && 'scrollbar--scrolling']">
    <div class="scrollbar__wrap" :style="{ height }" @scroll="handleScroll" ref="wrapRef">
      <div class="scrollbar__view" ref="viewRef">
        <slot></slot>
      </div>
    </div>
    <bar vertical :size="sizeHeight" :move="moveY"/>
    <bar :size="sizeWidth" :move="moveX"/>
  </div>
</template>

<script>
import Bar from './Bar.vue'

import { addResizeListener, removeResizeListener } from './utils'

export default {
  name: 'Scrollbar',
  components: {
    Bar
  },
  mounted() {
    window.addEventListener('resize', this.update)
    addResizeListener(this.$refs.wrapRef, this.update)
    addResizeListener(this.$refs.viewRef, this.update)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.update)
    removeResizeListener(this.$refs.wrapRef, this.update)
    removeResizeListener(this.$refs.viewRef, this.update)
  },
  props: {
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      sizeHeight: '',
      sizeWidth: '',
      moveY: '',
      moveX: '',

      isScroll: false,
      timer: 0,

      awakeTimer: 0
    }
  },
  provide() {
    return {
      scrollbar: this
    }
  },
  methods: {
    update() {
      const wrapRef = this.$refs.wrapRef
      const heightPercentage = (wrapRef.clientHeight * 100) / wrapRef.scrollHeight
      const widthPercentage = (wrapRef.clientWidth * 100) / wrapRef.scrollWidth
      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
    },
    handleScroll() {
      this.isScroll = true
      clearTimeout(this.timer)

      const wrapRef = this.$refs.wrapRef
      this.moveY = wrapRef.scrollTop * 100 / wrapRef.clientHeight + '%'
      this.moveX = wrapRef.scrollLeft * 100 / wrapRef.clientWidth + '%'

      this.timer = setTimeout(() => {
        this.isScroll = false
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped>
.scrollbar {
  position: relative;
  height: 100%;
  .scrollbar__wrap {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  // &.scrollbar--scrolling {
  //   > .scrollbar__bar {
  //     border-radius: 4px;
  //     &.is-vertical {
  //       width: 8px;
  //     }
  //     &.is-horizontal {
  //       height: 8px;
  //     }
  //     /deep/.scrollbar__thumb {
  //       background-color: #ADB5BD;
  //     }
  //   }
  // }
}
</style>
