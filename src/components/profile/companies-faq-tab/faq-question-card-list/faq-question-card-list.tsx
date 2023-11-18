import { FC } from "react";
import FaqQuestionCard from "../faq-question-card/faq-question-card";
import { FaqQuestionCardListProps as Props } from "./faq-questions-card-list.types";
import { Grid } from "@mui/material";

const FaqQuestionCardList: FC<Props> = (props) => {
  const { questions } = props;
  return (
    <Grid className="faq-questions-card-list px-4" container spacing={3}>
      {questions.map((question) => (
        <Grid item xs={6} key={question.id}>
          <FaqQuestionCard question={question} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FaqQuestionCardList;
