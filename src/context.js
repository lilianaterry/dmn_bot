import * as _ from 'lodash';

export default class SessionContext {
  session: string;
  contexts: {
    name: string,
    lifespanCount: number,
    parameters: any
  }[]

  constructor(session: string, contexts: any[]) {
    this.session = session;
    if (contexts != null) {
      this.contexts = contexts;
    } else {
      this.contexts = [];
    }
  }

  removeContext(name: string) {
    const context = this.getOrCreateContext(name);
    context.lifespanCount = 0;
    return this;
  }

  addContext(name: string, lifespan: number, parameters: {}) {
    if (name) {
      this.contexts.push({
        name: `${this.session}/contexts/${name}`,
        lifespanCount: lifespan,
        parameters,
      });
    }
    return this;
  }

  clearContexts() {
    this.contexts = [];
  }

  getContext(name: string) {
    return _.find(this.contexts, o => o.name.includes(name));
  }

  getOrCreateContext(name: string) {
    let context = this.getContext(name);
    if (!context) {
      context = {
        name: `${this.session}/contexts/${name}`,
        lifespanCount: 1,
        parameters: {},
      };
      this.contexts.push(context);
    }
    return context;
  }

  toJSON() {
    return this.contexts;
  }

  static getShortName(context: any) {
    return _.last(context.name.split('/'));
  }
}
