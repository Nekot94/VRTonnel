AFRAME.registerComponent('excursion-controller', {
    schema: {
        target: {type: 'selector'},
        data: {type: "string"},
        timg: {type: "string"},
        inimg: {type: "string"},
        font: {type: "string"},
        linkp: {type: "selector"},
        attachPoints: {default: true},
        loader: {type: "selector", default:"#loader"},
        sphereCoordinates: {default: true}
    },

    init: function () {
        let data = this.data;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', "data/" + data.edata + ".json", true);

        xobj.onreadystatechange = _ => {
            if (xobj.readyState == 4 && xobj.status == "200") {
              this.exdata = JSON.parse(xobj.responseText);

              let href = window.location.href;
              let room = href.split('#')[1];
              if (room)
              {
                 room = room.split("/")[1];
              } 

              if (!room || !this.exdata.find(e => e.id == room)) {
                this.changeRoom(this.exdata[0].id);
              }
              else {
                this.changeRoom(room);      
              }
            }
        };
        xobj.send(null);  

 
    
    },

    changeRoom : function(num, addRot = 0) {
        let loader =this.data.loader;
        loader.setAttribute("visible", true);
        let target = this.data.target;
        let linkParrent = this.data.linkp;
        let exel = this.exdata.find(e => e.id == num);

        history.pushState( {} ,'', '#'+ this.el.id + '/' + num);


        target.setAttribute('src', exel.url);
        target.emit('set-image-fade-in');
        target.addEventListener('materialtextureloaded', _=> {
            target.emit('set-image-fade-out');
            loader.setAttribute("visible", false);

         }); 
         
         let rot  = exel.rotation + addRot;
         console.log("rot", rot);

         target.setAttribute("rotation", "0 "+ rot +" 0");
         if (this.data.attachPoints)
            linkParrent.setAttribute("rotation","0 "+ rot + " 0");

         linkParrent.innerHTML = "";
         for (let i=0; i<exel.transitions.length; i++)
         {
              let item = document.createElement('a-entity');
              item.setAttribute("camera-look","")
              item.setAttribute("material","shader","flat")
              item.setAttribute("material","src",this.data.timg)
              item.setAttribute("material","transparent",0);
              item.classList.add("transition");
              item.classList.add("interractible");
              item.setAttribute("geometry","primitive", "plane");
              item.setAttribute("position", this.data.sphereCoordinates ? this.getSphereCoordinate(exel.transitions[i].latitude, exel.transitions[i].longitude, exel.transitions[i].radius) :
               exel.transitions[i].position); 
              item.addEventListener("click",  _ => this.changeRoom(exel.transitions[i].transitionId, exel.transitions[i].additionalRotation));
              this.addAnimation(item);
              linkParrent.appendChild(item); 

         }

        //  for (let i=0; i<exel.info.length; i++)
        //  {
        //       let item = document.createElement('a-entity');
        //       item.setAttribute("camera-look","");
        //       item.setAttribute("material","shader","flat")
        //       item.setAttribute("material","src",this.data.inimg)
        //       item.setAttribute("material","transparent",0);
        //       item.classList.add("info");
        //       item.classList.add("interractible");
        //       item.setAttribute("geometry","primitive", "plane");
        //       item.setAttribute("position", this.data.sphereCoordinates ? this.getSphereCoordinate(exel.info[i].latitude, exel.info[i].longitude, exel.info[i].radius) :
        //        exel.info[i].position); 
        //       item.addEventListener("click",  _ => console.log("hehe"));
        //       this.addAnimation(item);
        //       linkParrent.appendChild(item); 

        //       let infoPlane = document.createElement('a-entity');
        //       infoPlane.setAttribute("material","shader","flat");
        //       infoPlane.setAttribute("geometry","primitive", "plane");
        //       infoPlane.setAttribute("geometry","width", "auto");
        //       infoPlane.setAttribute("geometry","height", "auto");
        //       infoPlane.setAttribute("material","color","#FFF");
        //       infoPlane.setAttribute("position",  "1 0 0.1");
        //       infoPlane.classList.add("infoPlane");
        //       infoPlane.setAttribute("text", {
        //         value: exel.info[i].text, 
        //         font: this.data.font,
        //         negate: false,
        //         color: "#000",
        //         width: 20
        //       });

        //       item.appendChild(infoPlane); 

        //     //   let text = document.createElement('a-text');
        //     //   text.setAttribute("value", exel.info[i].text);
        //     //   text.setAttribute("font",this.data.font);
        //     //   text.setAttribute("negate",false);
        //     //   text.setAttribute("color","#000");
        //     //   text.setAttribute("width","10");
        //     // //   text.setAttribute("align","left");
        //     //   text.setAttribute("anchor","center");
        //     // //   text.setAttribute("baseline","center");

        //     //   text.setAttribute("position",  "0 0 0.1");

        //     //   infoPlane.setAttribute("geometry","width", text.getAttribute("value").length * 10 / 40);


        //     //   infoPlane.appendChild(text); 


        //  }


         target.addEventListener('materialtextureloaded', _=> {
            target.emit('set-image-fade-out');
            loader.setAttribute("visible", false);

         }); 

        

    },

    getSphereCoordinate: function(la,lo, r) {
        la = la * Math.PI / 180; 
        lo = lo * Math.PI / 180; 
        let x, y, z;
        x = r * Math.sin(lo)* Math.cos(la);
        y = r * Math.sin(la);
        z = -r * Math.cos(la) * Math.cos(lo);
        return x + " " + y + " " + z;
    },

    addAnimation: function(item)
    {
        item.setAttribute('animation__mouseenter', {
            property: 'scale',
            startEvents: 'mouseenter',
            dur: 200,
            to: '1.2 1.2 1.2'
          });
        
        item.setAttribute('animation__mouseleave', {
            property: 'scale',
            startEvents: 'mouseleave',
            dur: 200,
            to: '1 1 1'
          });

        item.setAttribute('animation__growup', {
            property: 'scale',
            dur: 1000,
            from: '0 0 0',
            to: '1 1 1'
        });

    }


});