export const PageSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`p-4 flex flex-col items-center ${className}`}>
      {children}
    </section>
  );
};
