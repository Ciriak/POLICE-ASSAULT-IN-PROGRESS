import './app.scss';
import Banner from './components/banner/Banner';
import ReactHowler from 'react-howler';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTwitter } from '@mdi/js';
import classNames from 'classnames';
import canAutoplay from 'can-autoplay';
import TitleAnimator from './components/titleAnimator/TitleAnimator';
function App() {
  const [playBanner, setPlayBanner] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [showSocial] = useState(false);
  const [showStartText, setShowStartText] = useState(false);
  const bpm = 125;

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
    setPlayBanner(true);
    setTimeout(() => {
      setPlayAudio(true);
    }, 1000);
  };
  return (
    <div className="app" onClick={handlePlay}>
      <TitleAnimator />
      <h2
        className={classNames('start-text', {
          show: showStartText,
          active: playBanner,
        })}
      >
        Click anywhere
      </h2>
      <ReactHowler src="audio/bg2.mp3" playing={playAudio} loop={true} />
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
