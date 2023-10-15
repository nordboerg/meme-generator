import { forwardRef, RefObject } from 'react'
import Moveable from 'react-moveable'
import { isMobile } from '../Layout/Layout'

interface Props {
  captionId: string
  text: string
  color: string
  isPositioningEnabled: boolean
  index: number
  targetRef: HTMLDivElement | null
  dragContainerRef: RefObject<HTMLDivElement>
  onUpdateCaptionPosition: (
    captionId: string,
    left: number,
    top: number,
    width: number,
    height: number,
    offsetTop: number,
    offsetLeft: number,
  ) => void
  isHideEdges: boolean
}

const MovableCaption = forwardRef<HTMLDivElement | null, Props>(function MovableCaption(
  {
    captionId,
    text,
    color,
    isPositioningEnabled,
    index,
    targetRef,
    dragContainerRef,
    onUpdateCaptionPosition,
    isHideEdges,
  },
  ref,
) {
  return (
    <>
      <div
        ref={ref}
        style={{
          position: 'absolute',
          display: text ? 'initial' : 'none',
          top: index * 64,
          left: 0,
          width: isMobile ? 200 : 400,
          height: isMobile ? 96 : 128,
          fontSize: isMobile ? 32 : 48,
          lineHeight: 1,
          color: color,
          transform: 'translate(0px, 0px)',
        }}
      >
        {text}
      </div>
      <Moveable
        target={targetRef}
        draggable={isPositioningEnabled}
        origin={false}
        throttleDrag={1}
        edgeDraggable={false}
        keepRatio={false}
        snappable={true}
        zoom={!text || isHideEdges ? 0 : 1}
        resizable={isPositioningEnabled}
        bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: 'css' }}
        onDrag={(e) => {
          e.target.style.transform = e.transform
        }}
        onDragEnd={(event) => {
          const { top, left, height, width } = event.target.getBoundingClientRect()
          const { offsetTop, offsetLeft } = dragContainerRef.current!

          onUpdateCaptionPosition(
            captionId,
            left,
            top,
            width,
            height,
            offsetTop,
            offsetLeft,
          )
        }}
        onScale={(e) => {
          e.target.style.transform = e.drag.transform
        }}
        onResize={(e) => {
          e.target.style.cssText += `width: ${e.width}px; height: ${e.height}px`
          e.target.style.transform = e.drag.transform
        }}
      />
    </>
  )
})

export default MovableCaption
