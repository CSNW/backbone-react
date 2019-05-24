# backbone-react

## API

<a href="#BackboneView" name="BackboneView">#</a> <b>BackboneView</b>({ <i>View</i>[, <i>options</i>] })

```js
import * as React from 'react';
import { BackboneView } from 'backbone-react';
import LegacyView from './views/legacy';

export default function Component(props) {
  return (
    <div>
      <h2>Backbone inside React</h2>
      <BackboneView View={LegacyView} options={{ passed_to_view: true }} />
    </div>
  );
}
```

<a href="#ReactView" name="ReactView">#</a> <b>ReactView</b>(<i>View</i>[, <i>props</i>])

```js
import { ReactView } from 'backbone-react';
import Component from './views/component';

const main = new ReactView(Component, { passed_as_props: true });

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
