#!/bin/bash

echo "### Ingesting Code Coverage"
echo ""


BUILD_ID=$1
export BUILD_ID

ES_HOST=https://super:changeme@142fea2d3047486e925eb8b223559cae.europe-west1.gcp.cloud.es.io:9243
export ES_HOST

STATIC_SITE_URL_BASE='https://kibana-coverage.elastic.dev'
export STATIC_SITE_URL_BASE

for x in jest functional mocha; do
  echo "### Ingesting coverage for ${x}"

#  COVERAGE_SUMMARY_FILE=target/kibana-coverage/${x}-combined/coverage-summary.json
  COVERAGE_SUMMARY_FILE=temp-target/kibana-coverage/mocha/coverage-summary-fake-${x}.json

  node scripts/ingest_coverage.js --verbose --path ${COVERAGE_SUMMARY_FILE}
done

echo "###  Ingesting Code Coverage - Complete"
echo ""
