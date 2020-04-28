AFRAME.registerComponent('room-manager', {
    schema: {
      rig: {type: 'selector', default: "#cameraRig"},
      cam: {type: 'selector', default: "[camera]"},
      nav: {default: false},
      startPos: {deafult: "0 0 0"}

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

        this.password = href.split('?')[1];
        this.password = this.password.split('#')[0];
        console.log("pass", this.password);

        let room = href.split('#')[1];
        if (room) 
            room = room.split("/")[0];

        if (room && myRooms[room])
        {

            let pos = myRooms[room].room.getAttribute("startp");
            pos = pos ? pos : "0 0 0"; 
            
            this.changeRoom(room,position=pos);
            
        }
        else{
            this.data.rig.setAttribute("position", this.data.startPos); 
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

                if (myRooms[r].room.hasAttribute("stay")) {
                 
                    rig.setAttribute('movement-controls','enabled',false)

                 
                }
                else {

                    rig.setAttribute('movement-controls','enabled',true)

                }

                for(let i=0; i<myRooms[r].interractibles.length; i++)
                {
                    myRooms[r].interractibles[i].classList.add("interractible");
                }
                continue;
            }
            myRooms[r].room.setAttribute("visible", "false");
            for(let i=0; i<myRooms[r].interractibles.length; i++)
            {
                myRooms[r].interractibles[i].classList.remove("interractible")
            }
            myRooms[r].room.emit('room-exit');

        }
        

        // rig.setAttribute("position", "1000 0 0");
        // rig.setAttribute("rotation", rotation);
        if (this.data.nav)
        {
            rig.setAttribute('movement-controls','constrainToNavMesh',false)


        }
        

        cam.setAttribute("look-controls", {enabled:false})
        cam.setAttribute("rotation", rotation);
        var newX = cam.object3D.rotation.x
        var newY = cam.object3D.rotation.y
        cam.components['look-controls'].pitchObject.rotation.x = newX
        cam.components['look-controls'].yawObject.rotation.y = newY
        cam.setAttribute("look-controls",{enabled:true});
        rig.setAttribute("position", position);  


        if (this.data.nav)
        {
            rig.setAttribute('movement-controls','constrainToNavMesh',true)

        }


    }


});