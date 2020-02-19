/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
export {
  // Object types
  Agent,
  AgentStatus,
  AgentType,
  AgentEvent,
  AgentAction,
  Datasource,
  NewDatasource,
  AgentConfig,
  NewAgentConfig,
  AgentConfigStatus,
  Output,
  NewOutput,
  OutputType,
  //   EnrollmentAPIKey,
  Installation,
  InstallationStatus,
  PackageInfo,
  VarsEntry,
  Dataset,
  AssetReference,
  ElasticsearchAssetType,
  IngestAssetType,
  RegistryPackage,
  AssetType,
  Installable,
  KibanaAssetType,
  AssetParts,
  AssetsGroupedByServiceByType,
  CategoryId,
  CategorySummaryList,
  RegistrySearchResults,
} from '../../common';

export type AgentConfigUpdateHandler = (
  action: 'created' | 'updated' | 'deleted',
  agentConfigId: string
) => Promise<void>;

export * from './models';
export * from './rest_spec';
