/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { coreMock, pluginInitializerContextConfigMock } from '../../../../../src/core/server/mocks';
import { enhancedEsSearchStrategyProvider } from './es_search_strategy';

const mockAsyncResponse = {
  id: 'foo',
  response: {
    _shards: {
      total: 10,
      failed: 1,
      skipped: 2,
      successful: 7,
    },
  },
};

const mockRollupResponse = {
  _shards: {
    total: 10,
    failed: 1,
    skipped: 2,
    successful: 7,
  },
};

describe('ES search strategy', () => {
  const mockCoreSetup = coreMock.createSetup();
  const mockApiCaller = jest.fn();
  const mockSearch = jest.fn();
  const mockConfig$ = pluginInitializerContextConfigMock<any>({}).legacy.globalConfig$;

  beforeEach(() => {
    mockApiCaller.mockClear();
    mockSearch.mockClear();
  });

  it('returns a strategy with `search`', () => {
    const esSearch = enhancedEsSearchStrategyProvider(
      {
        core: mockCoreSetup,
        config$: mockConfig$,
      },
      mockApiCaller,
      mockSearch
    );

    expect(typeof esSearch.search).toBe('function');
  });

  it('makes a POST request to async search with params when no ID is provided', async () => {
    mockApiCaller.mockResolvedValueOnce(mockAsyncResponse);

    const params = { index: 'logstash-*', body: { query: {} } };
    const esSearch = enhancedEsSearchStrategyProvider(
      {
        core: mockCoreSetup,
        config$: mockConfig$,
      },
      mockApiCaller,
      mockSearch
    );

    await esSearch.search({ params });

    expect(mockApiCaller).toBeCalled();
    expect(mockApiCaller.mock.calls[0][0]).toBe('transport.request');
    const { method, path, body } = mockApiCaller.mock.calls[0][1];
    expect(method).toBe('POST');
    expect(path).toBe('logstash-*/_async_search');
    expect(body).toEqual({ query: {} });
  });

  it('makes a GET request to async search with ID when ID is provided', async () => {
    mockApiCaller.mockResolvedValueOnce(mockAsyncResponse);

    const params = { index: 'logstash-*', body: { query: {} } };
    const esSearch = enhancedEsSearchStrategyProvider(
      {
        core: mockCoreSetup,
        config$: mockConfig$,
      },
      mockApiCaller,
      mockSearch
    );

    await esSearch.search({ id: 'foo', params });

    expect(mockApiCaller).toBeCalled();
    expect(mockApiCaller.mock.calls[0][0]).toBe('transport.request');
    const { method, path, body } = mockApiCaller.mock.calls[0][1];
    expect(method).toBe('GET');
    expect(path).toBe('_async_search/foo');
    expect(body).toEqual(undefined);
  });

  it('encodes special characters in the path', async () => {
    mockApiCaller.mockResolvedValueOnce(mockAsyncResponse);

    const params = { index: 'foo-程', body: {} };
    const esSearch = enhancedEsSearchStrategyProvider(
      {
        core: mockCoreSetup,
        config$: mockConfig$,
      },
      mockApiCaller,
      mockSearch
    );

    await esSearch.search({ params });

    expect(mockApiCaller).toBeCalled();
    expect(mockApiCaller.mock.calls[0][0]).toBe('transport.request');
    const { method, path } = mockApiCaller.mock.calls[0][1];
    expect(method).toBe('POST');
    expect(path).toBe('foo-%E7%A8%8B/_async_search');
  });

  it('calls the rollup API if the index is a rollup type', async () => {
    mockApiCaller.mockResolvedValueOnce(mockRollupResponse);

    const params = { index: 'foo-程', body: {} };
    const esSearch = enhancedEsSearchStrategyProvider(
      {
        core: mockCoreSetup,
        config$: mockConfig$,
      },
      mockApiCaller,
      mockSearch
    );

    await esSearch.search({ indexType: 'rollup', params });

    expect(mockApiCaller).toBeCalled();
    expect(mockApiCaller.mock.calls[0][0]).toBe('transport.request');
    const { method, path } = mockApiCaller.mock.calls[0][1];
    expect(method).toBe('POST');
    expect(path).toBe('foo-%E7%A8%8B/_rollup_search');
  });
});
