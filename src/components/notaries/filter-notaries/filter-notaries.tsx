import { CloseRounded, TuneOutlined } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import MenuDisplay from "../menu-display/menu-display";
import { getCategoriesMenus } from "./filter-notaries.helpers";

const FilterNotaries = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <div className="flex justify-end mt-16 ">
      <div className="flex items-center">
        <p className="text-xl">Filtrar</p>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <TuneOutlined />
        </IconButton>
      </div>
      <Modal open={open}>
        <Box
          sx={{
            width: 400,
            height: "auto",
            bgcolor: "Background",
            position: "absolute",
            right: 0,
            top: 0,
            padding: "2rem",
          }}
        >
          <IconButton onClick={onClose} className="absolute right-2 top-2 z-10">
            <CloseRounded />
          </IconButton>
          <h3 className="text-violet font-bold my-4">Filtrar</h3>
          <div>
            {getCategoriesMenus().map((item) => (
              <MenuDisplay
                key={item.id}
                title={item.title}
                items={item.items}
                focusOpen
                classNameSubmenu="mt-4"
              />
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FilterNotaries;
