/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { BuildRuleMessageFactoryParams, buildRuleMessageFactory } from './rule_messages';

describe('buildRuleMessageFactory', () => {
  let factoryParams: BuildRuleMessageFactoryParams;
  beforeEach(() => {
    factoryParams = {
      name: 'name',
      id: 'id',
      ruleId: 'ruleId',
      index: 'index',
    };
  });

  it('appends rule attributes to the provided message', () => {
    const buildMessage = buildRuleMessageFactory(factoryParams);

    const message = buildMessage('my message');
    expect(message).toEqual(expect.stringContaining('my message'));
    expect(message).toEqual(expect.stringContaining('name: "name"'));
    expect(message).toEqual(expect.stringContaining('id: "id"'));
    expect(message).toEqual(expect.stringContaining('rule id: "ruleId"'));
    expect(message).toEqual(expect.stringContaining('signals index: "index"'));
  });

  it('joins message parts with newlines', () => {
    const buildMessage = buildRuleMessageFactory(factoryParams);

    const message = buildMessage('my message');
    const messageParts = message.split('\n');
    expect(messageParts).toContain('my message');
    expect(messageParts).toContain('name: "name"');
    expect(messageParts).toContain('id: "id"');
    expect(messageParts).toContain('rule id: "ruleId"');
    expect(messageParts).toContain('signals index: "index"');
  });

  it('joins multiple arguments with newlines', () => {
    const buildMessage = buildRuleMessageFactory(factoryParams);

    const message = buildMessage('my message', 'here is more');
    const messageParts = message.split('\n');
    expect(messageParts).toContain('my message');
    expect(messageParts).toContain('here is more');
  });

  it('defaults the rule ID if not provided ', () => {
    const buildMessage = buildRuleMessageFactory({
      ...factoryParams,
      ruleId: undefined,
    });

    const message = buildMessage('my message', 'here is more');
    expect(message).toEqual(expect.stringContaining('rule id: "(unknown rule id)"'));
  });
});
