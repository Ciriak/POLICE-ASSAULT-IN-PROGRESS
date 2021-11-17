import './app.scss';
import Banner from './components/banner/Banner';
import ReactHowler from 'react-howler';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTwitter } from '@mdi/js';
import classNames from 'classnames';
import canAutoplay from 'can-autoplay';
import TitleAnimator from './components/titleAnimator/TitleAnimator';
import ReactPlayer from 'react-player';

function App() {
  const [playBanner, setPlayBanner] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [showSocial] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [showStartText, setShowStartText] = useState(false);
  const bpm = 125;

  const loaded = videoReady && audioReady;

  const audioBg: string[] = ['audio/bg1.mp3', 'audio/bg2.mp3'];
  const bgAudioUrl = audioBg[Math.floor(Math.random() * audioBg.length)];
  useEffect(() => {
    canAutoplay.audio().then(({ result }) => {
      console.log('Autoplay allowed', result);
      if (result === true) {
        handlePlay();
      } else {
        setShowStartText(true);
      }
    });
  }, []);

  const handlePlay = () => {
    if (!loaded) return;
    setPlayBanner(true);
    setTimeout(() => {
      setPlayAudio(true);
    }, 1000);
  };
  return (
    <div className="app" onClick={handlePlay}>
      <TitleAnimator />

      {!loaded && <div className="preloader">Loading</div>}
      {loaded && (
        <h2
          className={classNames('start-text', {
            show: showStartText,
            active: playBanner,
          })}
        >
          Click anywhere
        </h2>
      )}

      <ReactHowler
        src={bgAudioUrl}
        playing={playAudio}
        loop={true}
        onLoad={() => {
          setAudioReady(true);
        }}
      />
      <div className={classNames('video-bg', { active: playAudio })}>
        <ReactPlayer
          url="video/bg.mp4"
          playing={playAudio}
          loop={true}
          width="100%"
          height="100%"
          muted
          onReady={() => {
            setVideoReady(true);
          }}
        />
      </div>

      <Banner separator="//" text="POLICE ASSAULT IN PROGRESS" active={playBanner} />
      <div
        className={classNames('social', {
          show: showSocial,
          active: playAudio,
        })}
      >
        <div
          className="social-icon social-twitter"
          style={{
            animationDuration: `${(60 / bpm) * 1000}ms`,
          }}
        >
          <Icon path={mdiTwitter} size={2} />
        </div>
      </div>
    </div>
  );
}

export default App;
