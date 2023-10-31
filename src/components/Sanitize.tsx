import sanitize from "sanitize-html";

type IProps = {
  className?: string;
  html?: string;
};

export const Sanitize = ({ html = "", className = "text-lg" }: IProps) => {
  const sanitized = sanitize(html);
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};
