const controlMusic = {
  playBg: () => {
    const audio = document.getElementById('bg-music');
    // 播放(继续播放)
    if (audio) {
      audio.muted = false;
      audio.play();
    }
  },
  stopBg: () => {
    const audio = document.getElementById('bg-music');
    // 播放(继续播放)
    if (audio) {
      audio.muted = true;
      audio.pause();
    }
  },

  playMove: () => {
    const audio = document.getElementById('move-music');
    // 播放(继续播放)
    if (audio) {
      audio.muted = false;
      audio.play();
    }
  },

  playEated: () => {
    const audio = document.getElementById('eated-music');
    // 播放(继续播放)
    if (audio) {
      audio.muted = false;
      audio.play();
    }
  },

};

export default controlMusic;
