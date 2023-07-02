import Widget, { WidgetProps } from './widget';

type Props = {
  code: string;
} & WidgetProps;

function YoutubeWidget({
  code,
  ...widgetProps
}: Props) {
  const src = `https://www.youtube.com/embed/${code}`;
  return (
    <Widget {...widgetProps}>
      <iframe
        width="560"
        height="315"
        src={src}
        title={widgetProps.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Widget>
  );
}

export default YoutubeWidget;