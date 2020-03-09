AFRAME.registerComponent('room-manager', {
    schema: {
      rig: {type: 'selector', default: "#cameraRig"},
      cam: {type: 'selector', default: "[camera]"}
    },

    init: function () {
        
        this.rooms = document.getElementsByClassName("room");
        this.myRooms = {};

        let rooms = this.rooms;
        let myRooms = this.myRooms;

        let href = window.location.href;


        for(let i=0; i<rooms.length; i++)
        {
            let id = rooms[i].id;
            myRooms[id]= {};
            myRooms[id].room = rooms[i];
            myRooms[id].interractibles = rooms[i].querySelectorAll('.interractible');
        }

        let room = href.split('#')[1];

        console.log(room);
        if (room)
        {
            this.changeRoom(room);
            
        }


    },

    changeRoom: function(room, position = "0 0 0", rotation = "0 0 0" ) {
        let cam = this.data.cam;
        let rig = this.data.rig;
        let myRooms = this.myRooms;

        for(var r in myRooms)
        {
            myRooms[r].room.emit('room-changed');

            if (r == room)
            {
                myRooms[r].room.setAttribute("visible", "true");
                myRooms[r].room.emit('room-enter');

                for(let i=0; i<myRooms[r].interractibles.length; i++)
                {
                    myRooms[r].interractibles[i].classList.add("interractible");
                }
                continue;
            }
            console.log(myRooms[r]);
            myRooms[r].room.setAttribute("visible", "false");
            for(let i=0; i<myRooms[r].interractibles.length; i++)
            {
                myRooms[r].interractibles[i].classList.remove("interractible")
            }
            myRooms[r].room.emit('room-exit');

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