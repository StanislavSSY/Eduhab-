import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { VideoProps } from '../../../types';

export default function Video({ yid }: VideoProps): JSX.Element {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    width: '860px',
    height: '500px',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={yid} opts={opts} onReady={onPlayerReady} />
    </div>
  );
}
