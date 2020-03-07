AFRAME.registerComponent('teleport', {
    schema: {
      room: { default: "agro" },
      rig: {type: 'selector', default: "#cameraRig"}
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        let rooms = document.getElementsByClassName("room");


        this.el.addEventListener("mouseenter", _ => {
            el.setAttribute("material","opacity", 0.4);
        });

        
        el.addEventListener("mouseleave", _ => {
                el.setAttribute("material","opacity", 0.1);

         });

        el.addEventListener("click", _ => {
            
            console.log(data.rig);

            for(let i=0; i<rooms.length; i++)
            {
                if (rooms[i].id == data.room)
                {
                    rooms[i].setAttribute("visible", "true");
                    // points[i].classList.remove("interractible");
                    continue;
                }
                rooms[i].setAttribute("visible", "false");
                // points[i].classList.add("interractible");
            }
            data.rig.setAttribute("position", "0 0 0");
            data.rig.setAttribute("rotation", "0 0 0");
        
        });
    
    },


});