AFRAME.registerComponent('agro-controller', {
    schema: {
      url: {type: 'string'},
    },
    init: function () {
        let data = this.data;
        let el = this.el;
        console.log("hups", data.url);

    var connection = new signalR.HubConnectionBuilder().withUrl("https://reutov3.bdprog.ru/staticAgro").build();
    

    connection.on("ReceiveMessage", function (user, message) {
        console.log("tpmsg", message);
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        console.log("msg",encodedMsg);
        // var li = document.createElement("li");
        // li.textContent = encodedMsg;
        // document.getElementById("messagesList").appendChild(li);
    });


    connection.start();

    
    }
});