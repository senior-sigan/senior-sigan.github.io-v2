import Widget, {WidgetProps} from './widget';

type Props = {
  code: string;
} & WidgetProps;

function GooglePresentationWidget({
  code,
  title = 'Presentation',
  position,
  ...widgetProps
}: Props) {
  const src = `https://docs.google.com/presentation/d/e/${code}/embed?start=false&loop=false&delayms=3000`;
  return (
    <Widget position={position} title={title} {...widgetProps}>
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