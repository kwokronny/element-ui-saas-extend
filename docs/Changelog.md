---
sidebarDepth: 0
---

# 更新日志

## 1.0.2 <small>2021-08-24</small>
- #### 新增
	- TablePage 组件增加 prop 属性 `layout-type` 和 `button-type` 增加一定的主题定制自由度
	- TablePage 组件增加 getParams 函数以获取搜索项参数
	- FormAuto 组件增加 `radiobutton` 单选框按钮的输入类型

- #### 修复
	- FormAuto 与 TablePage 对 `options` 或 `enum` 适配转换问题

## 1.0.1 <small>2021-08-23</small>
- #### 修复
	- types 修复 table-page 组件声明问题
	- types 优化 vue 后缀声明module

## 1.0.0 <small>2021-08-07</small>
- #### 新增
	- FormAuto 组件增加 type可选值 完善日期选择器多种选择方式
- #### 修复
	- 修复 TypeScript 引用时声明文件问题报错

## 1.0.0-beta.2 <small>2021-08-02</small>
- #### 修复
	- 修复package.json疏漏问题

## 1.0.0-beta.1 <small>2021-08-02</small>
- #### 优化
	- 升级打包脚本
- #### 修复
	- 修复因用 vue-property-decorator 装饰器 构建后导致的 组件name 值错误无法使用问题

	## 1.0.0-beta <small>2021-08-01</small>
- #### 新增
	- 新增 FormAuto 组件
	- 新增 NumberRange 组件
	- 新增 TablePage 组件