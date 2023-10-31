import React, { useEffect, useState } from "react";
interface Props {
  name: string;
  onLoadFile?: (image: File) => void;
  accept?: string;
  disabled?: boolean;
}

export const FileZone = ({ ...props }: Props) => {
  const { onLoadFile, name, accept = "/image/*", disabled } = props;
  const [data, setData] = useState<File>();
  useEffect(() => {
    onLoadFile && data && onLoadFile(data);
  }, [data]);
  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const data_file = files && files[0];
    data_file && setData(data_file);
  };

  return (
    <input
      disabled={disabled}
      type="file"
      accept={accept}
      onChange={hanldeChange}
      className="appearance-none opacity-0 absolute inset-0 z-40"
      name={name}
    />
  );
};
