import { Button, SectionHeader } from "@/components";
import CardProviders from "@/components/common/card-provider/card-provider";
import FilterNotaries from "@/components/notaries/filter-notaries/filter-notaries";
import SearchNotaries from "@/components/notaries/search-notaries/search-notaries";
import { IUser } from "@/features/LoginRegisterUser";
import { useScrollToTop } from "@/hook";
import { useGetQueryCompanies } from "@/services/company/company.services.hooks";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotariesPage = () => {
  const [dataProviders, setDataProviders] = useState<IUser[]>([]);
  const [showAll, setShowAll] = useState(false);

  const { handleScrollToTop } = useScrollToTop();
  const [search, setSearch] = useState("all");
  const { data } = useGetQueryCompanies(search);
  const navigate = useNavigate();

  const showAllButton = data?.length && data?.length > 6;
  const showAllButtonText = showAll ? "Ver menos" : "Mostrar todos";

  const handleCardClick = (url?: string) => {
    if (!url) return;
    navigate(`/proveedor/${url}`);
    handleScrollToTop();
  };

  const handleDataProviders = () => {
    if (showAll) {
      setDataProviders(data ?? []);
    } else {
      setDataProviders(data?.slice(0, 6) ?? []);
    }
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setSearch("all");
      return;
    }
    setSearch(value);
  };

  useEffect(() => {
    handleDataProviders();
  }, [data, showAll]);

  return (
    <div className="overflow-hidden p-6 gap-16 md:mb-[40rem]">
      <section className="mt-20 flex justify-center items-center gap-16 mb-12 md:my-20 ">
        <SectionHeader type="allied-notaries" />
      </section>
      <section className="notaries__filter mt-4 flex flex-col items-center justify-center">
        <div className="xl:w-5/12 md:w-6/12 w-full">
          <SearchNotaries onSearch={handleSearch} />
        </div>
        <div className="self-center md:w-1/2 w-full">
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
          {dataProviders
            ? dataProviders.map((item) => (
                <Grid item key={item.id} xs={4} md={4}>
                  <CardProviders
                    name={item.name || ""}
                    logo={item.avatar as string}
                    image={item.imagen_principal_empresa}
                    category_name={item.sector}
                    className="w-full"
                    url={item.url_amigable || ""}
                    onClick={handleCardClick}
                  />
                </Grid>
              ))
            : null}
        </Grid>
        <div className="mt-40">
          {showAllButton ? (
            <Button
              onClick={() => setShowAll(!showAll)}
              className="text-2xl px-28"
              bgColor="violet"
              text={showAllButtonText}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default NotariesPage;
