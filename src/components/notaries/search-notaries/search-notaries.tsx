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
import { FC, useMemo, useState } from "react";
import MenuDisplay from "../menu-display/menu-display";
import { getFormatCategories } from "./search-notaries.helpers";
import { useGetCategoriesServices } from "@/services/company/company.services.hooks";
import { SearchNotariesProps as Props } from "./search-notaries.types";

const SearchNotaries: FC<Props> = (props) => {
  const { onSearch } = props;

  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data = [] } = useGetCategoriesServices();

  const categories = useMemo(() => getFormatCategories(data), [data]);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSearchAction = () => {
    handlePopoverClose();
    onSearch(search);
  };

  return (
    <>
      <FormControl fullWidth>
        <OutlinedInput
          onClick={handlePopoverOpen}
          placeholder="Buscar notaria"
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter") {
              handleSearchAction();
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchAction();
                }}
              >
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          }
          size="small"
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
            {categories.map((categoryColumn, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                className={`${
                  index > 0 ? "border-r-light-violet md:border-r" : ""
                }`}
              >
                {categoryColumn.map((item) => (
                  <MenuDisplay
                    key={item.id}
                    title={item.name}
                    // icon={item.icon}
                    // bgIcon={item.bgIcon}
                    // colorIcon={item.colorIcon}
                    // items={item.items}
                  />
                ))}
              </Grid>
            ))}
          </Grid>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default SearchNotaries;
