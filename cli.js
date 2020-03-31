#!/usr/bin/env node

(() => {
  try {
    require("./lib").exec(process);
  } catch (error) {
    process.stdout.write(`${error}\n`);
  }
})();
