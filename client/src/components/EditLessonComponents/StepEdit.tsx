import React, { Dispatch, SetStateAction, memo, useEffect } from 'react';
import EditText from './EditText';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface IStepEdit {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  setStepId: Dispatch<SetStateAction<{ id: string; type: string }>>;
}

function StepEdit({ data, setData, setStepId }: IStepEdit) {
  const lessonid = '1';
  /* const stepNum = useParams()?.stepNum; */
  const stepNum = '1';
  const { steps } = useAppSelector((store) => store.stepsSlice);
  console.log(steps);

  let actualComponent = <></>;
  if (stepNum) {
    const stepFinded = structuredClone(
      steps.find((el) => el.stepNum === stepNum)
    );
    if (stepFinded) {
      if (stepFinded?.type === 'TEXT') {
        setStepId({ id: stepFinded.id, type: 'TEXT' });
        actualComponent = (
          <EditText data={data} setData={setData} stepNum={stepNum} />
        );
      }
    }
  }
  return (
    <div>
      <div className="step-pins-wrapper" style={{ display: 'flex' }}>
        {steps.map((el) => (
          <button
            type="button"
            style={el.stepNum == stepNum ? { backgroundColor: 'green' } : {}}
          >
            <span>Some image</span>
          </button>
        ))}
        <button>new step</button>
      </div>
      {actualComponent}
    </div>
  );
}

export default memo(StepEdit);
