import { FC } from "react";
import { FaqQuestionCardProps as Props } from "./faq-question-card.types";
import { Button, Card } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const FaqQuestionCard: FC<Props> = (props) => {
  const { question } = props;

  return (
    <Card>
      <div className="flex justify-between items-center gap-4 p-10">
        <h6 className="font-light text-sm">{question.question}</h6>
        <Button>
          <AddIcon className="text-white p-0.5 rounded-full bg-light-violet" />
        </Button>
      </div>
    </Card>
  );
};

export default FaqQuestionCard;
