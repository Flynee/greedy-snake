const controlMusic = {
  playBg: () => {
    const audio = document.getElementById('bg-music');
    // 播放(继续播放)
    if (audio) {
      audio.muted = false;
      audio.play();
    }
  },
};

export default controlMusic;
