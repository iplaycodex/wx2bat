# wx2bat
✨微信小程序一键转为百度,支付宝,今日头条小程序

## install

```
npm i -g wx2bat
```

## how to use

```
wx2bat <wechatAppPath> <outputPath> <platformName>
```

- wechatApp 微信小程序绝对路径
- distApp 目标平台输出路径
- platform 目标小程序平台名:baidu,alipay,toutiao

## warning

这个工具并不能百分百帮你把`微信小程序`无痛转为`XX小程序`,因为平台的差异性天然存在.但是其他家小程序的 `api` 百分之 90 和微信差不多,所以一般转换完毕以后修修改改就可以直接跑起来了.然后在转换后的代码上进行二次开发,修改一些平台专有 `api`,例如:授权登录,支付...
