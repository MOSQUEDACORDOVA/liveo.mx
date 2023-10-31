import Alert from "@mui/material/Alert";

export const Error = ({
  severity,
  message,
}: {
  severity: "error" | "info" | "success" | "warning";
  message?: string;
}) => {
  return (
    <Alert className="normal-case" severity={severity}>
      {message}
    </Alert>
  );
};
