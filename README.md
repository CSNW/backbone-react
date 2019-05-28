# backbone-react

## API

<a href="#BackboneView" name="BackboneView">#</a> <b>BackboneView</b>({ <i>View</i>[, <i>options</i>] })

```js
import * as React from 'react';
import { BackboneView } from 'backbone-react';
import LegacyView from './views/legacy';

export default function Component(props) {
  const { id } = props;

  return (
    <div>
      <h2>Backbone inside React</h2>
      <BackboneView View={LegacyView} options={{ id }} />
    </div>
  );
}
```

A ref can be used to access the View's element and instance for advanced use cases:

```js
import * as React from 'react';
import { BackboneView } from 'backbone-react';
import LegacyView from './views/legacy';

export default function Component(props) {
  const el = React.useRef(null);
  const instance = React.useRef(null);

  React.useEffect(() => {
    // el.current = LegacyView's el
    // instance.current = LegacyView's instance
  });

  <BackboneView View={LegacyView} ref={el} instance={instance} />
}
```

<a href="#ReactView" name="ReactView">#</a> <b>ReactView</b>(<i>View</i>[, <i>props</i>])

```js
import { ReactView } from 'backbone-react';
import Component from './views/component';

const props = { message: 'Howdy!' };
const main = new ReactView(Component, props);

document.getElementById('main').appendChild(main.el);
main.render();
```

<a href="#useModel" name="useModel">#</a> <b>useModel</b>(<i>model</i>[, <i>keys</i>])

```js
import * as React from 'react';
import { useModel } from 'backbone-react';

export default function Component(props) {
  const { model } = props;
  const attributes = useModel(model);

  // `attributes` is updated as the model changes
  //
  // Can also subscribe to particular keys
  // const { value, label } = useModel(model, ['value', 'label']);

  const onChange = event => {
    model.set('value', event.target.value);
  };

  return (
    <>
      <label>{attributes.label}</label>
      <input type="text" value={attributes.value} onChange={onChange} />
    </>
  );
}
```
