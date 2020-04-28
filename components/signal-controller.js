AFRAME.registerComponent('signal-controller', {
    schema: {
      url: {type: 'string'},
    },
    init: function () { 

        // let agroController = document.getElementById("agro").components['agro-controller'];
        // console.log("ag",agroController);
        // this.connection = new signalR.HubConnectionBuilder().withUrl(this.data.url).build();
        // connection.on("ReceiveMessage", (user, message) => {
        //     console.log("tpmsg", message);
        //     agroController.changeCapsuleData(message);


        // });
        // this.connection.start();
        
    }
});