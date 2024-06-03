
var socket = io("http://localhost:3080");



var readUserMsg = () => {
    var msg = $("#userMsg").val();
    renderMsgToBlock(msg, 'sendMsg')
}
var renderMsgToBlock = (msg, type) => {
    var divTag =  $("<div/>").text(msg);
    switch(type) {
        case 'sendMsg':
            divTag.addClass("sendMsg")
            break;
        case 'receiving' :
            divTag.addClass('receiveMsg')
            break;
    }
    $(".msgBlock").append(divTag);
}