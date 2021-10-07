---
sidebarDepth: 0
---

# Release Log

## 1.0.13 <small>2021-09-27</small>
## 1.0.12 <small>2021-09-27</small>
- #### Fix
	- component TablePage switch pageSize emit refresh error

## 1.0.11 <small>2021-09-27</small>
- #### Optimization
	- adjust global variable sturcture 

- #### Fix
	- TablePage switch pageSize emit refresh not working

## 1.0.10 <small>2021-09-26</small>

- #### Fix
	- fix FormAuto attribute `type` is `cascader` not supported async get options.

## 1.0.9 <small>2021-09-11</small>

- #### Fix
	- `<el-col>` no hidden when FormAuto use bindShow.

## 1.0.8 <small>2021-09-11</small>

- #### Optimization
	- binding model is `null` after `NumberRange` clear.

- #### Fix
	- binding model value is `null` after FormAuto `type` related to `range` clear.

## 1.0.7 <small>2021-09-06</small>

- #### Fix
	- TablePage `enum` abnormal paramster error

## 1.0.6 <small>2021-09-03</small>
- #### Optimization	
	- optimization TablePage customize column and reset.
	- TablePage attribute `enum` assignment method same of FormAuto `options`.

- #### Fix
	- FormAuto clearable set false not working.
	- FormAuto generate form rule error.
	- Fix TablePage declaration file.
	
## 1.0.5 <small>2021-09-01</small>
- #### Optimization
	- FormAuto type is `select` reproduce selected value when initialization, and reacquire `options` when FormAuto reset.
	- FormAuto TypeScript declaration file.
- #### Fix
	- FormAuto method reset not thorough.
	- FormAuto generate form rule error.

## 1.0.4 <small>2021-08-29</small>
- #### Feature
	- FormAuto type is `select` reproduce selected value for re-modeify.

- #### Fix
	-  safari white page because regex not supported `?!`.

## 1.0.3 <small>2021-08-25</small>
- #### Feature
	- TablePage add attribute `button-style`, add operability for customize theme.
	- global variable add attribute `button-style` an `page-layout`, add operability for customize theme.

- #### Fix
	- async-validator validate failed, when change binding model value no change variable type.

## 1.0.2 <small>2021-08-24</small>
- #### Feature
	- TablePage add attribute `layout-type`, add operability for customize theme.
	- TablePage add method `getParams` to get search form binding model.
	- FormAuto add type `radiobutton`.

- #### Fix
	- fix `options` and `enum` adaptation for FormAuto and TablePage.

## 1.0.1 <small>2021-08-23</small>
- #### Fix
	- fix typescript TablePage declaration error.

## 1.0.0 <small>2021-08-07</small>
- #### Feature
	- FormAuto component add type optional value `week`, `month`, `dates`...
- #### Fix
	- Fix TypeScript declaration file error.

## 1.0.0-beta.2 <small>2021-08-02</small>
- #### Fix
	- Fix package.json omission version update.

## 1.0.0-beta.1 <small>2021-08-02</small>
- #### Fix
	- export component name error when use vue-class-component.

	## 1.0.0-beta <small>2021-08-01</small>
- #### Feature
	- add FormAuto component.
	- add NumberRange component.
	- add TablePage component.