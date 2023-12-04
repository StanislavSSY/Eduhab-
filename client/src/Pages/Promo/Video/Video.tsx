import React from 'react'
import styled from './Video.module.css'
import YouTube, { YouTubeProps } from 'react-youtube';

export default function Video({ yid }): JSX.Element {

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    width: '308',
    height: '173',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    }
  }

  return (
    <div>
      <YouTube videoId={yid} opts={opts} onReady={onPlayerReady} />
    </div>
  )
}
