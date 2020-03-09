AFRAME.registerComponent('video-player-hls', {
    schema: {
      onPlay: {type: 'string'},
      onPause: {type: 'string'},
      video: {type: 'selector'},
      restart: {default: true}   
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        let video = data.video;
  
        let isPlayed = false;
  
      el.addEventListener(data.onPlay, function () {
        //   if (!video)
        //    return;
        //    if (!isPlayed) {
        //       if (data.restart) video.currentTime = 0;
        //       var playPromise = video.play();
        //       if (playPromise !== null) {
        //       playPromise.catch(() => { /* discard runtime error */ })
        //       }
        //   } else {
        //       video.pause();
        //   }
          
          console.log("fuu", el.getAttribute('l'));
          if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(el.getAttribute('l'));
            hls.attachMedia(video);
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