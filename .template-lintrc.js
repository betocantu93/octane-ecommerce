'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-implicit-this': { allow: ['head-layout'] },
    'no-curly-component-invocation': { allow: ['title']}
  }
};
