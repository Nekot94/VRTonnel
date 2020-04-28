AFRAME.registerComponent('print-panel', {
    schema: {
        showel: {type: 'selector'},
        printpanelImg: {type: "string"},
        loadButImg: {type: "string"},
        startButImg: {type: "string"},
        statusOImg: {type: "string"},
        statusCImg: {type: "string"},
        videoId: {type: 'string', default: "#printerVideo"}
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        console.log("psh",data.loadButImg, data.startButImg, data.statusCImg, data.statusOImg);
        this.addAnimation(el);

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

            let statusPanel = this.createPanel("0.336", "0.08", data.statusOImg, "-0.4 0.28 0.03", "statusPanel");
            mainPanel.appendChild(statusPanel);

            let loadButton = this.createPanel("0.45", "0.16", data.loadButImg, "-0.3 0.119 0.05", "loadButton");
            loadButton.classList.add('interractible');
            this.addAnimation(loadButton);
            mainPanel.appendChild(loadButton);


            let startButton = this.createPanel("0.45", "0.16", data.startButImg, "-0.3 -0.03 0.05", "startButton");
            // startButton.classList.add('interractible');
            startButton.setAttribute("visible", false);

            this.addAnimation(startButton);
            mainPanel.appendChild(startButton);


  

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
                if (password == "print") {
                    startButton.setAttribute("visible", true);
                    startButton.classList.add('interractible');
                }
                data.showel.setAttribute("visible", true);        
                loadButton.classList.remove('interractible');
            });


            startButton.addEventListener("click",  _ => {
                console.log("Пошла печать");
                startButton.setAttribute("visible", false);
                statusPanel.setAttribute("material","src", data.statusCImg);
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
        panel.setAttribute("material","alphaTest",0.1);
        panel.setAttribute("position", position);
        panel.setAttribute('animation__growup', {
            property: 'scale',
            dur: 500,
            from: '0 0 0',
            to: '1 1 1'
        });
        return panel;
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
        


    }


});