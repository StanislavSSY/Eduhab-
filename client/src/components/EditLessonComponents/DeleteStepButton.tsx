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

  return (
    <button className="delete-btn" onClick={() => void clickHandler()}>
      <span className="svg-delete-btn-wrap">
        <svg
          className="svg-delete-btn"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="#777"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
          />
        </svg>
      </span>
      <span className="delete-btn-text">Удалить шаг</span>
    </button>
  );
}

export default memo(DeleteStepButton);
