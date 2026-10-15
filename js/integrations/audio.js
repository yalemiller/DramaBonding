// Plays an episode's audioUrl through an <audio> element and reports time back to the app.
// Placeholder episodes have no audio yet, so they run on a simulated one-second clock instead,
// which keeps the player usable until the RSS enclosures are wired in.

export function createAudioEngine({ onTime, onEnded, onError }) {
  const audio = new Audio();
  audio.preload = 'none';

  let simulated = false;
  let timer = null;
  let simPos = 0;
  let simDur = 0;

  audio.addEventListener('timeupdate', () => { if (!simulated) onTime(audio.currentTime); });
  audio.addEventListener('ended', () => { if (!simulated) onEnded(); });
  audio.addEventListener('error', () => { if (!simulated && audio.getAttribute('src')) onError(); });

  const stopTimer = () => {
    clearInterval(timer);
    timer = null;
  };

  const clearSource = () => {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  };

  return {
    load(episode) {
      stopTimer();
      simulated = !episode.audioUrl;
      if (simulated) {
        clearSource();
        simPos = 0;
        simDur = episode.durationSec || 0;
      } else {
        audio.src = episode.audioUrl;
      }
    },

    play() {
      if (!simulated) {
        audio.play().catch(err => { if (err.name !== 'AbortError') onError(); });
        return;
      }
      if (timer) return;
      if (simPos >= simDur) simPos = 0;
      timer = setInterval(() => {
        simPos = Math.min(simPos + 1, simDur);
        onTime(simPos);
        if (simPos >= simDur) {
          stopTimer();
          onEnded();
        }
      }, 1000);
    },

    pause() {
      if (simulated) stopTimer();
      else audio.pause();
    },

    stop() {
      stopTimer();
      clearSource();
      simulated = false;
    }
  };
}
