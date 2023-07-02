import YoutubeWidget from '../components/youtube-widget';
import GooglePresentationWidget from '../components/google-presentation-widget';
import { useState } from 'react';
import { DraggableData } from 'react-draggable';
import PostWidget from '../components/post-widget';


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
  type: "YoutubeWidget";
  code: string;
} | {
  type: "GooglePresentationWidget",
  code: string;
} | {
  type: "PostWidget",
  slug: string;
}

const content: Content[] = [
  { type: "PostWidget", slug: "example"},
  { type: "PostWidget", slug: "a"},
  { type: "YoutubeWidget", code: "zkqzi5XoUIw"},
  { type: "YoutubeWidget", code: "YNx1KdtYNO8"},
  { type: "GooglePresentationWidget", code: "2PACX-1vS78kLmcfoGIt2wpNaNpvfTc_7vGIG7N71xH6UxpnYLx3LP7jUEx8V4tvHA0U09pfXzr4CqNorOEGt0" },
];

function Home() {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [topZ, setTopZ] = useState(1000);

  const handleDragStop = (widget: WidgetData, data: DraggableData) => {
    widget.position.x = data.x;
    widget.position.y = data.y;
    setWidgets(widgets);
  }

  const handleDragStart = (widget: WidgetData) => {
    if (widget.position.z == topZ) {
      return;
    }
    const newZ = topZ + 1
    widget.position.z = newZ;
    setWidgets(widgets);
    setTopZ(newZ);
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
    if (params.type === 'PostWidget') {
      return <PostWidget
        key={idx}
        slug={params.slug}
        position={widget.position}
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
      <button onClick={spawnWindow(0)}>Example</button>
      <button onClick={spawnWindow(1)}>A</button>
      <button onClick={spawnWindow(2)}>Video1</button>
      <button onClick={spawnWindow(3)}>Video2</button>
      <button onClick={spawnWindow(4)}>Presentation</button>
      <div>{widgetsHtml}</div>
    </div>
  );
}

export default Home;