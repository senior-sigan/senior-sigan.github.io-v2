import Widget, { WidgetProps } from './widget';

type Props = {
  slug: string;
} & WidgetProps;

function PostWidget({
  slug,
  ...widgetProps
}: Props) {
  return (
    <Widget {...widgetProps}>
      <iframe
        width="400"
        height="600"
        src={`/${slug}`}
        title={widgetProps.title}
      ></iframe>
    </Widget>
  );
}

export default PostWidget;