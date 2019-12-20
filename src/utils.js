const chalk = require('chalk')

/**
 * 错误输出
 * @param {string} msg
 */
function error(msg) {
  console.error(chalk.red(msg))
  process.exit(1)
}

/**
 * 正确输出
 * @param {string} msg 
 */
function success(msg) {
  console.log(chalk.green(msg))
  process.exit(1)
}

module.exports = {
  error,
  success
}
