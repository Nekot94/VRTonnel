AFRAME.registerComponent('vr-move', {
    schema: {
      speed: {default: '100'},
      cameraRig: { default: '#cameraRig', type: 'selector' }
    
    },

    init: function () {
        var x, y;
        this.direction = new THREE.Vector3();
        console.log("moove");

        this.el.addEventListener("axismove", evt => {
          x = evt.detail.axis[2];
          y = evt.detail.axis[3];
          console.log("huy", x, y);
          this.move(x, y);
        });
    },

    move: function(x,y) {
       // get the cameras world direction
     var direction = this.direction;
     this.el.sceneEl.camera.getWorldDirection(direction );
     direction.multiplyScalar(0.1)
     // faster than the below code - but getAttribute wont work
    //  this.data.cameraRig.object3D.position.add(direction)
     var pos = this.data.cameraRig.getAttribute("position")
     pos.x += direction.x * -y;
    //  pos.y += direction.y // comment this to get 2D movement
     pos.z += direction.z * -y;
     this.data.cameraRig.setAttribute("position", pos * 100);
    }
});