const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign2.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Campaign2.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Campaign2.sol'
];

fs.ensureDirSync(buildPath); //create build directory if it does not exist yet

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
