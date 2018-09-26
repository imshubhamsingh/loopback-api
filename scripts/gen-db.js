/* istanbul ignore next */
/* istanbul ignore next */
/**
 * @file File creates new db file.
 * @author Shubham Singh
 */
const chalk = require('chalk');
const fs = require('fs');

const path = require('path');

const DB_FOLDER_PATH = path.join(__dirname, '..', 'server/db');
const DB_PATH = path.join(DB_FOLDER_PATH, 'data.txt');

if (fs.existsSync(DB_PATH)) {
  process.stdout.write(
    chalk.yellow.bold('📄  Existing DB data found.') +
      chalk.dim(' It will be replaced with a new one\n')
  );
  fs.unlinkSync(DB_PATH);
}

process.stdout.write(chalk.green.bold('   ↪ ✅  Success!\n'));
fs.writeFileSync(DB_PATH, '');
process.exit(0);
