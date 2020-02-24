/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from "react";
// import logo from './logo.svg';

export default function Footer () {
  return (
    <header className="App-footer">
      <a
        className="App-link"
        href={gcpLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
       Contact the Kibana QA Team on <span className="font-bold">Slack</span> @ #kibana-qa
      </a>
    </header>
  );
}

function gcpLink () {
  return `
https://console.cloud.google.com/storage/browser/kibana-ci-artifacts/
jobs/elastic+kibana+code-coverage/254/2020-01-29T21-23-03Z/?authuser=1
`;
}
