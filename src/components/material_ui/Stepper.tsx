import * as React from "react";
import Box from "@mui/material/Box";
import { Stepper as StepperMUI } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiStepLabel: {
      styleOverrides: {
        root: {
          "& .MuiStepIcon-root": {
            color: "#b08fde !important",
          },
          "& .MuiStepIcon-active": { color: "#b08fde !important" },
          "& .MuiStepIcon-completed": { color: "#b08fde !important" },
          "& .Mui-disabled .MuiStepIcon-root": {
            color: "#b08fde80 !important",
          },
        },
      },
    },
  },
});

export type ISteps = {
  label: string;
  description: string | JSX.Element;
  disabled_btn?: boolean;
  onClick?: () => Promise<boolean>;
};

type IStepper = {
  steps: ISteps[];
  initial_step?: number;
};

export const Stepper = ({ steps, initial_step }: IStepper) => {
  const [activeStep, setActiveStep] = React.useState(initial_step ?? 0);

  const handleNext = (onClick: () => Promise<boolean>) => {
    onClick().then(
      (resp) => resp && setActiveStep((prevActiveStep) => prevActiveStep + 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <StepperMUI activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <h6>{step.label}</h6>
              </StepLabel>
              <StepContent>
                {typeof step.description === "string" ? (
                  <Typography>{step.description}</Typography>
                ) : (
                  step.description
                )}
                <Box sx={{ mb: 2 }}>
                  <div className="w-full flex justify-end">
                    <Button
                      disabled={step.disabled_btn}
                      className={`${
                        step.disabled_btn
                          ? "bg-light-violet/50"
                          : "bg-light-violet"
                      } text-white `}
                      variant="contained"
                      disableElevation
                      onClick={() => step.onClick && handleNext(step.onClick)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finalizar" : "Continue"}
                    </Button>
                    <Button
                      className="text-light-violet"
                      disabled={index === 0 || index === initial_step}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Atrás
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </StepperMUI>
      </Box>
    </ThemeProvider>
  );
};
