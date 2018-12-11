"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireWildcard(require("lodash"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SessionContext {
  constructor(session, contexts) {
    _defineProperty(this, "session", void 0);

    _defineProperty(this, "contexts", void 0);

    this.session = session;

    if (contexts != null) {
      this.contexts = contexts;
    } else {
      this.contexts = [];
    }
  }

  removeContext(name) {
    const context = this.getOrCreateContext(name);
    context.lifespanCount = 0;
    return this;
  }

  addContext(name, lifespan, parameters) {
    if (name) {
      this.contexts.push({
        name: `${this.session}/contexts/${name}`,
        lifespanCount: lifespan,
        parameters
      });
    }

    return this;
  }

  clearContexts() {
    this.contexts = [];
  }

  getContext(name) {
    return _.find(this.contexts, o => o.name.includes(name));
  }

  getOrCreateContext(name) {
    let context = this.getContext(name);

    if (!context) {
      context = {
        name: `${this.session}/contexts/${name}`,
        lifespanCount: 1,
        parameters: {}
      };
      this.contexts.push(context);
    }

    return context;
  }

  toJSON() {
    return this.contexts;
  }

  static getShortName(context) {
    return _.last(context.name.split('/'));
  }

}

exports.default = SessionContext;