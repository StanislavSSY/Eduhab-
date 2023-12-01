import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditText.css';
import DeleteStepButton from './DeleteStepButton';

interface IEditTextProps {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  id: string;
  stepNum: string;
}

function EditText({ data, setData, id, stepNum }: IEditTextProps) {
  const config = {
    toolbar: [
      'undo',
      'redo',
      'heading',
      'alignment',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
    ],
  };
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    console.log('----------------');

    fetch(`http://localhost:3100/steps/${id}`)
      .then((result) => result.json())
      .then((resData) => {
        console.log(resData, '----------------');
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
          <CKEditor
            editor={ClassicEditor}
            config={config}
            data={data}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              setData(editor.getData());
              console.log({ event, editor });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        )}
      </div>
      <DeleteStepButton id={id} />
    </>
  );
}

export default EditText;
