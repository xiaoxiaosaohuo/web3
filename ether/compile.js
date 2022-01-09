const fs = require("fs");
const solc = require("solc");
const path = require("path");

// template to compile contract
const CONTRACTS_LOC = "../contracts";

function compile(contractName, fileName) {
  const content = fs
    .readFileSync(path.join(__dirname, CONTRACTS_LOC, fileName))
    .toString();

  const input = {
    language: "Solidity",
    sources: {
      [fileName]: { content },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["evm.bytecode.object", "abi"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (output.errors && output.errors.length > 0) {
    const messages = output.errors
      .map((x) => x.formattedMessage)
      .reduce((p, c) => p + "\n" + c, "");
    throw new Error(messages);
  }

  const {
    evm: {
      bytecode: { object: bytecode },
    },
    abi,
  } = output.contracts[fileName][contractName];

  return { bytecode, abi };
}

module.exports = compile;
