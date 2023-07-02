import { base64EncArr, base64DecToArr } from './bytes';

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const STEP = 25;

type WidgetData = {
  id: number;
  position: {
    x: number;
    y: number;
  };
};

function encode(widgets: Array<WidgetData>): string {
  const size = 1 + 1 + 1;
  const buffer = new Uint8Array(widgets.length * size);
  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const offset = i * size;
    buffer[offset + 0] = widget.id;
    buffer[offset + 1] = clamp(widget.position.x / STEP, 0, 255);
    buffer[offset + 2] = clamp(widget.position.y / STEP, 0, 255);
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
        x: buffer[offset + 1] * STEP,
        y: buffer[offset + 2] * STEP,
      },
    });
  }
  return res;
}