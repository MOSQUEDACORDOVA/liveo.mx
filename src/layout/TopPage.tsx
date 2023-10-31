export const TopPage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={`min-h-screen w-full p-4 pb-20 sm:pb-72 flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </section>
  );
};
