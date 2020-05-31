AFRAME.registerComponent('teleport', {
    schema: {
      room: { default: "agro" },
      position: {default: "0 0 0"},
      rotation: {default: "0 0 0"},
      noOpacity: {default: false}
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        let rooms = document.getElementsByClassName("room");

   

        el.addEventListener("click", _ => {
 
        el.sceneEl.components['room-manager'].changeRoom(data.room, data.position, data.rotation);
        history.replaceState( {} , '', '#' + data.room);
        
        });

        if (data.noOpacity) return;

        this.el.addEventListener("mouseenter", _ => {
            el.setAttribute("material","opacity", 0.4);
        });

        
        el.addEventListener("mouseleave", _ => {
                el.setAttribute("material","opacity", 0.1);

         });
    
    },


});