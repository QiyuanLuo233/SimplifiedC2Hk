import fs from 'fs';
import path from 'path';
import opencc from 'node-opencc';

// 本地文件夹路径
const folderPath = 'path://';

// 简体到繁体的转换函数
async function convertToTraditional(simplifiedText) {
    const config =  {
        "name": "s2hk.json",
        "path": "data/config/s2hk.json",
        "sha": "fcaa017eeee74dac3ea50f752e36eb2a59e88f63",
        "size": 507,
        "url": "https://api.github.com/repos/BYVoid/OpenCC/contents/data/config/s2hk.json?ref=master",
        "html_url": "https://github.com/BYVoid/OpenCC/blob/master/data/config/s2hk.json",
        "git_url": "https://api.github.com/repos/BYVoid/OpenCC/git/blobs/fcaa017eeee74dac3ea50f752e36eb2a59e88f63",
        "download_url": "https://raw.githubusercontent.com/BYVoid/OpenCC/master/data/config/s2hk.json",
        "type": "file",
        "_links": {
            "self": "https://api.github.com/repos/BYVoid/OpenCC/contents/data/config/s2hk.json?ref=master",
            "git": "https://api.github.com/repos/BYVoid/OpenCC/git/blobs/fcaa017eeee74dac3ea50f752e36eb2a59e88f63",
            "html": "https://github.com/BYVoid/OpenCC/blob/master/data/config/s2hk.json"
        }
    }
    return opencc.simplifiedToTraditional(simplifiedText, config);
}

// 递归读取文件夹中的文件并处理
function processFiles(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error stating file:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    processFiles(filePath); // 递归处理子文件夹
                } else if (stats.isFile()) {
                    fs.readFile(filePath, 'utf8', async (err, data) => {
                        const filePathArr = filePath.split('.')
                        const suffix = filePathArr[filePathArr.length-1]
                        if (err || ['png', 'jpg', 'gif', 'svg', 'ttf', 'woff', 'woff2', 'eot','jar','swf'].includes(suffix)) {
                            console.error('Error reading file:', err, suffix);
                            return;
                        }
                        const traditionalText = await convertToTraditional(data);
                        fs.writeFile(filePath, traditionalText, 'utf8', err => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                            console.log(`File ${filePath} ${suffix} processed successfully.`);
                        });
                    });
                }
            });
        });
    });
}

// 开始处理文件夹中的文件
processFiles(folderPath);