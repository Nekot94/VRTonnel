AFRAME.registerComponent('change-region', {
    schema: {
      map: {type: 'selector', default:"#map"},
      number: { default: 1 }
    
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        let map = this.data.map;
        let number = data.number;
        let currAttribute = map.getAttribute("src");
        var rightPanels = [];
        var points = document.getElementsByClassName("point");
        
        for(let i=0; i<3; i++)
        {
            rightPanels.push(document.getElementById("r"+i));
        }



        this.el.addEventListener("mouseenter", evt => {

            currAttribute = map.getAttribute("src");
            map.setAttribute("src","#map"+number);
            // map.emit("up");
            el.emit("up");
        });

        
        this.el.addEventListener("mouseleave", evt => {
            map.setAttribute("src", currAttribute);
            // map.emit("down");
            el.emit("down");
        });

        this.el.addEventListener("click", evt => {

            map.setAttribute("src", "#map"+number);
            // el.setAttribute("src", "#pointn");
            currAttribute = "#map" + number;
            // map.emit("fastdown");
            el.emit("fastdown");
            for(let i=0; i<3; i++)
            {
                rightPanels[i].emit("tozero");
                rightPanels[i].emit("scaleev");
                rightPanels[i].setAttribute("src", "#r"+ i + number);
            }

            for(let i=0; i<points.length; i++)
            {
                if (i == number - 1)
                {
                    points[i].setAttribute("material", "src", "#pointa");
                    // points[i].classList.remove("interractible");
                    continue;
                }
                points[i].setAttribute("material", "src", "#pointn");
                // points[i].classList.add("interractible");
            }
        
        });
    
    },


});