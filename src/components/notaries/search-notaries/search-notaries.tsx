import { SearchOutlined } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import { useState } from "react";
import MenuDisplay from "../menu-display/menu-display";
import { getDataNotariesColumnOne } from "./search-notaries.helpers";
import { getDataNotariesColumnTwo } from "./search-notaries.helpers";
import { getDataNotariesColumnThree } from "./search-notaries.helpers";

const SearchNotaries = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FormControl fullWidth>
        <OutlinedInput
          onClick={handlePopoverOpen}
          placeholder="Buscar notaria"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Popper
        open={open}
        anchorEl={anchorEl}
        id="simple-popover"
        className="bg-white mt-4 border rounded-2xl shadow-lg"
      >
        <ClickAwayListener onClickAway={handlePopoverClose}>
          <Grid
            container
            columns={{ xs: 12, md: 12 }}
            className="flex min-h-[360px] p-10"
          >
            <Grid
              item
              xs={12}
              md={4}
              className="border-r-light-violet md:border-r"
            >
              {getDataNotariesColumnOne().map((item) => (
                <MenuDisplay
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  bgIcon={item.bgIcon}
                  colorIcon={item.colorIcon}
                  items={item.items}
                />
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className="border-r-light-violet md:border-r"
            >
              {getDataNotariesColumnTwo().map((item) => (
                <MenuDisplay
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  bgIcon={item.bgIcon}
                  colorIcon={item.colorIcon}
                  items={item.items}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              {getDataNotariesColumnThree().map((item) => (
                <MenuDisplay
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  bgIcon={item.bgIcon}
                  colorIcon={item.colorIcon}
                  items={item.items}
                />
              ))}
            </Grid>
          </Grid>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default SearchNotaries;
