AFRAME.registerComponent('room-manager', {
    schema: {
      rooms: {type: 'string'},
      rig: {type: 'selector', default: "#cameraRig"},
      cam: {type: 'selector', default: "[camera]"}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        
        this.rooms = document.getElementsByClassName("room");
        this.myRooms = {};

        let rooms = this.rooms;
        let myRooms = this.myRooms;


        for(let i=0; i<rooms.length; i++)
        {
            let id = rooms[i].id;
            myRooms[id]= {};
            myRooms[id].room = rooms[i];
            myRooms[id].interractibles = rooms[i].querySelectorAll('.interractible');
        }
        

    },

    changeRoom: function(room, position = "0 0 0", rotation = "0 0 0" ) {
        let cam = this.data.cam;
        let rig = this.data.rig;
        // let rooms = this.rooms;
        let myRooms = this.myRooms;

        for(var r in myRooms)
        {
            if (r == room)
            {
                myRooms[r].room.setAttribute("visible", "true");
                for(let i=0; i<myRooms[r].interractibles.length; i++)
                {
                    myRooms[r].interractibles[i].classList.add("interractible")
                }
                continue;
            }
            console.log(myRooms[r]);
            myRooms[r].room.setAttribute("visible", "false");
            for(let i=0; i<myRooms[r].interractibles.length; i++)
            {
                myRooms[r].interractibles[i].classList.remove("interractible")
            }
        }
        rig.setAttribute("position", position);
        // rig.setAttribute("rotation", rotation);

        cam.setAttribute("look-controls", {enabled:false})
        cam.setAttribute("rotation", rotation);
        var newX = cam.object3D.rotation.x
        var newY = cam.object3D.rotation.y
        cam.components['look-controls'].pitchObject.rotation.x = newX
        cam.components['look-controls'].yawObject.rotation.y = newY
        cam.setAttribute("look-controls",{enabled:true})

    }


});