export interface FileZoneImageGalleryItemProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  document?: string;
  handleDelete?: (id?: number) => void;
  onlyEdit?: boolean;
}
