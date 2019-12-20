const path = require('path')
const shell = require('shelljs')
const isDirectory = require('is-directory')
const isAbsolute = require('is-absolute')
const utils = require('./utils')
const makeDir = require('make-dir')

// 检测参数
const argv = process.argv.slice(2)
if (argv.length < 2) {
  utils.error(
    '用法: wx2bat <wechatApp> <distApp> <platform> 可选:[--watch]'
  )
}

let src = argv[0]
let dest = argv[1]
let platform = argv[2]

const cwd = process.cwd()
if (!isAbsolute(src)) {
  src = path.join(cwd, src)
}

if (!isAbsolute(dest)) {
  dest = path.join(cwd, dest)
}

if (!isDirectory.sync(src)) {
  utils.error('参数错误：[' + src + '] 不是目录')
}

if (!isDirectory.sync(dest)) {
  makeDir.sync(dest)
}

if (!platform) {
  utils.error('请输入要转换至的平台:例:baidu,alipay,toutiao');
}

// 执行命令
const otherArgs = argv.slice(3).join(' ')
const gulpfile = path.resolve(__dirname, 'gulpfile.js')
const command = `npx gulp --color --gulpfile ${gulpfile} --src=${src} --dest=${dest} --platform=${platform} ${otherArgs}`
shell.exec(command)
