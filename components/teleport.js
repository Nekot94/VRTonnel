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
 
        el.sceneEl.components['room-manager'].changeRoom(data.room, data.position, data.rotation);
        history.replaceState( {} , '', '#' + data.room);
        
        });
    
    },


});