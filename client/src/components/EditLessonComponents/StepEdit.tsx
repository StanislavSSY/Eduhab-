import React, { Dispatch, SetStateAction, memo } from 'react';
import EditText from './EditText';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addStep } from '../../store/thunkActions';

interface IStepEdit {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  setStepId: Dispatch<SetStateAction<{ id: string; type: string }>>;
}

function StepEdit({ data, setData, setStepId }: IStepEdit) {
  const stepNum = useParams()?.stepNum;
  const { lessonid } = useParams();
  const { steps } = useAppSelector((store) => store.stepsSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let actualComponent = <></>;

  if (stepNum) {
    const stepFinded = structuredClone(
      steps.find((el) => el.stepNum === stepNum)
    );
    if (stepFinded) {
      if (stepFinded?.type === 'TEXT') {
        setStepId({ id: stepFinded.id, type: 'TEXT' });
        actualComponent = (
          <EditText
            data={data}
            setData={setData}
            id={stepFinded.id}
            stepNum={stepNum}
          />
        );
      }
    }
  }

  async function newStepHandler() {
    const newStepNum = steps.length > 0 ? Number(steps.at(-1).stepNum) + 1 : 1;
    await dispatch(addStep({ lessonid, type: 'TEXT', data: '' }));
    navigate(`/edit-lesson/${lessonid}/step/${newStepNum}`);
  }

  return (
    <div style={{ width: '1200px' }}>
      <div className="step-pins-wrapper" style={{ display: 'flex' }}>
        {steps.map((el) => (
          <Link to={`/edit-lesson/${lessonid}/step/${el.stepNum}`}>
            <button
              type="button"
              style={el.stepNum == stepNum ? { backgroundColor: 'green' } : {}}
            >
              <span>Some image</span>
            </button>
          </Link>
        ))}
        <button onClick={() => void newStepHandler()}>new step</button>
      </div>
      {actualComponent}
    </div>
  );
}

export default memo(StepEdit);
