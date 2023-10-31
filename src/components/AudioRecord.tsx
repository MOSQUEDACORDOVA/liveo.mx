import { useEffect, useId, useRef, useState } from "react";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import { Button } from ".";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";

type IVideoRecord = {
  audioFile?: (file: File) => void;
  audio_url?: string;
};

export const AudioRecord = ({ audioFile, audio_url }: IVideoRecord) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [buttonActive, setButtonActive] = useState<"record" | "stop">("record");
  const [audioFileSaved, setAudioFile] = useState<File | null>(null);
  const ramdomId = useId();
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
      onStop(_blobUrl, blob) {
        const myFile = new File([blob], `${ramdomId}.mp3`, {
          type: "audio/mp3",
        });
        setAudioFile(myFile);
      },
    }
  );

  const handleClick = () => {
    if (buttonActive === "record") {
      startRecording();
      setButtonActive("stop");
    }
    if (buttonActive === "stop") {
      stopRecording();
      setButtonActive("record");
    }
  };

  useEffect(() => {
    audioFile && audioFileSaved && audioFile(audioFileSaved);
  }, [audioFileSaved]);

  return (
    <ReactMediaRecorder
      audio
      stopStreamsOnStop
      render={() => (
        <div className="flex flex-col gap-6">
          <audio
            ref={audioRef}
            src={mediaBlobUrl ?? audio_url}
            controls
            autoPlay
            className="w-full"
          />
          <div className="flex flex-wrap gap-6 justify-center">
            <Button
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
          <a href=""></a>
        </div>
      )}
    />
  );
};
