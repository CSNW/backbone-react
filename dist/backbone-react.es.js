//! backbone-react v0.1.2 - https://github.com/CSNW/backbone-react - @license: MIT
import React__default, { memo, forwardRef, useRef, useEffect, createElement, useState } from 'react';
import { View } from 'backbone';
import { render } from 'react-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function pick(object, keys) {
    const picked = {};
    for (const key of Object.keys(object)) {
        if (keys.includes(key)) {
            picked[key] = object[key];
        }
    }
    return picked;
}
function isFunction(value) {
    return (!!value && Object.prototype.toString.call(value) === '[object Function]');
}

var backboneView = memo(forwardRef(function BackboneView(props, ref) {
    const { View, options = {}, as: Component = 'div', instance: instanceRef } = props, passthrough = __rest(props, ["View", "options", "as", "instance"]);
    const container = useRef(null);
    // Need to use the container's ref, but also want to forward
    const setContainerRef = (current) => {
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
        container.current.appendChild(instance.el);
        instance.render();
        setRef(instanceRef, instance);
        return () => {
            instance.remove();
        };
    }, [container]);
    return React__default.createElement(Component, Object.assign({}, passthrough, { ref: setContainerRef }));
}), 
// The only way to interact with the Backbone view is imperatively via instance
alwaysEqual);
function setRef(ref, value) {
    if (!ref)
        return;
    if (isFunction(ref)) {
        ref(value);
    }
    else {
        // @ts-ignore Cannot assign to 'current' because it is a read-only property
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
        ref.current = value;
    }
}
function alwaysEqual() {
    return true;
}

class ReactView extends View {
    constructor(Component, props = {}, options = {}) {
        super(options);
        this.Component = Component;
        this.props = props;
    }
    render() {
        const { Component, props, el } = this;
        render(createElement(Component, Object.assign({}, props)), el);
        return this;
    }
}

function useModel(model, keys) {
    const select = () => {
        return Object.assign({}, (keys ? pick(model.attributes, keys) : model.attributes));
    };
    const [attributes, setAttributes] = useState(select());
    const event = keys ? keys.map(key => `change:${key}`).join(' ') : 'change';
    useEffect(() => {
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

export { backboneView as BackboneView, ReactView, useModel };
//# sourceMappingURL=backbone-react.es.js.map
