import * as Backbone from 'backbone';
import * as React from 'react';
import { pick } from './utils';

export default function useModel(model: Backbone.Model, keys?: string[]): any {
  const select = () => {
    return { ...(keys ? pick(model.attributes, keys) : model.attributes) };
  };

  const [attributes, setAttributes] = React.useState(select());
  const event = keys ? keys.map(key => `change:${key}`).join(' ') : 'change';

  React.useEffect(() => {
    const onChange = () => {
      setAttributes(select());
    };
    model.on(event, onChange);

    return () => {
      model.off(event, onChange);
    };
  }, [model]);

  return attributes;
}
