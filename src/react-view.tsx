import * as Backbone from 'backbone';
import * as React from 'react';
import { render } from 'react-dom';

export default class ReactView extends Backbone.View<Backbone.Model> {
  Component: any;
  props: object;

  constructor(Component: any, props: object = {}, options: object = {}) {
    super(options);

    this.Component = Component;
    this.props = props;
  }

  render() {
    const { Component, props, el } = this;
    render(<Component {...props} />, el);

    return this;
  }
}
