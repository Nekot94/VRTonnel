AFRAME.registerComponent('play-pause', {
    schema: {
      video: {type: 'selector'},
      playImg: {type: 'string'},
      pauseImg: {type: 'string'},
      loader: {type: 'selector'}
    },

    init: function () {
        let data = this.data;
        let el = this.el;
        let video = data.video;
  
        let isPlayed = false;
  
      el.addEventListener("click", function () {

        if (isPlayed)
            video.pause();
        else 
            video.play();
      });


      video.addEventListener('pause', function () {
            isPlayed = false;
            el.setAttribute("material", "src", data.playImg);
        });

        video.addEventListener('play', function () {
            isPlayed = true;
            el.setAttribute("material", "src", data.pauseImg);
        });


        // video.addEventListener('loadstart', function () {
        //     console.log("lapa", data.loader);
        //     data.loader.setAttribute('visble', true);
        // });

        // video.addEventListener('playing', function () {
        //     console.log("lapa2", data.loader);
        //     data.loader.setAttribute('visble', false);
        // });
            
    }


        




});