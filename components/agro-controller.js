AFRAME.registerComponent('agro-controller', {
    schema: {
      url: {type: 'string'},
      agropanelClass: {default: "agropanel"},
      font: {type: 'string'}
    },
    init: function () {
        let data = this.data;
        let el = this.el;
        console.log("hups", data.url);

        let agropanels = document.getElementsByClassName(data.agropanelClass);
        let t, ttl, h, gs;
        let activeT, activeH; //With one capsule
        for(let i=0; i<agropanels.length; i++) {
            ttl = this.createText(agropanels[i], "ttl", "#0ff", "-1.2 1.125 0", "256");
            t = this.createText(agropanels[i], "temperature", "#ff9b48", "0.15 1.125 0", "25");
            h = this.createText(agropanels[i], "humidity", "#0085ff", "-1.2 0.021 0", "99");
            gs = this.createText(agropanels[i], "growspeed", "#ff3366", "0.15 0.021 0", "0.1");
            if (agropanels[i].hasAttribute("active")) {activeT = t; activeH =h; console.log("hhh", activeT, activeH); } //With one capsule
        }


        var connection = new signalR.HubConnectionBuilder().withUrl(data.url).build();
        

        connection.on("ReceiveMessage", function (user, message) {
            let msg = JSON.parse(message);
            // if (!msg) return;
            let temperature = Math.round(msg["Temp"]);
            let humidity = Math.round(msg["Humidity"]);
            console.log("Temp", temperature);
            console.log("Humidity", humidity);
            console.log("tpmsg", message);
        
            activeT.setAttribute("text","value", temperature);
            activeH.setAttribute("text","value", humidity);
            
            
        });


        connection.start();

    
    },

    createText: function(el, tclass, color, position, value) {
        let text = document.createElement('a-entity');
        text.setAttribute("text", {
                    value: value, 
                    font: this.data.font,
                    negate: false,
                    color: color,
                    wrapCount: 6,
                    align: 'right'
                  });
        text.classList.add(tclass);
        text.setAttribute("position",position);
        text.setAttribute('animation__growup', {
            property: 'scale',
            dur: 500,
            from: '0 0 0',
            to: '1 1 1'
        });

        el.appendChild(text);
        return text;

    }
});