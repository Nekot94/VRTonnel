AFRAME.registerComponent('print-panel', {
    schema: {
        showel: {type: 'selector'},
        printpanelimg: {type: "string"}
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        el.addEventListener("click",  _ => {

            data.showel.setAttribute("visible", true);
            console.log("data-show", data.showel);
            let item = document.createElement('a-entity');
            item.setAttribute("material","shader","flat");
            item.setAttribute("geometry","primitive", "plane");
            item.setAttribute("geometry","width", "1.3");
            item.setAttribute("geometry","height", "1");
            item.setAttribute("material","src", data.printpanelimg);
            item.setAttribute("material","transparent",0);
            item.setAttribute("position","0.3 -0.04 0.1 ");
            item.setAttribute('animation__growup', {
                property: 'scale',
                dur: 500,
                from: '0 0 0',
                to: '1 1 1'
            });

            el.appendChild(item); 
            el.classList.remove("interractible");
            el.setAttribute("material", "visible", "false");



        });
    

 
    
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