//! backbone-react v0.1.2 - https://github.com/CSNW/backbone-react - @license: MIT
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('backbone'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'backbone', 'react-dom'], factory) :
    (global = global || self, factory(global.BackboneReact = {}, global.React, global.Backbone, global.ReactDOM));
}(this, function (exports, React, Backbone, reactDom) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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
        var picked = {};
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            if (keys.includes(key)) {
                picked[key] = object[key];
            }
        }
        return picked;
    }
    function isFunction(value) {
        return (!!value && Object.prototype.toString.call(value) === '[object Function]');
    }

    var backboneView = React.memo(React.forwardRef(function BackboneView(props, ref) {
        var View = props.View, _a = props.options, options = _a === void 0 ? {} : _a, _b = props.as, Component = _b === void 0 ? 'div' : _b, instanceRef = props.instance, passthrough = __rest(props, ["View", "options", "as", "instance"]);
        var container = React.useRef(null);
        // Need to use the container's ref, but also want to forward
        var setContainerRef = function (current) {
            container.current = current;
            setRef(ref, current);
        };
        // For mount:, create instance, append, and then render
        // (render after appending to avoid issues with views that expect to be in the DOM)
        //
        // For update: not used here due to React.memo that doesn't change
        //
        // For unmount: remove the instance to allow for cleanup
        React.useEffect(function () {
            var instance = new View(options);
            container.current.appendChild(instance.el);
            instance.render();
            setRef(instanceRef, instance);
            return function () {
                instance.remove();
            };
        }, [container]);
        return React__default.createElement(Component, __assign({}, passthrough, { ref: setContainerRef }));
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

    var ReactView = /** @class */ (function (_super) {
        __extends(ReactView, _super);
        function ReactView(Component, props, options) {
            if (props === void 0) { props = {}; }
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this.Component = Component;
            _this.props = props;
            return _this;
        }
        ReactView.prototype.render = function () {
            var _a = this, Component = _a.Component, props = _a.props, el = _a.el;
            reactDom.render(React.createElement(Component, __assign({}, props)), el);
            return this;
        };
        return ReactView;
    }(Backbone.View));

    function useModel(model, keys) {
        var select = function () {
            return __assign({}, (keys ? pick(model.attributes, keys) : model.attributes));
        };
        var _a = React.useState(select()), attributes = _a[0], setAttributes = _a[1];
        var event = keys ? keys.map(function (key) { return "change:" + key; }).join(' ') : 'change';
        React.useEffect(function () {
            var onChange = function () {
                setAttributes(select());
            };
            model.on(event, onChange);
            return function () {
                model.off(event, onChange);
            };
        }, [model]);
        return attributes;
    }

    exports.BackboneView = backboneView;
    exports.ReactView = ReactView;
    exports.useModel = useModel;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=backbone-react.umd.js.map
