# SimplifiedC2Hk
You can use it to automatically convert Chinese Simplified Chinese to Hong Kong Traditional Chinese in your project

#使用方法
将你的项目路径写在convert.js中的folderPath中，
绝对路径相对路径均可；注意:绝对路径请勿包含中文

processFiles中定义了忽略翻译的文件，例如图片或其他静态文件，按个人需求
增添
一切都ok后运行npm run dev即可完成转换；
数据来源：https://github.com/BYVoid/OpenCC/tree/master/data/dictionary

# 转换策略

SIMPLIFIED_TO_TRADITIONAL(S2T)	简体到繁体
SIMPLIFIED_TO_HONGKONG(S2HK)	简体到香港繁体
SIMPLIFIED_TO_JAPANESE(S2JP)	简体到日文
SIMPLIFIED_TO_TAIWAN(S2TW)	简体到台湾正体
SIMPLIFIED_TO_TAIWAN_WITH_PHRASE(2TWP)	简体到台湾正体, 带词汇本地化
HONGKONG_TO_TRADITIONAL(HK2T)	香港繁体到正体
HONGKONG_TO_SIMPLIFIED(HK2S)	香港繁体到简体
TAIWAN_TO_SIMPLIFIED(TW2S)	台湾正体到简体
TAIWAN_TO_TRADITIONAL(TW2T)	台湾正体到繁体
TAIWAN_TO_SIMPLIFIED_WITH_PHRASE(TW2SP)	台湾正体到简体, 带词汇本地化
TRADITIONAL_TO_HONGKONG(T2HK)	正体到香港繁体
TRADITIONAL_TO_SIMPLIFIED(T2S)	繁体到简体
TRADITIONAL_TO_TAIWAN(T2TW)	繁体到台湾正体
TRADITIONAL_TO_JAPANESE(T2JP)	繁体到日文
JAPANESE_TO_TRADITIONAL(JP2T)	日文到繁体
JAPANESE_TO_SIMPLIFIED(JP2S)	日文到简体
