import { useEffect, useState } from "react";

export const TypeWriter = ({
  text,
  tag = "span",
  className,
  typeSpeed = 100,
}: {
  text: string;
  tag?: string;
  className?: string;
  typeSpeed?: number;
}) => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTyped(text.slice(0, typed.length + 1));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typed]);

  const Tag = `${tag}` as keyof JSX.IntrinsicElements;
  return <Tag className={className}>{typed}</Tag>;
};
