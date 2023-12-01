import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStep } from '../../store/thunkActions';

function DeleteStepButton({ id }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lessonid } = useParams();
  const { steps } = useAppSelector((store) => store.stepsSlice);

  const clickHandler = async () => {
    const lastStepNum =
      steps.length > 1 ? Number(steps.at(-1).stepNum) - 1 : '';
    const urlEnd = lastStepNum ? `step/${lastStepNum}` : '';
    await dispatch(deleteStep(id));
    navigate(`/edit-lesson/${lessonid}/${urlEnd}`);
  };

  return <button onClick={() => void clickHandler()}>Delete step</button>;
}

export default memo(DeleteStepButton);
