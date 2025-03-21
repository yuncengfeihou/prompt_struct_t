import { pluginAPI_t } from '../../../pluginAPI.js';

const PLUGIN_NAME = "prompt-struct-logger";

/** @type {pluginAPI_t} */
const plugin = {
    info: {
        '': {
            name: "Prompt Struct Logger",
            avatar: "",
            description: "一个用于记录和显示 prompt_struct_t 数据的插件，用于调试目的。",
            description_markdown: "一个用于记录和显示 `prompt_struct_t` 数据的插件，用于调试目的。",
            version: "1.0.0",
            author: "你的名字",
            homepage: "",
            issuepage: "",
            tags: []
        }
    },
    Init: () => {
        console.log(`[${PLUGIN_NAME}] 初始化插件.`);
    },
    Load: () => {
        console.log(`[${PLUGIN_NAME}] 加载插件.`);
    },
    Unload: (reason) => {
        console.log(`[${PLUGIN_NAME}] 卸载插件. 原因: ${reason}`);
    },
    Uninstall: (reason, from) => {
        console.log(`[${PLUGIN_NAME}] 卸载插件. 原因: ${reason}, 来源: ${from}`);
    },
    interfaces: {
        chat: {
            ReplyHandler: async (reply, args) => {
                try {
                    console.log(`[${PLUGIN_NAME}] ReplyHandler 被调用.`);
                    if (!args || !args.prompt_struct) {
                        console.error(`[${PLUGIN_NAME}] 错误: prompt_struct 未定义.`);
                        return false; // 插件未处理回复
                    }

                    console.log(`[${PLUGIN_NAME}] 尝试序列化并输出 prompt_struct_t 数据到控制台...`);
                    const promptStructData = JSON.stringify(args.prompt_struct, null, 2);
                    console.log(`[${PLUGIN_NAME}] prompt_struct_t 数据:`, promptStructData);
                    console.log(`[${PLUGIN_NAME}] prompt_struct_t 数据输出完成.`);

                    return false; // 插件未修改回复，继续正常流程
                } catch (error) {
                    console.error(`[${PLUGIN_NAME}] ReplyHandler 中发生错误:`, error);
                    return false; // 发生错误，插件未处理回复
                }
            }
        }
    }
};

export default plugin;
