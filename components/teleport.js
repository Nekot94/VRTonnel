AFRAME.registerComponent('teleport', {
    schema: {
      room: { default: "agro" },
      position: {default: "0 0 0"},
      rotation: {default: "0 0 0"},
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
        //    let cam = data.cam;
        //     console.log(data.rig);
        //     console.log(data.cam.object3D.rotation);

        //     for(let i=0; i<rooms.length; i++)
        //     {
        //         if (rooms[i].id == data.room)
        //         {
        //             rooms[i].setAttribute("visible", "true");
        //             // points[i].classList.remove("interractible");
        //             continue;
        //         }
        //         rooms[i].setAttribute("visible", "false");
        //         // points[i].classList.add("interractible");
        //     }
        //     data.rig.setAttribute("position", data.position);
        //     data.rig.setAttribute("rotation", data.rotation);

        //     cam.setAttribute("look-controls", {enabled:false})
        //     cam.setAttribute("rotation", data.rotation);
        //     var newX = cam.object3D.rotation.x
        //     var newY = cam.object3D.rotation.y
        //     cam.components['look-controls'].pitchObject.rotation.x = newX
        //     cam.components['look-controls'].yawObject.rotation.y = newY
        //     cam.setAttribute("look-controls",{enabled:true})
        console.log(el.sceneEl.components['room-manager'].changeRoom(data.room, data.position, data.rotation));
        
        });
    
    },


});