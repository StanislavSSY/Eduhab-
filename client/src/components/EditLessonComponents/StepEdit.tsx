import React, { Dispatch, SetStateAction, memo, useState } from 'react';
import EditText from './EditText';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addStep } from '../../store/thunkActions';
import ModalStepChoice from './ModalStepChoice/ModalStepChoice';
import EditVideo from './EditVideo';

interface IStepEdit {
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  setStepId: Dispatch<SetStateAction<{ id: string; type: string }>>;
}

function StepEdit({ data, setData, setStepId }: IStepEdit) {
  const [isModal, setIsModal] = useState(false);
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
      } else if (stepFinded?.type === 'VIDEO') {
        setStepId({ id: stepFinded.id, type: 'VIDEO' });
        actualComponent = (
          <EditVideo
            data={data}
            setData={setData}
            id={stepFinded.id}
            stepNum={stepNum}
          />
        );
      }
    }
  }

  async function newStepHandler(type: string) {
    const newStepNum = steps.length > 0 ? Number(steps.at(-1).stepNum) + 1 : 1;
    await dispatch(addStep({ lessonid, type, data: '' }));
    setIsModal(false);
    navigate(`/edit-lesson/${lessonid}/step/${newStepNum}`);
  }

  return (
    <div style={{ width: '1200px' }}>
      <div className="step-pins-wrapper" style={{ display: 'flex' }}>
        {steps.map((el) => (
          <Link key={el.id} to={`/edit-lesson/${lessonid}/step/${el.stepNum}`}>
            <button
              type="button"
              style={el.stepNum == stepNum ? { backgroundColor: 'green' } : {}}
            >
              <span>Some image</span>
            </button>
          </Link>
        ))}
        <button onClick={() => void setIsModal(true)}>new step</button>
      </div>
      {actualComponent}
      {isModal && (
        <ModalStepChoice
          setIsModal={setIsModal}
          newStepHandler={newStepHandler}
        />
      )}
    </div>
  );
}

export default memo(StepEdit);
