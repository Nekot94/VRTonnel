AFRAME.registerComponent('video-player-hls', {
    schema: {
      onPlay: {type: 'string'},
      onPause: {type: 'string'},
      video: {type: 'selector'},
      restart: {default: true},
      startLevel: {default: 4}  
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        let video = data.video;
  
        let isPlayed = false;
  
      el.addEventListener(data.onPlay, function () {
          
          console.log("fuu", el.getAttribute('l'));
          console.log("video", data.video);
          if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(el.getAttribute('l'));
            hls.attachMedia(video);
            hls.startLevel = 4;
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
              video.play();
            });
          }
          else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = el.getAttribute('l');
            video.addEventListener('loadedmetadata', function() {
              video.play();
            });
          }
      });


      el.addEventListener(data.onPause, function () {
            if (!video)
                return;
            video.pause();
        }       
    );


        

    
    },


});