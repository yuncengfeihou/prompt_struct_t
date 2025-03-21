import { eventSource, event_types } from "../../../../script.js";

const extensionName = "prompt-logger"; // 插件文件夹名称

console.log(`[${extensionName}] 插件开始加载.`);

eventSource.on(event_types.CHAT_COMPLETION_PROMPT_READY, async (event) => {
    try {
        console.log(`[${extensionName}] 捕获到 ${event_types.CHAT_COMPLETION_PROMPT_READY} 事件.`);
        if (!event || !event.prompt_struct) {
            console.error(`[${extensionName}] 错误: 事件对象或 prompt_struct 缺失.`);
            console.error(`[${extensionName}] 事件详情:`, event);
            return; // 退出事件处理，防止后续代码报错
        }

        const promptStruct = event.prompt_struct;

        if (!promptStruct) {
            console.error(`[${extensionName}] 错误: prompt_struct 为空.`);
            return; // 退出事件处理，防止后续代码报错
        }

        console.log(`[${extensionName}] prompt_struct 数据:`);
        console.log(JSON.stringify(promptStruct, null, 2)); // 使用 JSON.stringify 格式化输出，缩进为 2 个空格

        console.log(`[${extensionName}] 成功输出 prompt_struct 数据到控制台.`);

    } catch (error) {
        console.error(`[${extensionName}] 发生错误:`, error);
        console.error(`[${extensionName}] 错误类型:`, error.name); // 输出错误类型
        console.error(`[${extensionName}] 错误信息:`, error.message); // 输出更详细的错误信息
        if (error.stack) {
            console.error(`[${extensionName}] 错误堆栈:`, error.stack); // 输出错误堆栈信息，方便追踪错误源头
        }
    }
});

console.log(`[${extensionName}] 插件完成加载，并已注册 ${event_types.CHAT_COMPLETION_PROMPT_READY} 事件监听器.`);
