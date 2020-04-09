AFRAME.registerComponent('setup-fade', {
    schema: {
      target: {type: 'selector'},
      video: {type: 'selector'},
      dur: {type: 'number', default: 300},
    },
  
    init: function () {

      this.setupFadeAnimation();
    
    
    },

  
    /**
     * Setup fade-in + fade-out.
     */
    setupFadeAnimation: function () {
      var data = this.data;
      var targetEl = this.data.target;
      
      // Only set up once.
      if (targetEl.dataset.setImageFadeSetup) { return; }
      targetEl.dataset.setImageFadeSetup = true;
      
      if (data.video != null)
        data.video.addEventListener('loadeddata', _=> { data.target.emit('set-image-fade-out'); }); 
      
      // Create animation.
      targetEl.setAttribute('animation__fade', {
        property: 'material.color',
        startEvents: 'set-image-fade',
        dir: 'alternate',
        dur: data.dur,
        from: '#FFF',
        to: '#000'
      });

      targetEl.setAttribute('animation__fadeIn', {
        property: 'material.color',
        startEvents: 'set-image-fade-in',
        dir: 'normal',
        dur: data.dur,
        from: '#FFF',
        to: '#000'
      });


      targetEl.setAttribute('animation__fadeOut', {
        property: 'material.color',
        startEvents: 'set-image-fade-out',
        dir: 'reverse',
        dur: data.dur * 2,
        from: '#FFF',
        to: '#000'
      });

      targetEl.setAttribute('animation__halfFadeIn', {
        property: 'material.color',
        startEvents: 'set-image-half-fade-in',
        dir: 'normal',
        dur: data.dur * 2,
        from: '#FFF',
        to: '#666'
      });
    },


  });