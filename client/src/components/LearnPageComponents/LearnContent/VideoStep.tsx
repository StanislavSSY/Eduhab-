import React, { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { VideoProps } from "../../../types";
import getYouTubeID from "get-youtube-id";

import styled from "./VideoStep.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addProgress } from "../../../store/slice/entrySlice";

export default function Video({ id, title }): JSX.Element {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const [step, setStep] = useState({});
  const { entry } = useAppSelector((store) => store.entrySlice);
  const { steps } = useAppSelector((store) => store.stepsSlice);

  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useAppDispatch();
  const { stepNum, courseid, lessonid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setButtonClicked(false);
  }, [stepNum]);

  useEffect(() => {
    console.log("⚠️  【@@@】➜ ");
    (async () => {
      if (buttonClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/entries/${courseid}/${step.id}`,
          {
            method: "PATCH",
            credentials: "include",
          }
        );

        const result = await response.json();
        dispatch(addProgress(result.progress));
      }
    })();
  }, [buttonClicked]);

  const checkStep = () => {
    const oneStep = steps.find((el) => {
      return el.stepNum === stepNum;
    });

    return entry.progress.includes(oneStep.id);
  };

  const [yid, setYid] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/steps/${id}`, {
        credentials: "include",
      });

      const data = await response.json();
      setStep(data);
      const youtubeid = getYouTubeID(data.data);
      if (youtubeid) {
        setYid(youtubeid);
      }
    })();
  }, [id]);

  const opts: YouTubeProps["opts"] = {
    width: "860px",
    height: "500px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <>
      <div className={styled["title-content"]}>{title}</div>
      <div className={styled["body-fragment"]}>
        <div className={styled["body-content"]}>
          <YouTube videoId={yid} opts={opts} onReady={onPlayerReady} />
        </div>
      </div>
      <div className={styled["footer-fragment"]}>
        <div className={styled["footer-content"]}>
          <div className={styled["button-fragment"]}>
            {!checkStep() && !buttonClicked ? (
              <div
                onClick={() => {
                  setButtonClicked(!checkStep());
                }}
                className={styled["button-next"]}
              >
                Изучить
              </div>
            ) : (
              <></>
            )}
            {stepNum !== steps.at(-1).stepNum && (
              <div
                onClick={() =>
                  navigate(
                    `/teach/courses/${courseid}/lesson/${lessonid}/step/${
                      Number(stepNum) + 1
                    }`
                  )
                }
                className={styled["button-next"]}
              >
                Следующий шаг{" "}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
