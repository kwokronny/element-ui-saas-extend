---
sidebarDepth: 0
---
# 更新日志

## 1.0.29 <small>2022-04-24</small>
- #### 修复
	- FormAuto 
		- select 的回显选项在清空或 刷新Options 时清空
		- datetimerange 增加默认 defaultTime 属性
		- check 的全选与选项样式问题

## 1.0.28 <small>2022-03-18</small>
- #### 修复
	- FormAuto 方法 refreshOptions 在部分情况下未触发。

## 1.0.27 <small>2022-03-08</small>
- #### 修复
	- FormAuto 
		- validate函数 try/catch 无效问题
		- select 无数据时刷新数据问题及清空选项时刷新数据问题修复

## 1.0.26 <small>2022-03-07</small>
- #### 新增
	- FormAuto 增加 refreshOptions 方式，可用于联动更新选项
	
- #### 优化
	- FormAuto 优化实现 select 组件 loadScroll 滚动加载

## 1.0.25 <small>2022-03-01</small>
- #### 新增
	- TablePage 支持`<el-table>`的 expand 展开行功能
	
- #### 优化
	- FormAuto 
		- vaildate 功能优化
		- select 远程搜索无数据时再次展开选项时，重置远程搜索关键词

- #### 修复
	- NumberRange 
		- 部分文案错误
		- 非数字导致回值问题


## 1.0.24 <small>2022-01-20</small>
- #### 新增
	- FormAuto vaildateField功能
- #### 优化
	- FormAuto type:hidden下样式
- #### 修复
	- TablePage 移除挂载时选中回显功能

## 1.0.22 <small>2021-12-28</small>
- #### 新增
	- TablePage 搜索前验证筛选项
- #### 优化
	- FormAuto loadScroll 分页优化
- #### 修复
	- FormAuto `type=timerange` 默认值问题
	- TablePage 自定义列是否应用缓存逻辑

## 1.0.21 <small>2021-12-22</small>
- #### 修复
	- FormAuto
		- model赋值问题
		- check全选回显问题
		- 优化switch默认值问题

## 1.0.20 <small>2021-12-22</small>
- #### 修复
	- FormAuto 多项选择框回显类型问题
	- TablePage
		- 自定义列无效问题
		- 自定义列导致 Enum 功能失效问题

## 1.0.19 <small>2021-12-15</small>

- #### 新增
	- 添加 `v-copy` 指令
	- FormAuto
		- `type:select` 开启 `remote` 时支持开启 `loadScroll` 实现滚动分页加载

- #### 优化
	- FormAuto
		- 优化 `type:select` 开启 remote 时的回显逻辑
	- TablePage
		- 支持已选择行回显
		- `request` 支持返回值为数组时隐藏分页组件
		- 缓存的自定义列数据与 `columns` 配置有差异时不采用
		- 优化自定义列显隐操作交互

- #### 修复
	- 修复一些小问题


## 1.0.15 <small>2021-10-21</small>
- #### 优化
	- TablePage
		- 在组件完成对 columns 处理后触发搜索请求。

- #### 修复
	- FormAuto
		- 解决启用 `suffixTime` 导致的日期拼合错误。

## 1.0.14 <small>2021-10-21</small>
- #### 新增
	- 支持国际化：简体中文、英语。

- #### 优化
	- 按需引入 `lodash`，减少包体积

- #### 修复
	- FormAuto
		- 更新 model 无效BUG。
		- `type:select` 中选项 disabled 未生效。
		- 重置表单偶现async-validator触发报错。
		- 修改表单Prop[data]时部分值被清空。
	- TablePage 
		- 自定义列调整未保存关闭窗口后重新打开应该恢复打开前的数据。

## 1.0.12 <small>2021-09-27</small>
- #### 修复
	- TablePage 切换 pageSize 问题。

## 1.0.11 <small>2021-09-27</small>
- #### 优化
	- 调整 全局组件变量 结构 

- #### 修复
	- 解决 TablePage 组件切换 pageSize 无效问题

## 1.0.10 <small>2021-09-26</small>

- #### 修复
	- 解决 FormAuto 组件中 `<el-cascader>` 属性 options 无法支持异步获取

## 1.0.9 <small>2021-09-11</small>

- #### 修复
	- 解决 FormAuto 组件中 bindShow 时 布局 `<el-col>` 未跟着隐藏问题😭

## 1.0.8 <small>2021-09-11</small>

- #### 优化
	- NumberRange 组件clearable清空后，按element-ui设计，值为空

- #### 修复
	- 解决 FormAuto 组件中 范围 相关的输入框被清空后，按element-ui设计，将rangeName对应值设为`Null`，以便后端接收置空

## 1.0.7 <small>2021-09-06</small>

- #### 修复
	- 解决 TablePage enum 异常参数报错问题

## 1.0.6 <small>2021-09-03</small>
- #### 优化	
	- TablePage 自定义列及重置逻辑
	- TablePage enum 属性赋值方式优化，与 FormAuto 保持一致

- #### 修复
	- FormAuto 组件clearable无法设置为false问题
	- FormAuto 组件部分验证规则问题
	- types 修复 TablePage 声明
	
## 1.0.5 <small>2021-09-01</small>
- #### 优化
	- FormAuto 组件初始化回显问题，及重置未重置options请求
- #### 修复
	- FormAuto 组件 reset 重置表单不彻底
	- FormAuto 组件部分验证规则问题
	- types 优化 FormAuto 声明

## 1.0.4 <small>2021-08-29</small>
- #### 新增
	- FormAuto 针对远程检索获取选项的 select 组件在编辑时的已选回显

- #### 修复
	- FormAuto 组件正则兼容问题导致 safari 无法打开

## 1.0.3 <small>2021-08-25</small>
- #### 新增
	- TablePage 组件增加 prop 属性 `button-style` 为组件默认按钮样式提供一定的定制自由度
	- 组件全局 options 增加属性 `button-style` 和 `page-layout` 增加一定的主题定制自由度

- #### 修复
	- FormAuto 组件因 select等 输入框支持 number 值但async-validator无法正常验证，组件转换了类型导致的编辑 v-model 时值未对应选项问题。

## 1.0.2 <small>2021-08-24</small>
- #### 新增
	- TablePage 组件增加 prop 属性 `layout-type` 增加一定的主题定制自由度
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