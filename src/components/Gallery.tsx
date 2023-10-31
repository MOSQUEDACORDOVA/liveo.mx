type IImgs = {
  id: string | number;
  url: string;
};

export const Gallery = ({ imgs }: { imgs: IImgs[] | undefined }) => {
  return (
    <div className="grid md:grid-cols-4 grid-rows-2 gap-2">
      <img
        className="col-span-2 row-span-2 h-[350px] w-full object-cover"
        src={imgs && imgs[0].url}
        alt="first"
      />
      <img
        className="h-[171px]  w-full object-cover"
        src={imgs && imgs[1].url}
        alt="seccond"
      />
      <img
        className="h-[171px]  w-full object-cover"
        src={imgs && imgs[2].url}
        alt="third"
      />
      <img
        className="h-[171px]  col-span-2 w-full object-cover"
        src={imgs && imgs[3].url}
        alt="fourth"
      />
    </div>
  );
};
