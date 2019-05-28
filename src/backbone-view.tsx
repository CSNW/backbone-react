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

// TODO Better typing here
type Component = any;

export interface Props {
  View: typeof Backbone.View;
  options?: object;
  as?: string | Component;
  instance?: Ref<Backbone.View>;
}

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

    // Need to use the container's ref, but also want to forward
    const setContainerRef = (current: HTMLElement) => {
      container.current = current;
      setRef(ref, current);
    };

    // For mount:, create instance, append, and then render
    // (render after appending to avoid issues with views that expect to be in the DOM)
    //
    // For update: not used here due to React.memo that doesn't change
    //
    // For unmount: remove the instance to allow for cleanup
    useEffect(() => {
      const instance = new View(options);

      container.current!.appendChild(instance.el);
      instance.render();

      setRef(instanceRef, instance);

      return () => {
        instance.remove();
      };
    }, [container]);

    return <Component {...passthrough} ref={setContainerRef} />;
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

function alwaysEqual() {
  return true;
}
