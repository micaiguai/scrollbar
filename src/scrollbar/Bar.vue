<template>
  <div v-if="visible" :class="['scrollbar__bar', 'is-' + bar.key, isActive && 'is-active']" ref="barRef" @mousedown="clickTrackHandler">
    <div class="scrollbar__thumb" :style="thumbStyle" @mousedown.prevent.stop="clickThumbHandler" ref="thumbRef"></div>
  </div>
</template>

<script>
import { BAR_MAP, renderThumbStyle } from './utils'

export default {
  name: 'Bar',
  props: {
    vertical: Boolean,
    size: {
      type: String,
      required: true
    },
    move: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      barStore: {},
      isActive: false
    }
  },
  inject: ['scrollbar'],
  computed: {
    visible() {
      return !!this.size
    },
    bar() {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
    },
    thumbStyle() {
      return renderThumbStyle({
        size: this.size,
        move: this.move,
        bar: this.bar
      })
    }
  },
  methods: {
    clickThumbHandler(e) {
      // window.getSelection().removeAllRanges()
      const thumbRef = this.$refs.thumbRef

      this.startDrag(e)
      this.barStore[this.bar.axis] = e[this.bar.clientAxis] - thumbRef.getBoundingClientRect()[this.bar.direction]
    },
    clickTrackHandler(e) {
      const thumbRef = this.$refs.thumbRef
      const barRef = this.$refs.barRef
      const wrapRef = this.scrollbar.$refs.wrapRef

      const offset = e[this.bar.clientAxis] - barRef.getBoundingClientRect()[this.bar.direction]
      const thumbPoistionPercentage = (offset - thumbRef[this.bar.offsetSize] / 2) / wrapRef[this.bar.offsetSize]

      wrapRef[this.bar.scrollDirection] = thumbPoistionPercentage * wrapRef[this.bar.scrollSize]
    },
    startDrag(e) {
      this.isActive = true

      document.addEventListener('mousemove', this.mousemoveDocumentHandler)
      document.addEventListener('mouseup', this.mouseupDocumentHandler)
    },
    mousemoveDocumentHandler(e) {
      const barRef = this.$refs.barRef
      const wrapRef = this.scrollbar.$refs.wrapRef

      const offset = e[this.bar.clientAxis] - barRef.getBoundingClientRect()[this.bar.direction]
      const thumbClickPosition = this.barStore[this.bar.axis]
      const thumbPositionPercentage = (offset - thumbClickPosition) / barRef[this.bar.offsetSize]

      wrapRef[this.bar.scrollDirection] = thumbPositionPercentage * wrapRef[this.bar.scrollSize]
    },
    mouseupDocumentHandler() {
      this.isActive = false

      document.removeEventListener('mousemove', this.mousemoveDocumentHandler)
    }
  }
}
</script>

<style lang="less" scoped>
.scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  border-radius: 2px;
  transition: border-radius .2s, padding .2s;
  cursor: pointer;
  // &:hover,
  // &.is-active {
  //   border-radius: 4px;
  //   &.is-vertical {
  //     padding-left: 0;
  //   }
  //   &.is-horizontal {
  //     padding: 0;
  //   }
  //   /deep/.scrollbar__thumb {
  //     background-color: #ADB5BD;
  //   }
  // }
  &.is-vertical {
    top: 2px;
    width: 4px;
    // width: 8px;
    // padding-left: 4px;
  }
  &.is-horizontal {
    left: 2px;
    height: 4px;
    // height: 8px;
    // padding: 2px 0;
    background-color: #F7F7F7;
    .scrollbar__thumb {
      height: 100%;
    }
  }
  .scrollbar__thumb {
    border-radius: inherit;
    background-color: #E9ECEF;
    transition: background-color .3s;
  }
}
</style>
