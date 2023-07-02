import YoutubeWidget from '../components/youtube-widget';
import GooglePresentationWidget from '../components/google-presentation-widget';
import { base64EncArr, base64DecToArr } from '../utils/bytes';
import { NextRouter, withRouter } from 'next/router';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

function encode(widgets: Array<WidgetData>): string {
  const size = 1 + 1 + 1;
  const buffer = new Uint8Array(widgets.length * size);
  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const offset = i * size;
    buffer[offset + 0] = widget.id;
    buffer[offset + 1] = clamp(widget.position.x / 25, 0, 255);
    buffer[offset + 2] = clamp(widget.position.y / 25, 0, 255);
  }
  return base64EncArr(buffer);
}

function decode(data: string): Array<WidgetData> {
  const buffer = base64DecToArr(data);
  const res: Array<WidgetData> = [];
  for (let offset = 0; offset < buffer.length; offset += 3) {
    res.push({
      id: buffer[offset + 0],
      position: {
        x: buffer[offset + 1] * 25,
        y: buffer[offset + 2] * 25,
      },
    });
  }
  return res;
}

type Position = {
  x: number;
  y: number;
};

// TODO: refactor this callbacks. Maybe each widget has direct access to the url?
const content = [
  (pos: Position, idx: number, updatePos: (x: number, y: number) => void) => (
    <YoutubeWidget
      key={idx}
      position={pos}
      code="zkqzi5XoUIw"
      onDragStop={(_e, data) => updatePos(data.x, data.y)}
    />
  ),
  (pos: Position, idx: number, updatePos: (x: number, y: number) => void) => (
    <YoutubeWidget
      key={idx}
      position={pos}
      code="YNx1KdtYNO8"
      onDragStop={(_e, data) => updatePos(data.x, data.y)}
    />
  ),
  (pos: Position, idx: number, updatePos: (x: number, y: number) => void) => (
    <YoutubeWidget
      key={idx}
      position={pos}
      code="xvYLJMBW700"
      onDragStop={(_e, data) => updatePos(data.x, data.y)}
    />
  ),
  (pos: Position, idx: number, updatePos: (x: number, y: number) => void) => (
    <GooglePresentationWidget
      position={pos}
      key={idx}
      code="2PACX-1vS78kLmcfoGIt2wpNaNpvfTc_7vGIG7N71xH6UxpnYLx3LP7jUEx8V4tvHA0U09pfXzr4CqNorOEGt0"
      onDragStop={(_e, data) => updatePos(data.x, data.y)}
    />
  ),
];

type WidgetData = {
  id: number;
  position: Position;
};


function one(str: string | string[] | undefined) {
  if (!str) {
    return '';
  }
  
  if (typeof str === 'string') {
    return str;
  }

  return str[0];
}

function Home({ router }: {router: NextRouter }) {
  const widgets: Array<WidgetData> = decode(one(router.query.state));

  const updateWidgets = (widgets: Array<WidgetData>) => {
    router.push(`?state=${encode(widgets)}`)
  }

  const widgetsHtml = widgets.map((widget, idx) => {
    const element = content[widget.id](widget.position, idx, (x, y) => {
      widget.position.x = x;
      widget.position.y = y;

      updateWidgets(widgets);
    });
    return element;
  });

  const spawnWindow = (id: number) => {
    return () => {
      const newWidgets = widgets.concat({
        id: id,
        position: {
          x: Math.random() * 800,
          y: Math.random() * 600,
        },
      });
      const params = new URLSearchParams(`?state=${encode(newWidgets)}`);
      updateWidgets(newWidgets);
    };
  };

  return (
    <div className="App">
      <button onClick={spawnWindow(0)}>Spawn</button>
      <button onClick={spawnWindow(1)}>Spawn</button>
      <button onClick={spawnWindow(2)}>Spawn</button>
      <button onClick={spawnWindow(3)}>Spawn</button>
      {widgetsHtml}
    </div>
  );
}

export default withRouter(Home);