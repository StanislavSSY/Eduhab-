import React, { ChangeEvent, useEffect, useState } from 'react';
import DeleteStepButton from './DeleteStepButton';
import getYouTubeID from 'get-youtube-id';
import VideoEdit from './VideoEdit/VideoEdit';

export default function EditVideo({ data, setData, id, stepNum }) {
  const [isData, setIsData] = useState(false);
  const [input, setInput] = useState({ title: '' });

  const [yid, setYid] = useState('');
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setData(e.target.value);
  };
  useEffect(() => {
    console.log('----------------');

    fetch(`http://localhost:3100/steps/${id}`)
      .then((result) => result.json())
      .then((resData) => {
        console.log(resData.data, '----------------');

        setData(resData.data);
        setIsData(true);
      })
      .catch((error) => console.log(error));
  }, [stepNum]);

  useEffect(() => {
    const youtubeid = getYouTubeID(data);
    if (youtubeid) {
      setYid(youtubeid);
    }
  }, [data]);

  return (
    <>
      <div className="App">
        <div className="edit-one-step-header">
          <p>Шаг {stepNum} | Видео</p>
          <DeleteStepButton id={id} />
        </div>
        {isData && (
          <div className="edit-video-wrap">
            <div>
              <p className="video-label">Вставьте ссылку на видео</p>
              <input
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="input-editor"
                onChange={changeHandler}
                type="text"
                name="data"
                id="data"
                value={data}
              />
            </div>
            <div>
              <VideoEdit yid={yid} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
