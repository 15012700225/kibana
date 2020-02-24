import React from "react";
import TestRunnerItemList from './test_runner_item_list';
import { left, right } from './utils/either';

export default function CoverageItem({item, currentJobNumber, currentJobTimeStamp, testRunnerTypes, isCurrent}) {
  if (isCurrent) {
    console.log(`\n### currentJobNumber: \n\t${currentJobNumber}`);
    console.log(`\n### currentJobTimeStamp: \n\t${currentJobTimeStamp}`);
  }
  const classes = 'max-w-sm rounded overflow-hidden shadow-lg shadow-2xl';
  return (
    <div className="flex-horizontal-center font-bold text-xl mb-2">
      <div className={(isCurrent) ? `${classes} App-current` : classes}>
          <div className="px-6 py-4 bg-white">
            <div className="font-bold text-xl mb-2">
              {anchor(isCurrent, item)}
            </div>
            <div className="text-gray-700 text-base ">
              <TestRunnerItemList historicalItem={item} testRunnerTypes={testRunnerTypes} />
            </div>
          </div>
      </div>
    </div>
  );
}

function anchor(isCurrent, item) {
  return (<a
    className="App-link"
    href={href(item)}
    target="_blank"
    rel="noopener noreferrer"
  >
    {isCurrent ? 'Current Job' : 'Past Job'} - {title(item)}
  </a>);
}

const dropPrefix = x => [`gs://${x}/jobs/elastic+kibana+code-coverage/`, ''];
const dropPostfix = () => [/(\d.*)\/\d.*$/, '$1'];
const maybeReplace = (item, storeUrlBase) => item.includes(`gs://${storeUrlBase}`) ? right(item) : left(item);

function title (item) {
  const storeUrlBase = 'elastic-bekitzur-kibana-coverage-live';
  return maybeReplace(item, storeUrlBase)
    .fold(
      () => item,
      () => item
        .replace(...dropPrefix(storeUrlBase))
        .replace(...dropPostfix())
    );
}

function href(x) {
  return ['https://console.cloud.google.com/storage/browser/', x.replace('gs://', '')]
    .join('');
}
