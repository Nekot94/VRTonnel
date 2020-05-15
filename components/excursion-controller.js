AFRAME.registerComponent('excursion-controller', {
    schema: {
        target: {type: 'selector'},
        data: {type: "string"},
        timg: {type: "string"},
        inoimg: {type: "string", default: ''},
        incimg: {type: "string", default: ''},
        homeb: {type: "string", default: ''},
        homeb: {type: "string", default: ''},
        exbuttons: {type: 'selector'},
        font: {type: "string"},
        linkp: {type: "selector"},
        attachPoints: {default: true},
        loader: {type: "selector", default:"#loader"},
        sphereCoordinates: {default: true},

    },

    init: function () {
        let data = this.data;

        
        this.backStack = [];
        let backButton = this.createPanel("0.4", "0.4", data.backb, "-0.5 -1 -0.8", "-90 0 0", "backButton");
        backButton.classList.add('interractible');
        this.addAnimation(backButton);
        data.exbuttons.appendChild(backButton);
        

       

        let homeButton = this.createPanel("0.4", "0.4", data.homeb, "0.5 -1 -0.8", "-90 0 0", "homeButton");
        homeButton.classList.add('interractible');
        this.addAnimation(homeButton);
        data.exbuttons.appendChild(homeButton);

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', "data/" + data.edata + ".json", true);
        // xobj.open('GET', "https://320711.selcdn.ru/izobr/data/" + data.edata + ".json", true);

        xobj.onreadystatechange = _ => {
            if (xobj.readyState == 4 && xobj.status == "200") {
              this.exdata = JSON.parse(xobj.responseText);

              let href = window.location.href;
              this.room = href.split('#')[1];
              
              if (this.room)
              {
                 this.room = this.room.split("/")[1];
              } 

              if (!this.room || !this.exdata.find(e => e.id == this.room)) {
                // this.room = this.exdata[0].id;
                this.changeRoom(this.exdata[0].id, 0, false);
              }
              else {
                this.changeRoom(this.room);      
              }

              homeButton.addEventListener("click",  _ => { if (this.exdata[0].id != this.room) this.changeRoom(this.exdata[0].id)});
              backButton.addEventListener("click",  _ => { 
                  if (this.backStack.length > 1 ) {
                    this.backStack.pop();
                    this.changeRoom(this.backStack.pop());
                  } 

              });
              
            }
        };
        xobj.send(null);  

 
    
    },

    changeRoom : function(num, addRot = 0, doURL = true) {
        let loader =this.data.loader;
        loader.setAttribute("visible", true);
        let target = this.data.target;
        let linkParrent = this.data.linkp;
        let exel = this.exdata.find(e => e.id == num);

        // console.log("doURL", doURL);
        this.room = num;
        this.backStack.push(num);
        // console.log("room", this.room);
        console.log("backStack", this.backStack);

        console.log("")

        if (doURL) {
            history.pushState( {} ,'', '#'+ this.el.id + '/' + num);
            
        }


        target.setAttribute('src', exel.url);
        // target.emit('set-image-fade-in');
        // target.addEventListener('materialtextureloaded', _=> {
        //     target.emit('set-image-fade-out');
        //     loader.setAttribute("visible", false);

        //  }); 
         
   
        linkParrent.innerHTML = "";


         target.addEventListener('materialtextureloaded', _=> {
            target.emit('set-image-fade-out');
            loader.setAttribute("visible", false);
            let rot  = exel.rotation + addRot;
            console.log("rot", rot);
   
            target.setAttribute("rotation", "0 "+ rot +" 0");
            if (this.data.attachPoints)
               linkParrent.setAttribute("rotation","0 "+ rot + " 0");
   
            linkParrent.innerHTML = "";
            for (let i=0; i<exel.transitions.length; i++)
            {
                 let item = document.createElement('a-entity');
                 item.setAttribute("camera-look","");
                 item.setAttribute("material","shader","flat")
                 item.setAttribute("material","src",this.data.timg)
                 item.setAttribute("material","transparent",0);
                 item.classList.add("transition");
                 item.classList.add("interractible");
                 item.setAttribute("geometry","primitive", "plane");
                 item.setAttribute("geometry","width", 1.2);
                 item.setAttribute("geometry","height", 1.2);
                 item.setAttribute("position", this.data.sphereCoordinates ? this.getSphereCoordinate(exel.transitions[i].latitude, exel.transitions[i].longitude, exel.transitions[i].radius) :
                  exel.transitions[i].position); 
                 item.addEventListener("click",  _ => this.changeRoom(exel.transitions[i].transitionId, exel.transitions[i].additionalRotation));
                 this.addAnimation(item);
                 linkParrent.appendChild(item);
                 this.percentText = this.createText(item, exel.transitions[i].transitionId, "#fff", "0 0 0.04",  exel.transitions[i].transitionId);

   
            }
   
   
   
           for (let i=0; i<exel.info.length; i++)
           {
             let popup = document.createElement('a-entity');
             popup.classList.add("info");
             // popup.setAttribute("position",  i + " 2 10");
             popup.setAttribute("position", this.data.sphereCoordinates ? this.getSphereCoordinate(exel.info[i].latitude, exel.info[i].longitude, exel.info[i].radius) : exel.info[i].position); 
   
             popup.setAttribute('dialog-popup', {
               openIconImage: this.data.inoimg,
               closeIconImage: this.data.incimg,
               title: exel.info[i].title,
               body: exel.info[i].text,
               titleFont: this.data.font,
               bodyFont: this.data.font,
               addAttribute: 'camera-look',
               bodyWrapCount: exel.info[i].bodyWrapCount ? exel.info[i].bodyWrapCount :  40,
               titleWrapCount:  exel.info[i].titleWrapCount ? exel.info[i].titleWrapCount :  25,
               dialogBoxHeight: exel.info[i].panelHeight ? exel.info[i].panelHeight : 10,
               dialogBoxWidth: exel.info[i].panelWidth ? exel.info[i].panelWidth : 8,
               image: exel.info[i].image ? exel.info[i].image : '',
               imageWidth: exel.info[i].imageWidth ? exel.info[i].imageWidth : 2,
               imageHeight: exel.info[i].imageHeight ? exel.info[i].imageHeight: 2
             });
           
   
             linkParrent.appendChild(popup); 
   
           }


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

    },

    createPanel: function(width, height, image, position, rotation="0 0 0", id){

        let panel = document.createElement('a-entity');
        panel.setAttribute("material","shader","flat");
        if (id) panel.setAttribute("id", id);
        panel.setAttribute("geometry","primitive", "plane");
        panel.setAttribute("geometry","width", width);
        panel.setAttribute("geometry","height", height);
        panel.setAttribute("material","src", image);
        panel.setAttribute("material","transparent",0);
        panel.setAttribute("material","alphaTest",0.3);
        panel.setAttribute("position", position);
        panel.setAttribute("rotation", rotation);
        panel.setAttribute('animation__growup', {
            property: 'scale',
            dur: 500,
            from: '0 0 0',
            to: '1 1 1'
        });
        return panel;
    },

    createText: function(el, tclass, color, position, value) {
        let text = document.createElement('a-entity');
        text.setAttribute("text", {
                    value: value,
                    font: this.data.font,
                    negate: false,
                    color: color,
                    wrapCount: 3,
                    align: 'center',
                    alphaTest: '0.8'
                  });
        text.classList.add(tclass);
        text.setAttribute("position",position);
        text.setAttribute('animation__growup', {
            property: 'scale',
            dur: 500,
            from: '0 0 0',
            to: '1 1 1'
        });

        el.appendChild(text);
        return text;

    }


});