import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Title } from "@/components";
import { FileZoneImageGalleryItemProps as Props } from "./filezone-image-gallery-item.types";
import { FC } from "react";

const FileZoneImageGalleryItem: FC<Props> = (props) => {
  const { document, handleDelete, onlyEdit, ...rest } = props;

  const renderWhenDocument = () => {
    if (onlyEdit) {
      return (
        <>
          <picture className="w-full flex justify-center items-center relative">
            <img src={document} alt="image" className="max-h-48 h-full" />
          </picture>
          <input
            type="file"
            className="appearance-none opacity-0 absolute inset-0 z-40"
            {...rest}
          />
        </>
      );
    }

    return (
      <>
        <Button
          className="absolute top-[-1.5rem] right-[-1.5rem] z-10"
          bgColor="light-violet"
          text=""
          icon={<DeleteIcon />}
          onClick={() => handleDelete?.()}
        />
        <picture className="w-full flex justify-center items-center relative">
          <img src={document} alt="image" className="max-h-48 h-full" />
        </picture>
      </>
    );
  };

  return (
    <div className="flex relative group flex-col gap-4 items-center justify-center h-52 border border-light-violet border-dashed p-6 rounded-xl w-full">
      {!document ? (
        <>
          <CloudUploadIcon className="w-14 h-14 text-violet group-hover:animate-bounce" />
          <Title title="Agregar imagen" Tag="h5" color="ocean" />
          <input
            type="file"
            className="appearance-none opacity-0 absolute inset-0 z-40"
            {...rest}
          />
        </>
      ) : (
        renderWhenDocument()
      )}
    </div>
  );
};

export default FileZoneImageGalleryItem;
