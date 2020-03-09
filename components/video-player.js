AFRAME.registerComponent('video-player', {
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
          if (!video)
           return;
           if (!isPlayed) {
              video.src= el.getAttribute('sr');
              if (data.restart) video.currentTime = 0;
              var playPromise = video.play();
              if (playPromise !== null) {
              playPromise.catch(() => { /* discard runtime error */ })
              }
          } else {
              video.pause();
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