const vscode = require("vscode");

function init() {
    vscode.languages.registerHoverProvider("*", {
        async provideHover(document) {
            const config = vscode.workspace.getConfiguration(
                "wordcount",
                document.uri
            );

            // 检查是否可用
            if (!config.get("open")) return;

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
            let selection = vscode.window.activeTextEditor.selection;
            let text = document.getText(selection);

            // 排除<xx>yy</xx>标签本身，保留内部yy
            text = text.replace(/<[^>]+>/g, " ");

            // 使用非英文分离
            let items = text.split(/[^a-zA-Z\-]/);
            let cnt = 0;
            items.forEach((_) => {
                if (_) cnt++;
            });

            if (cnt > 0) return new vscode.Hover(`单词数统计\n${cnt}`);
        },
    });
}

module.exports = {
    init,
};
