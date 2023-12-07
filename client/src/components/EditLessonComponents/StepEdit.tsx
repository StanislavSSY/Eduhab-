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

  async function newStepHandler(type: string, dataNew: string) {
    const newStepNum = steps.length > 0 ? Number(steps.at(-1).stepNum) + 1 : 1;
    await dispatch(addStep({ lessonid, type, data: dataNew }));
    setIsModal(false);
    navigate(`/edit-lesson/${lessonid}/step/${newStepNum}`);
  }

  return (
    <div>
      <div className="step-pins-wrapper">
        <div className="step-button-cnt">
          {steps.map((el) => (
            <>
              <Link
                key={el.id}
                to={`/edit-lesson/${lessonid}/step/${el.stepNum}`}
              >
                <div
                  data-step-num={el.stepNum}
                  className={`lesson-edit-step ${
                    el.stepNum == stepNum ? 'clicked-step' : ''
                  }`}
                >
                  <div className="icon-cont">
                    {el.type == 'TEXT' ? (
                      <img
                        className="svg-icon-steps"
                        src="/icons/read-book-icon.svg"
                      ></img>
                    ) : (
                      <img
                        className="svg-icon-steps"
                        src="/icons/youtube-svgrepo-com.svg"
                      ></img>
                    )}
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>

        <div className="add-btn" onClick={() => void setIsModal(true)}>
          <div className="click-cont"></div>
          <div className="icon-cont">
            <object
              className="svg-icon"
              data="/icons/plus.svg"
              type="image/svg+xml"
            ></object>
          </div>
        </div>
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
