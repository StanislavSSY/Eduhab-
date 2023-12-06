import React, { ChangeEvent, useEffect, useState } from 'react';
import DeleteStepButton from './DeleteStepButton';

export default function EditVideo({ data, setData, id, stepNum }) {
  const [isData, setIsData] = useState(false);
  const [input, setInput] = useState({ title: '' });
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

  return (
    <>
      <div className="App">
        <h2>Шаг {stepNum}</h2>
        {isData && (
          <div>
            <input
              onChange={changeHandler}
              type="text"
              name="data"
              id="data"
              value={data}
            />
          </div>
        )}
      </div>
      <DeleteStepButton id={id} />
    </>
  );
}
