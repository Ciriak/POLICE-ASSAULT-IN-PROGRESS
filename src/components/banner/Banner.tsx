import classNames from 'classnames';
import './banner.scss';

export interface IBannerProps {
  text: string;
  separator: string;
  active: boolean;
}
export default function Banner(props: IBannerProps) {
  return (
    <div className={classNames('banner', { active: props.active })}>
      <div className="banner-content">
        <div className="banner-text-container">
          <div className="corner-helper tl"></div>
          <div className="corner-helper tr"></div>
          <div className="corner-helper bl"></div>
          <div className="corner-helper br"></div>
          <div className="banner-text">
            {'  '}
            {props.text}
            {`   ${props.separator}`}
          </div>
          <div className="banner-text t-2">
            {'  '}
            {props.text}
            {`   ${props.separator}`}
          </div>
        </div>
      </div>
      <div className="banner-icon-container">
        <div className="banner-icon">
          <img src="danger-icon.png" alt="Danger" />
        </div>
      </div>
    </div>
  );
}
