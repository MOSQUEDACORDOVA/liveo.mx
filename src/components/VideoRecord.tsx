import { useEffect, useRef, useState } from "react";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import { toast } from "react-toastify";
import { Button, Terms } from ".";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import { useId } from "react";

type IVideoRecord = {
  videoFile?: (file: File) => void;
  video_url?: string;
};

export const VideoRecord = ({ videoFile, video_url }: IVideoRecord) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [buttonActive, setButtonActive] = useState<"record" | "stop">("record");
  const [videoFileSaved, setvideoFile] = useState<File | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const ramdomId = useId();
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      video: true,
      onStart() {
        handleStartStream();
      },
      onStop(_blobUrl, blob) {
        const myFile = new File([blob], `${ramdomId}.mp4`, {
          type: "video/mp4",
        });
        setvideoFile(myFile);
      },
    }
  );

  const handleStartStream = () => {
    const video = videoRef.current;
    navigator.mediaDevices
      .getUserMedia({
        video: { width: video?.clientWidth, height: video?.clientHeight },
      })
      .then((stream) => {
        if (video) {
          video.srcObject = stream;
          video.play();
          setStream(stream);
        }
      })
      .catch(() => {
        toast.error("Error al hacer el stream");
      });
  };

  const handleStopStream = () => {
    if (videoRef.current) videoRef.current.srcObject = null;
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  };

  useEffect(() => {
    videoFile && videoFileSaved && videoFile(videoFileSaved);
  }, [videoFileSaved]);

  const handleClick = () => {
    if (buttonActive === "record") {
      startRecording();
      setButtonActive("stop");
    }
    if (buttonActive === "stop") {
      stopRecording();
      setButtonActive("record");
      handleStopStream();
    }
  };

  const [disabledButton, setDisabledButton] = useState(true);

  const handleCheked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setDisabledButton(!checked);
  };

  return (
    <ReactMediaRecorder
      video
      stopStreamsOnStop
      render={() => (
        <div className="flex flex-col gap-6">
          <video
            autoPlay
            ref={videoRef}
            src={mediaBlobUrl ?? video_url}
            controls
            width="100%"
            className="rounded-xl bg-black max-h-[500px]"
          />

          <div className="flex flex-wrap gap-3 flex-col items-center justify-center">
            <Terms onChange={handleCheked} />
            <Button
              disabled={disabledButton}
              uppercase
              icon={
                buttonActive === "record" ? (
                  <PlayCircleFilledWhiteRoundedIcon className="mr-2" />
                ) : (
                  <StopCircleRoundedIcon className="mr-2" />
                )
              }
              text={`${
                buttonActive === "record" ? "Iniciar" : "Detener"
              } Grabación`}
              bgColor="light-violet"
              onClick={handleClick}
            />
          </div>
        </div>
      )}
    />
  );
};
