import React, {
  memo,
  forwardRef,
  useRef,
  useEffect,
  Ref,
  RefObject
} from 'react';
import * as Backbone from 'backbone';
import { isFunction } from './utils';

type RefFunction<TValue> = (value: TValue | null) => void;

export interface Props {
  View: typeof Backbone.View;
  options?: object;
  as?: any;
  instance?: Ref<Backbone.View>;
}

const alwaysEqual = () => true;

export default memo(
  forwardRef(function BackboneView(props: Props, ref: Ref<any>) {
    const {
      View,
      options = {},
      as: Component = 'div',
      instance: instanceRef,
      ...passthrough
    } = props;
    const container = useRef<null | HTMLElement>(null);

    // useEffect can be thought of as componentDidMount, componentDidUpdate, and componentWillUnmount
    //
    // For componentDidMount, create instance, append, and then render
    // (render after appending to avoid issues with views that expect to be in the DOM)
    //
    // For componentDidUpdate, not used here due to React.memo that doesn't change
    //
    // For componentWillUnmount, remove the instance to allow for cleanup
    useEffect(() => {
      const instance = new View(options);

      container.current!.appendChild(instance.el);
      instance.render();

      setRef(ref, instance.el);
      setRef(instanceRef, instance);

      return () => {
        instance.remove();
      };
    }, [container]);

    return <Component {...passthrough} ref={ref} />;
  }),

  // The only way to interact with the Backbone view is imperatively via instance
  alwaysEqual
);

function setRef<TValue>(ref: Ref<TValue> | undefined, value: TValue | null) {
  if (!ref) return;

  if (isFunction(ref)) {
    (ref as RefFunction<TValue>)(value);
  } else {
    // @ts-ignore Cannot assign to 'current' because it is a read-only property
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
    (ref as RefObject<TValue>).current = value;
  }
}
