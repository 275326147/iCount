var robot = require("robotjs");

var $ = function (selector) {
    return document.querySelector(selector);
}

function writeText(id, text) {
    var element = $("#" + id);
    element.innerHTML = text;
};

document.addEventListener('DOMContentLoaded', function () {

    setInterval(function () {
        var pos = robot.getMousePos();
        writeText('position', `当前坐标： x(${pos.x}) ,  y(${pos.y})`);
    }, 500);

    $('#btn1').addEventListener('click', function (event) {
        capture(function () {
            run($('#input1_x1').value, $('#input1_y1').value, $('#input1_x2').value, $('#input1_y2').value,
                '1.png',
                function (text) {
                    writeText('output1', text);
                });

            run($('#input2_x1').value, $('#input2_y1').value, $('#input2_x2').value, $('#input2_y2').value,
                '2.png',
                function (text) {
                    writeText('output2', text);
                });
        });
    });

    $('#btn2').addEventListener('click', function (event) {
        var x = $('#input3_x').value;
        var y = $('#input3_y').value;
        var content = $('#input3_content').value;
        var double = $('#input3_count').value > 1 ? true : false;
        var key = $('#input3_key').value;
        robot.moveMouse(parseInt(x), parseInt(y));
        robot.mouseClick("left", double);
        setTimeout(function () {
            robot.typeString(content);
            robot.keyTap(key);
        }, 1000);
    });
});