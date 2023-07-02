import YoutubeWidget from '../components/youtube-widget';
import GooglePresentationWidget from '../components/google-presentation-widget';
import { useState } from 'react';
import { DraggableData } from 'react-draggable';


type Position = {
  x: number;
  y: number;
  z: number;
};

type WidgetData = {
  id: number;
  position: Position;
};

type Content = {
  type: "YoutubeWidget" | "GooglePresentationWidget",
  code: string;
}

const content: Content[] = [
  { type: "YoutubeWidget", code: "zkqzi5XoUIw"},
  { type: "YoutubeWidget", code: "YNx1KdtYNO8"},
  { type: "YoutubeWidget", code: "xvYLJMBW700"},
  { type: "GooglePresentationWidget", code: "2PACX-1vS78kLmcfoGIt2wpNaNpvfTc_7vGIG7N71xH6UxpnYLx3LP7jUEx8V4tvHA0U09pfXzr4CqNorOEGt0" },
];

function Home() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [topZ, setTopZ] = useState(1000);

  const handleDragStop = (widget: WidgetData, data: DraggableData) => {
    widget.position.x = data.x;
    widget.position.y = data.y;
    setWidgets(widgets);
    console.log('Stop');
  }

  const handleDragStart = (widget: WidgetData) => {
    if (widget.position.z == topZ) {
      return;
    }
    const newZ = topZ + 1
    widget.position.z = newZ;
    setWidgets(widgets);
    setTopZ(newZ);
    console.log('Start');
  };

  const drawWidget = (params: Content, idx: number, widget: WidgetData) => {
    if (params.type === 'YoutubeWidget') {
      return <YoutubeWidget
        key={idx}
        position={widget.position}
        code={params.code}
        onDragStop={(_e, data) => handleDragStop(widget, data)}
        onDragStart={() => handleDragStart(widget)}
      />
    }
    if (params.type === 'GooglePresentationWidget') {
      return <GooglePresentationWidget
        key={idx}
        position={widget.position}
        code={params.code}
        onDragStop={(_e, data) => handleDragStop(widget, data)}
        onDragStart={() => handleDragStart(widget)}
      />
    }
  }

  const spawnWindow = (id: number) => {
    return () => {
      const newWidgets = widgets.concat({
        id: id,
        position: {
          x: Math.random() * 800,
          y: Math.random() * 600,
          z: topZ,
        },
      });
      setWidgets(newWidgets);
      setTopZ(topZ + 1);
    };
  };

  const widgetsHtml = widgets.map((widget, idx) => drawWidget(content[widget.id], idx, widget));

  return (
    <div className="App">
      <button onClick={spawnWindow(0)}>Spawn</button>
      <button onClick={spawnWindow(1)}>Spawn</button>
      <button onClick={spawnWindow(2)}>Spawn</button>
      <button onClick={spawnWindow(3)}>Spawn</button>
      <div>{widgetsHtml}</div>
    </div>
  );
}

export default Home;