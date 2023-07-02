import { DraggableEventHandler } from 'react-draggable';
import Widget from './widget';

type Props = {
  code: string;
  title?: string;
  position: {
    x: number;
    y: number;
  };
  onDragStop?: DraggableEventHandler;
};
function GooglePresentationWidget({
  code,
  title = 'Presentation',
  position = { x: 0, y: 0 },
}: Props) {
  const src = `https://docs.google.com/presentation/d/e/${code}/embed?start=false&loop=false&delayms=3000`;
  return (
    <Widget position={position}>
      <iframe
        title={title}
        src={src}
        frameBorder="0"
        width="960"
        height="569"
        allowFullScreen
      ></iframe>
    </Widget>
  );
}

export default GooglePresentationWidget;