AFRAME.registerComponent('change-region', {
    schema: {
      map: {type: 'selector'},
      number: { default: 1 }
    
    },

    init: function () {
        let data = this.data;
        let map = this.data.map;
        let number = data.number;
        let currAttribute = map.getAttribute("src");
        var rightPanels = [];
        for(let i=0; i<3; i++)
        {
            rightPanels.push(document.getElementById("r"+i));
        }
        console.log(rightPanels);

        this.el.addEventListener("mouseenter", evt => {
            // if (map.getAttribute("src") == "#map" + number)
            //     return;
            map.setAttribute("src","#map"+number);
            map.emit("up");
        });

        
        this.el.addEventListener("mouseleave", evt => {
            map.setAttribute("src", currAttribute);
            map.emit("down");
        });

        this.el.addEventListener("click", evt => {
            console.log("c", currAttribute);
            // if (map.getAttribute("src") == "#map" + number)
            //     return;
            map.setAttribute("src", "#map"+number);
            currAttribute = "#map" + number;
            map.emit("fastdown");
            rightPanels.forEach(e => {
                e.emit("tozero");
                e.emit("scaleev");
            });
        
        });
    
    },


});