import Widget from './widget';
import { DraggableEventHandler } from 'react-draggable';

type Props = {
  code: string;
  title?: string;
  position: {
    x: number;
    y: number;
  };
  onDragStop?: DraggableEventHandler;
};

function YoutubeWidget({
  code,
  title = 'YouTube video',
  position = { x: 0, y: 0 },
  ...widgetProps
}: Props) {
  const src = `https://www.youtube.com/embed/${code}`;
  return (
    <Widget position={position} {...widgetProps}>
      <iframe
        width="560"
        height="315"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Widget>
  );
}

export default YoutubeWidget;