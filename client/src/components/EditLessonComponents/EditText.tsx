import React, { Dispatch, SetStateAction, memo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditText.css';

interface IEditTextProps {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  stepNum: string;
}

function EditText({ data, setData, stepNum }: IEditTextProps) {
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
  console.log(data);

  return (
    <div className="App" style={{ width: '1200px' }}>
      <h2>Шаг {stepNum}</h2>
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
    </div>
  );
}

export default memo(EditText);
