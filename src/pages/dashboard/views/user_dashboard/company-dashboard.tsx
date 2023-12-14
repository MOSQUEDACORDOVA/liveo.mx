import Sidebar from "@/components/dasboard/sidebar/sidebar";
import { Card, CardContent, Grid } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const CompaniesDashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-12 w-full">
        <h4 className="text-violet font-bold">Dashboard</h4>
        <Grid className="mt-12" container gap={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={6} lg={2}>
            <Card className="bg-teal-400 text-white rounded-xl">
              <CardContent>
                <h4 className="text-2xl">
                  Suscripción <br />
                  activa
                </h4>
                <p className="text-xl text-right mt-4">(Paquete Gold)</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Card className="bg-purple-400 text-white rounded-xl">
              <CardContent>
                <h4 className="text-2xl">
                  Contactos x<br />
                  semana
                </h4>
                <p className="text-xl text-right mt-4">(12)</p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Card className="bg-amber-400 text-white rounded-xl">
              <CardContent>
                <h4 className="text-2xl">
                  Saldo <br />
                  disponible
                </h4>
                <p className="text-xl text-right mt-4">(200)</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <h4 className="text-violet font-bold mt-16">Visitas por semana</h4>
        <div className="w-auto mt-16 max-w-[800px] shadow-lg rounded-2xl">
          <Card className="rounded-2xl ">
            <CardContent>
              <LineChart
                width={800}
                height={400}
                series={[
                  { data: pData, label: "pv", id: "pvId" },
                  { data: uData, label: "uv", id: "uvId" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                sx={{
                  ".MuiLineElement-root, .MuiMarkElement-root": {
                    strokeWidth: 1,
                  },
                  ".MuiLineElement-series-pvId": {
                    strokeDasharray: "5 5",
                  },
                  // ".MuiLineElement-series-uvId": {
                  //   strokeDasharray: "3 4 5 2",
                  // },
                  ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)": {
                    fill: "#fff",
                  },
                  "& .MuiMarkElement-highlighted": {
                    stroke: "none",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompaniesDashboardPage;
