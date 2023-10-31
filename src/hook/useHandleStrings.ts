export const useHandleStrings = () => {
  const removeAccents = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const handleBuildPath = (name: string) =>
    removeAccents(name)
      .trim()
      .replace(/\s+/g, "-")
      .replace("/", "-")
      .toLowerCase();

  return { removeAccents, handleBuildPath };
};
