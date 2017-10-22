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
        var x1 = $('#input1_x1').value;
        var y1 = $('#input1_y1').value;
        var x2 = $('#input1_x2').value;
        var y2 = $('#input1_y2').value;
        run(x1, y1, x2, y2, '1.png', function (text) {
            writeText('output1', text);
        });

        var x1 = $('#input2_x1').value;
        var y1 = $('#input2_y1').value;
        var x2 = $('#input2_x2').value;
        var y2 = $('#input2_y2').value;
        run(x1, y1, x2, y2, '2.png', function (text) {
            writeText('output2', text);
        });
    });
});