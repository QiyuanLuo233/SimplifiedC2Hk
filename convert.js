import fs from 'fs';
import path from 'path';
import opencc from 'node-opencc';
// 本地文件夹路径
const folderPath = './test';
// const folderPath = 'path://';
const transType = 's2t'

// 简体到香港繁体的转换函数
async function convertToTraditional(text,type) {
    
    
     // ==================> https://api.github.com/repositories/776621/contents/data/config

    // const config = {
    //     "name": "s2t.json",
    //     "path": "data/config/s2t.json",
    //     "sha": "87516acbdd37cbe76de2c24eea918611d22f9b4d",
    //     "size": 406,
    //     "url": "https://api.github.com/repos/BYVoid/OpenCC/contents/data/config/s2t.json?ref=master",
    //     "html_url": "https://github.com/BYVoid/OpenCC/blob/master/data/config/s2t.json",
    //     "git_url": "https://api.github.com/repos/BYVoid/OpenCC/git/blobs/87516acbdd37cbe76de2c24eea918611d22f9b4d",
    //     "download_url": "https://raw.githubusercontent.com/BYVoid/OpenCC/master/data/config/s2t.json",
    //     "type": "file",
    //     "content": "ewogICJuYW1lIjogIlNpbXBsaWZpZWQgQ2hpbmVzZSB0byBUcmFkaXRpb25h\nbCBDaGluZXNlIiwKICAic2VnbWVudGF0aW9uIjogewogICAgInR5cGUiOiAi\nbW1zZWciLAogICAgImRpY3QiOiB7CiAgICAgICJ0eXBlIjogIm9jZDIiLAog\nICAgICAiZmlsZSI6ICJTVFBocmFzZXMub2NkMiIKICAgIH0KICB9LAogICJj\nb252ZXJzaW9uX2NoYWluIjogW3sKICAgICJkaWN0IjogewogICAgICAidHlw\nZSI6ICJncm91cCIsCiAgICAgICJkaWN0cyI6IFt7CiAgICAgICAgInR5cGUi\nOiAib2NkMiIsCiAgICAgICAgImZpbGUiOiAiU1RQaHJhc2VzLm9jZDIiCiAg\nICAgIH0sIHsKICAgICAgICAidHlwZSI6ICJvY2QyIiwKICAgICAgICAiZmls\nZSI6ICJTVENoYXJhY3RlcnMub2NkMiIKICAgICAgfV0KICAgIH0KICB9XQp9\nCg==\n",
    //     "encoding": "base64",
    //     "_links": {
    //         "self": "https://api.github.com/repos/BYVoid/OpenCC/contents/data/config/s2t.json?ref=master",
    //         "git": "https://api.github.com/repos/BYVoid/OpenCC/git/blobs/87516acbdd37cbe76de2c24eea918611d22f9b4d",
    //         "html": "https://github.com/BYVoid/OpenCC/blob/master/data/config/s2t.json"
    //     }
    // }  
    return opencc[type](text);
}

// 递归读取文件夹中的文件并处理
async function  processFiles(folderPath,transType) {
    let type = 'simplifiedToTraditional'
    if(transType){
        let obj = {
            't2s':'traditionalToSimplified',
            's2t':'simplifiedToTraditional',
        }
        type = obj[transType]
    }
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
                        const traditionalText = await convertToTraditional(data,type);
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
processFiles(folderPath,transType);