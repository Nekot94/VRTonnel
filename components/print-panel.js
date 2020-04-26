AFRAME.registerComponent('print-panel', {
    schema: {
        showel: {type: 'selector'},
        printpanelimg: {type: "string"},
        videoId: {type: 'string', default: "#printerVideo"}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener("click",  _ => {

            data.showel.setAttribute("visible", true);
            console.log("data-show", data.showel);
            let mainPanel = document.createElement('a-entity');
            mainPanel.setAttribute("material","shader","flat");
            mainPanel.setAttribute("geometry","primitive", "plane");
            mainPanel.setAttribute("geometry","width", "1.3");
            mainPanel.setAttribute("geometry","height", "1");
            mainPanel.setAttribute("material","src", data.printpanelimg);
            mainPanel.setAttribute("material","transparent",0);
            mainPanel.setAttribute("position","0.3 -0.04 0.1 ");
            mainPanel.setAttribute('animation__growup', {
                property: 'scale',
                dur: 500,
                from: '0 0 0',
                to: '1 1 1'
            });

            el.appendChild(mainPanel); 

            let videoPanel = document.createElement('a-video');
            videoPanel.setAttribute("src", data.videoId);
            videoPanel.setAttribute("id","videoPanel");
            videoPanel.setAttribute("width", "0.6");
            videoPanel.setAttribute("height", "0.3375");
            videoPanel.setAttribute("material","src", data.printpanelimg);
            videoPanel.setAttribute("material","transparent",0);
            videoPanel.setAttribute("position","0.37 0.25 0.01 ");
            videoPanel.setAttribute('animation__growup', {
                property: 'scale',
                dur: 500,
                from: '0 0 0',
                to: '1 1 1'
            });

            el.setAttribute('video-player-hls', {
                onPlay: "printer-video-start",
                onPause: "printer-video-pause",
                video: data.videoId,
            });

            el.emit("printer-video-start");

            mainPanel.appendChild(videoPanel); 



            el.classList.remove("interractible");
            el.setAttribute("material", "visible", "false");



        });
    

 
    
    },

    
    addAnimation: function(item)
    {
        item.setAttribute('animation__mouseenter', {
            property: 'scale',
            startEvents: 'mouseenter',
            dur: 200,
            to: '1.2 1.2 1.2'
          });
        
        item.setAttribute('animation__mouseleave', {
            property: 'scale',
            startEvents: 'mouseleave',
            dur: 200,
            to: '1 1 1'
          });

        item.setAttribute('animation__growup', {
            property: 'scale',
            dur: 1000,
            from: '0 0 0',
            to: '1 1 1'
        });

    }


});