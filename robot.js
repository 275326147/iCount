var robot = require("robotjs"),
    tesseract = require('node-tesseract'),
    screenshot = require('desktop-screenshot'),
    gm = require('gm');

imageMagick = gm.subClass({
    imageMagick: true
});

/**
 * 屏幕截图
 * @param {*} callback 
 */
function capture(callback) {
    screenshot('screenshot.png', function (error, complete) {
        if (!error) {
            callback();
        }
    });
}

/**
 * 运行任务
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} imgPath 
 * @param {*} callback 
 */
function run(x1, y1, x2, y2, imgPath, callback) {
    //setInterval(function () {
    crop(x1, y1, x2, y2, imgPath, function (msg) {
        recognizer(imgPath).then(text => {
            console.log(`识别结果:${text}`);
            callback(text);
        });
    });
    //}, 1000);
}

/**
 * 截取图片指定区域
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} callback 
 */
function crop(x1, y1, x2, y2, imgPath, callback) {
    imageMagick('screenshot.png').crop(2 * (x2 - x1), 2 * (y2 - y1), (2 * x1), (2 * y1))
        .write(imgPath, function (error, complete) {
            if (!error) {
                callback();
            }
        });
}

/**
 * 识别图片
 * @param imgPath
 * @param options tesseract options
 * @returns {Promise}
 */
function recognizer(imgPath, options) {
    options = Object.assign({ psm: 7 }, options);

    return new Promise((resolve, reject) => {
        tesseract
            .process(imgPath, options, (err, text) => {
                if (err) return reject(err);
                resolve(text.replace(/[\r\n\s]/gm, ''));
            });
    });
}