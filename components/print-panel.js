AFRAME.registerComponent('print-panel', {
    schema: {
        showel: {type: 'selector'},
        printpanelImg: {type: "string"},
        loadButImg: {type: "string"},
        startButImg: {type: "string"},
        statusOImg: {type: "string"},
        statusCImg: {type: "string"},
        videoId: {type: 'string', default: "#printerVideo"},
        font: {type: 'string'}
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        
        let video = document.querySelector(data.videoId);
        let lab = document.getElementById("lab");
        lab.addEventListener("room-exit",  _ => video.muted = true);
        lab.addEventListener("room-enter",  _ => video.muted = false);
        


        this.addAnimation(el);
        this.startButton = this.createPanel("0.45", "0.16", data.startButImg, "-0.3 -0.03 0.05", "startButton");

        el.addEventListener("click",  _ => {
            this.removeAnimation(el);
            if (this.clicked) return;
            this.clicked = true;
            
            el.classList.remove("interractible");
            el.setAttribute("material", "visible", "false");
        


            // let mainPanel = document.createElement('a-entity');
            // mainPanel.setAttribute("material","shader","flat");
            // mainPanel.setAttribute("geometry","primitive", "plane");
            // mainPanel.setAttribute("geometry","width", "1.3");
            // mainPanel.setAttribute("geometry","height", "1");
            // mainPanel.setAttribute("material","src", data.printpanelimg);
            // mainPanel.setAttribute("material","transparent",0);
            // mainPanel.setAttribute("position","0.3 -0.04 0.1 ");
            // mainPanel.setAttribute('animation__growup', {
            //     property: 'scale',
            //     dur: 500,
            //     from: '0 0 0',
            //     to: '1 1 1'
            // });

          // let videoPanel = document.createElement('a-video');
            // videoPanel.setAttribute("src", data.videoId);
            // videoPanel.setAttribute("id","videoPanel");
            // videoPanel.setAttribute("width", "0.6");
            // videoPanel.setAttribute("height", "0.3375");
            // videoPanel.setAttribute("material","src", data.printpanelimg);
            // videoPanel.setAttribute("material","transparent",0);
            // videoPanel.setAttribute("position","0.341 0.228 0.01 ");
            // videoPanel.setAttribute('animation__growup', {
            //     property: 'scale',
            //     dur: 500,
            //     from: '0 0 0',
            //     to: '1 1 1'
            // });

            let mainPanel = this.createPanel("1.3","1",data.printpanelimg, "0.3 -0.04 0.1");
            el.appendChild(mainPanel); 

            this.statusPanel = this.createPanel("0.336", "0.08", data.statusCImg, "-0.4 0.28 0.03", "statusPanel");
            mainPanel.appendChild(this.statusPanel);

            let loadButton = this.createPanel("0.45", "0.16", data.loadButImg, "-0.3 0.119 0.05", "loadButton");
            loadButton.classList.add('interractible');
            this.addAnimation(loadButton);
            mainPanel.appendChild(loadButton);


            // this.startButton = this.createPanel("0.45", "0.16", data.startButImg, "-0.3 -0.03 0.05", "startButton");
            // startButton.classList.add('interractible');
            this.startButton.setAttribute("visible", false);

            this.addAnimation(this.startButton);
            mainPanel.appendChild(this.startButton);


            this.percentText = this.createText(mainPanel, "percentText", "#0ff", "-0.3 -0.275 0.02", "0%");
  

            let videoPanel = this.createPanel("0.425", "0.3375", data.videoId, "0.341 0.228 0.01", "videoPanel");

            mainPanel.appendChild(videoPanel); 

            el.setAttribute('video-player-hls', {
                onPlay: "printer-video-start",
                onPause: "printer-video-pause",
                video: data.videoId,
                startLevel: 0
            });

            el.emit("printer-video-start");

            let password = el.sceneEl.components['room-manager'].password;

            loadButton.addEventListener("click",  _ => {
                if (password == "print"  && this.status  == "idle") {
                    startButton.setAttribute("visible", true);
                    startButton.classList.add('interractible');
                    loadButton.classList.remove('interractible');
                }
                data.showel.setAttribute("visible", true);        
                
            });


            this.startButton.addEventListener("click",  _ => {
                if (this.status  != "idle") return;
                console.log("Пошла печать");
                startButton.setAttribute("visible", false);
                // this.statusPanel.setAttribute("material","src", data.statusCImg);
                startButton.classList.remove('interractible');
            });







        });
    

 
    
    },

    createPanel: function(width, height, image, position, id){

        let panel = document.createElement('a-entity');
        panel.setAttribute("material","shader","flat");
        if (id) panel.setAttribute("id", id);
        panel.setAttribute("geometry","primitive", "plane");
        panel.setAttribute("geometry","width", width);
        panel.setAttribute("geometry","height", height);
        panel.setAttribute("material","src", image);
        panel.setAttribute("material","transparent",0);
        panel.setAttribute("material","alphaTest",0.3);
        panel.setAttribute("position", position);
        panel.setAttribute('animation__growup', {
            property: 'scale',
            dur: 500,
            from: '0 0 0',
            to: '1 1 1'
        });
        return panel;
    },

    createText: function(el, tclass, color, position, value) {
        let text = document.createElement('a-entity');
        text.setAttribute("text", {
                    value: value,
                    font: this.data.font,
                    negate: false,
                    color: color,
                    wrapCount: 30,
                    align: 'center'
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

    },

    
    addAnimation: function(item)
    {
        item.setAttribute('animation__mouseenter', {
            property: 'scale',
            startEvents: 'mouseenter',
            dur: 200,
            to: '1.1 1.1 1.1'
          });
        
        item.setAttribute('animation__mouseleave', {
            property: 'scale',
            startEvents: 'mouseleave',
            dur: 200,
            to: '1 1 1'
          });

        // item.setAttribute('animation__growup', {
        //     property: 'scale',
        //     dur: 1000,
        //     from: '0 0 0',
        //     to: '1 1 1'
        // });

    },

    removeAnimation: function(item)
    {
        item.setAttribute('animation__mouseenter', {
            property: 'scale',
            startEvents: 'mouseenter',
            dur: 0,
            to: '1 1 1'
          });
        


    },

    checkStatus: function(status) {
        this.status = status;
        // this.status ="huyatus";
        console.log("status", this.status);
        this.statusPanel.setAttribute("material","src", status != "idle" ? this.data.statusCImg : this.data.statusOImg);
        
    },

    getProgress: function(value) {
        this.percentText.setAttribute("text","value",value + "%")
    }


});