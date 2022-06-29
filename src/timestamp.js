const vscode = require("vscode");

/**
 * 获取光标悬浮指向的内容
 * @params position 当前光标悬浮的位置
 */
function get_text(document, position) {
    let text;

    // 首先判定position是否在selection范围内
    let selection = vscode.window.activeTextEditor.selection;
    if (
        selection.start.line == selection.end.line &&
        selection.contains(position)
    ) {
        text = document.getText(selection);
    }
    // 否则，分析position指向的单词
    else {
        let range = document.getWordRangeAtPosition(position);
        text = document.getText(range);
    }

    return text;
}

/**
 * 对给定的时间戳字符串进行转换
 * @params range 判定为时间戳的数字范围
 * @params text 时间戳字符串
 * @return 对于错误格式的参数，返回空
 */
function convert(range, text) {
    // 分析text是否是纯数字
    if (!/^\d+$/.test(text)) return;
    let time_i = Number(text);

    // 判断是否在范围内
    if (range.min) {
        let num = Number(range.min);
        if (time_i < num) return;
    }

    if (range.max) {
        let num = Number(range.max);
        if (time_i >= num) return;
    }

    // 转换
    let time_s = new Date(time_i * 1000).toLocaleString();
    return time_s;
}

function init(context) {
    vscode.languages.registerHoverProvider("*", {
        async provideHover(document, position) {
            const config = vscode.workspace.getConfiguration(
                "timestamp",
                document.uri
            );

            // 检查是否可用
            if (!config.get("auto")) return;

            // 判断语言是否被启用或禁用
            let language = document.languageId;
            let languages = config.get("languages");

            // 首先排除禁用
            if (languages.disable.indexOf(language) !== -1) return;

            // 对启用的语言做出响应
            if (
                languages.enable.indexOf(language) == -1 &&
                languages.enable.indexOf("*") == -1
            )
                return;

            // 获取选取字
            let text = get_text(document, position);

            // 范围
            let range = config.get("range");

            // 转换
            let data = convert(range, text);
            if (!data) return;

            return new vscode.Hover(`时间戳转换\n\n${text}\n\n${data}`);
        },
    });

    let run = vscode.commands.registerCommand("extension.timestamp", () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        let range = vscode.workspace.getConfiguration(
            "timestamp.range",
            editor.document.uri
        );

        // 获取选取字
        let selection = vscode.window.activeTextEditor.selection;
        let text = editor.document.getText(selection);

        // 转换
        let data = convert(range, text);
        if (!data) {
            vscode.window.showInformationMessage(`${text} 不是时间戳`);
            return;
        }

        // 修改
        editor.edit((editBuilder) => {
            editBuilder.replace(selection, data);
        });
    });

    context.subscriptions.push(run);
}

module.exports = {
    init,
};
