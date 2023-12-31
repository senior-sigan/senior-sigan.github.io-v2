import Draggable, { DraggableEventHandler } from 'react-draggable';
import {useRef} from 'react';
import { styled } from 'styled-components';

export type WidgetProps = {
  children?: React.ReactNode;
  title?: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  onDragStop?: DraggableEventHandler;
  onDragStart?: DraggableEventHandler;
};

export default function Widget({ children, position, onDragStop, onDragStart }: WidgetProps) {
  // React.useRef because of
  // https://github.com/react-grid-layout/react-draggable/blob/master/CHANGELOG.md#440-may-12-2020
  const nodeRef = useRef(null);
  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={position}
      // grid={[25, 25]}
      onStop={onDragStop}
      onStart={onDragStart}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} style={{ position: 'absolute', zIndex: position.z }}>
        <div className="handle">Drag from here</div>
        <div className="draggable-iframe-cover"></div>
        <WidgetWrapper>{children}</WidgetWrapper>
      </div>
    </Draggable>
  );
}

const WidgetWrapper = styled.div`
  background-color: white;
`;