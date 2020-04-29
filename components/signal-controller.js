AFRAME.registerComponent('signal-controller', {
    schema: {
      url: {type: 'string'},
    },
    init: function () { 

        let agroController = document.getElementById("agro").components['agro-controller'];
        let printController = document.getElementById("main-printer").components['print-panel'];
        // console.log("prr",agroController, printController);
        let connection = new signalR.HubConnectionBuilder().withUrl(this.data.url).build();
        connection.on("ReceiveMessage", (user, message) => {
            console.log("tpmsg", message);
            if (user == "Reutow") {
              let mes = message.replace(/"/g,'')
              let mesAr = mes.split(": ");
              if (mesAr[0] == "running_status") printController.checkStatus(mesAr[1]);
              if (mesAr[0] == "print_progress") printController.getProgress((Math.round(mesAr[1] * 10) / 10).toFixed(1));
            }
            if (user == "Agro" || user == "Agror") agroController.changeCapsuleData(message);


        });

 
        
        connection.start().then(_=>{
           connection.invoke('gethistory'); 
           printController.startButton.addEventListener("click",  _ => {
            if (printController.status  != "idle") return;
            console.log("Gooo");
            connection.invoke("SendMessage", "Web", "startPrinter").catch(function (err) {
              return console.error(err.toString());
            });
          });
  
       });
        
    }
});