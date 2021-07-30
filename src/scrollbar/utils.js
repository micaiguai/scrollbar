export const BAR_MAP = {
  vertical: {
    key: 'vertical',
    size: 'height',
    axis: 'Y',
    offsetSize: 'offsetHeight',
    clientAxis: 'clientY',
    scrollSize: 'scrollHeight',
    scrollDirection: 'scrollTop',
    direction: 'top'
  },
  horizontal: {
    key: 'horizontal',
    size: 'width',
    axis: 'X',
    offsetSize: 'offsetWidth',
    clientAxis: 'clientX',
    scrollSize: 'scrollWidth',
    scrollDirection: 'scrollLeft',
    direction: 'left'
  }
}

export function renderThumbStyle({ move, size, bar }) {
  const style = {}
  style[bar.size] = size
  style.transform = `translate${ bar.axis }(${ move })`
  return style
}

function resizeHandler(entries) {
  entries.forEach(entry => {
    const listeners = entry.target.__resizeListeners__ || []
    listeners.forEach(listener => {
      listener()
    })
  })
}

export function addResizeListener(element, fn) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

export function removeResizeListener(element, fn) {
  element.__resizeListeners__.splice(
    element.__resizeListeners__.indexOf(fn),
    1
  )
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}



