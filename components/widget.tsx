import Draggable, { DraggableEventHandler } from 'react-draggable';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  position: {
    x: number;
    y: number;
  };
  onDragStop?: DraggableEventHandler;
};

function Widget({ children, position = { x: 0, y: 0 }, onDragStop }: Props) {
  // React.useRef because of
  // https://github.com/react-grid-layout/react-draggable/blob/master/CHANGELOG.md#440-may-12-2020
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={position}
      grid={[25, 25]}
      onStop={onDragStop}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} style={{ position: 'absolute' }}>
        <div className="handle">Drag from here</div>
        <div>{children}</div>
      </div>
    </Draggable>
  );
}

export default Widget;