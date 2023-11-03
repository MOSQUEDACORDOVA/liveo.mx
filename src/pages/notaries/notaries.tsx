import SectionHeader from "@/components/section-header/section-header";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Notaries = () => {
  return (
    <div className="Notaries overflow-hidden relative sm:mb-80">
      <SectionHeader
        title="Notarías Aliadas"
        classNameContainer="mt-20"
        description={
          <>
            En <span className="text-violet">liveo</span> podrás contratar
            diferentes notarías a tu disposición
          </>
        }
      />
      <form>
        <FormControl>
          <OutlinedInput
            name="password"
            // onChange={handleChangeData}
            // value={dataUser.password}
            className="bg-white"
            id="outlined-adornment-password"
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
          />
        </FormControl>
      </form>
    </div>
  );
};

export default Notaries;
