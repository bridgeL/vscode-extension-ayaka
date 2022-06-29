# ayaka README

个人插件，各种各样的功能都有

# Features

## 时间戳转换

### 自动提示

对某个范围的数字自动识别为时间戳并以悬浮提示的形式给出转换后的时间字符串

设置项|值|解释
-|-|-
ayaka.timestamp.auto | ture \| false | 是否开启自动识别
ayaka.timestamp.range.min | string | 范围下限
ayaka.timestamp.range.max | string | 范围上限
ayaka.timestamp.languages.enable | [ str , ... ] | 针对一些语言开启，*为全部
ayaka.timestamp.languages.disable | [ str , ... ] | 针对一些语言禁用

### 右键菜单转换

选取数字，右键菜单点击时间戳转换，将该数字直接转换为时间字符串

## 字数统计（仅英文

<del>统计选取区域中的空格数量（大雾</del>

统计选取区域中的单词数量

设置项|值
-|-
ayaka.wordCount.open | ture \| false
ayaka.wordCount.languages.enable | [ str , ... ] | 针对一些语言开启，*为全部
ayaka.wordCount.languages.disable | [ str , ... ] | 针对一些语言禁用

# Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

# Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

# Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

# Release Notes

Users appreciate release notes as you update your extension.

## 1.0.0

Initial release of ...

## 1.0.1

Fixed issue #.

## 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

# Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
