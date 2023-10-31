import CircularProgress from "@mui/material/CircularProgress";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Error } from "../components";
import { LinearProgress } from "@mui/material";
import { twMerge } from "tailwind-merge";

export const theme = createTheme({
  palette: {
    "light-purple": {
      main: "#b08fde",
    },
    violet: {
      main: "#b08fde",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    "light-purple": Palette["primary"];
    violet: Palette["primary"];
  }

  interface PaletteOptions {
    "light-purple"?: PaletteOptions["primary"];
    violet: PaletteOptions["primary"];
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    "light-purple": true;
    violet: true;
  }
}

type IProps = {
  type?: "circular" | "linear";
  loading: boolean;
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Suspense = ({
  children,
  error,
  errorMessage,
  loading,
  type = "linear",
  className,
}: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={twMerge("w-full h-full min-h-[250px]", className)}>
        {loading ? (
          type === "circular" ? (
            <div className="flex justify-center items-center">
              <CircularProgress className="text-light-violet" />
            </div>
          ) : (
            <div className="w-full self-start px-10">
              <LinearProgress color="violet" />
            </div>
          )
        ) : error ? (
          <Error message={errorMessage} severity="error" />
        ) : (
          children
        )}
      </div>
    </ThemeProvider>
  );
};
