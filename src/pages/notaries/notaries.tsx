import { Button, SectionHeader } from "@/components";
import CardProviders from "@/components/common/card-provider/card-provider";
import FilterNotaries from "@/components/notaries/filter-notaries/filter-notaries";
import SearchNotaries from "@/components/notaries/search-notaries/search-notaries";
import { Grid } from "@mui/material";

const NotariesPage = () => {
  return (
    <div className="overflow-hidden p-6 gap-16 md:mb-[40rem]">
      <section className="mt-20  flex justify-center items-center gap-16 xl:my-20">
        <SectionHeader type="allied-notaries" />
      </section>
      <section className="notaries__filter mt-16 flex flex-col items-center justify-center">
        <div className="xl:w-1/3 w-full">
          <SearchNotaries />
        </div>
        <div className="self-center xl:w-1/2 w-full">
          <FilterNotaries />
        </div>
      </section>
      <section className="notaries__list mt-10 flex flex-col justify-center items-center">
        <Grid
          container
          justifyContent="center"
          spacing={{ xs: 4, md: 4 }}
          columns={{ xs: 4, md: 12 }}
          className="xl:w-[60%] w-full"
        >
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Grid item key={index} xs={4} md={4}>
              <CardProviders name="Notaria 1" className="w-full" />
            </Grid>
          ))}
        </Grid>
        <div className="mt-40">
          <Button
            className="text-2xl px-28"
            bgColor="violet"
            text="Mostrar todos"
          />
        </div>
      </section>
    </div>
  );
};

export default NotariesPage;
