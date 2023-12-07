import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import styled from './LearnComment.module.css'
import Comment from "./Comment/Comment";

export default function LearnComment(): JSX.Element {
  const { stepNum } = useParams();
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState(false);
  const [inpValue, setInpValue] = useState('');
  const [btnblock, setBtnBlock] = useState(false);
  const { steps } = useAppSelector((store) => store.stepsSlice);
  const user = useAppSelector((store) => store.userSlice.user);

  const checkStep = () => {
    const oneStep = steps.find((el) => {
      return el.stepNum === stepNum;
    });

    return oneStep.id;
  };


  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/comments/${checkStep()}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      console.log(result);
      setComments(result);
    })();
  }, [stepNum, steps]);

  useEffect(() => {
    if (inpValue === '') {
      setBtnBlock(true);
    } else {
      setBtnBlock(false);
    }
  },[inpValue]);

  async function sendCommentHandler(): Promise<void> {
    const stepid = checkStep();
    console.log(stepid, 'STEP ID')
    const data = {
      userid: user.id,
      text: inpValue,
      stepid,
    }
    const response = await fetch(`${import.meta.env.VITE_URL}/comments`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      const result = await response.json();
      setComments((prev) => ([...prev, result]));
      setInpValue('');
    }
  }


  return (
    <div className={styled.commentscontainer}>
      <div className={styled.othercontent}>
        <div className={styled.contenttitle}>{comments?.length} Комментариев</div>
        <div className={styled.polocka}></div>
      </div>
      <div className={styled.newcomment}>
        <div className={styled.userimgcont}>
          <img className={styled.imguser} src={`/img/${user?.img_url}`} alt="" />
        </div>
        {status ? (
          <div className={styled.newtextarecont}>
            <textarea onChange={(e) => setInpValue(e.target.value)} className={styled.areainp} name="text" value={inpValue} />
            <div className={styled.btnscontainer}>
              <div className={`${styled.btnsendcomcont} ${btnblock ? styled.block : ''}`}>
                <button onClick={sendCommentHandler} className={`${styled.btnsendcom} ${btnblock ? styled.block : ''}`} disabled={btnblock}>Оставить комментарий</button>
              </div>
              <div className={styled.btntobackcont}>
                <button onClick={() => setStatus(!status)} className={styled.btntoback}>Отменить</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styled.inpcont}>
            <input className={styled.fakeinp} onClick={() => setStatus(!status)} type="text" name="fake" placeholder="Оставить комментарий" />
          </div>
        )}
      </div>
      {comments.length >= 1 ? (
        comments.map((el) => (
          <Comment el={el} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
