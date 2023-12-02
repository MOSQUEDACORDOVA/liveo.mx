import { useParams } from "react-router-dom";
import BannerGrid from "@/components/notary/banner-grid/banner-grid";
import {
  BadgeOutlined,
  DoNotStep,
  FavoriteBorderOutlined,
  FiberManualRecordRounded,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import { FormControl, FormGroup, Grid, InputLabel } from "@mui/material";
import TextField from "@/components/material_ui/text-field/text-field";
import { TextArea } from "@/components/material_ui";
import { Button } from "@/components";

const ProviderPage = () => {
  const { id } = useParams();
  console.log({ id });

  return (
    <div className="notary-page overflow-hidden p-6 gap-16 md:mb-[40rem] max-w-6xl m-auto">
      <section className="mt-20 flex justify-center items-center gap-16 xl:my-20">
        <BannerGrid />
      </section>
      <section>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <picture className="mr-6 border shadow-md rounded-full p-4">
              <img
                src="https://i.ytimg.com/vi/7meLD47PO7s/hqdefault.jpg"
                className="w-8 h-8"
                alt="logo"
              />
            </picture>
            <div>
              <p className="text-2xl font-bold">NAUCALPAN 122</p>
              <p className="text-sm font-medium">
                Notaria <FavoriteBorderOutlined className="w-4" />
              </p>
            </div>
          </div>
          <div className="rounded-full bg-light-violet p-4 text-white text-sm">
            <BadgeOutlined />
          </div>
        </div>
        <Grid
          container
          spacing={{ md: 4 }}
          columns={{ md: 12 }}
          className="mt-8"
        >
          <Grid
            item
            md={7}
            className="text-sm text-gray-600 text-justify border-b border-b-gray-200"
          >
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi,
              natus, at voluptates officiis eveniet est cumque omnis, rerum
              atque soluta veritatis in eum reprehenderit vitae recusandae
              asperiores autem facere? Assumenda. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Praesentium, aperiam officia
              exercitationem tenetur quaerat voluptate adipisci tempora
              excepturi ipsum eius esse minima molestiae, quod, laboriosam enim
              fuga perspiciatis nobis ab!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
              voluptates aut architecto repellat reiciendis illum pariatur
              obcaecati eveniet tempora, ducimus odit quas neque a, explicabo
              facilis sit, recusandae voluptate nihil. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Suscipit eius nisi itaque, id
              harum consequuntur excepturi odit omnis ullam alias similique
              aliquam iste aspernatur a non labore deserunt. Maxime, commodi?
            </p>
          </Grid>
          <Grid item md={5}>
            <div
              className="mt-5 md:mt-0 max-h-72 overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5473.620873693417!2d-75.74048809194096!3d-14.051504551948469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1701292397113!5m2!1ses-419!2spe" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
              }}
            ></div>
          </Grid>
        </Grid>
      </section>
      <section className="pt-4">
        <h3 className="text-3xl font-bold">Equipo</h3>
        <p className="mt-4 text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel hic,
          mollitia ipsum similique sapiente aperiam. Consequatur ea eveniet quod
          architecto fugiat animi, voluptatem similique accusantium quisquam
          maxime distinctio et assumenda. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Fugiat commodi voluptate beatae
          repudiandae dolorum, natus a deleniti voluptatibus maiores et at
          obcaecati eum repellendus culpa doloremque blanditiis nemo ipsa? Fuga!
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi dolore
          pariatur ad doloremque ullam cum dolores veniam quaerat repellendus
          fugit maxime aliquid at, assumenda et aliquam quo cumque eveniet odit?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab sequi
          officiis a magni voluptatibus dolores cum sunt exercitationem maiores
          neque consectetur repellendus sit vitae ea laudantium eos, doloribus
          provident veniam!
        </p>
      </section>
      <hr className="my-8" />
      <section>
        <h3 className="text-3xl font-bold">Servicios</h3>
        <ul className="flex gap-2 text-lg mt-6">
          <li>
            <FiberManualRecordRounded className="text-light-violet mr-4" />
            Inmobiliario
          </li>
          <li>
            <FiberManualRecordRounded className="text-light-violet mr-4" />
            Corporativo
          </li>
          <li>
            <FiberManualRecordRounded className="text-light-violet mr-4" />
            Civil
          </li>
          <li>
            <FiberManualRecordRounded className="text-light-violet mr-4" />
            Notarial
          </li>
        </ul>
      </section>
      <hr className="my-8" />
      <section>
        <h3 className="text-3xl font-bold">Contacto</h3>
        <Grid container columns={12} className="mt-6">
          <Grid item md={6}>
            <form className="flex flex-col gap-6">
              <TextField label="Nombre" name="name" />
              <TextField label="Correo electrónico" name="email" />
              <TextField
                label="Mensaje"
                name="message"
                multiline
                minRows={3}
                maxRows={10}
                fullWidth
                sx={{ borderRadius: 50 }}
              />

              <Button
                bgColor="violet"
                className="p-2 px-16 text-lg"
                text="Enviar"
              />
            </form>
          </Grid>
          <Grid item md={6} className="pl-20">
            <div>
              <h3 className="text-3xl font-bold flex justify-start items-center">
                <div className="rounded-full bg-light-violet p-2 text-white text-xs mr-4">
                  <BadgeOutlined />
                </div>
                Ubicación
              </h3>
              <p className="text-sm mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repudiandae quas sequi maiores maxime nisi similique ad omnis
                voluptates! Sapiente ipsa impedit qui fugiat quidem expedita
                possimus velit adipisci asperiores. Culpa!
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold flex justify-start items-center">
                <div className="rounded-full bg-light-violet p-2 text-white text-xs mr-4">
                  <PhoneAndroidOutlined />
                </div>
                Teléfono
              </h3>
              <p className="text-sm mt-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repudiandae quas sequi maiores maxime nisi similique ad omnis
                voluptates! Sapiente ipsa impedit qui fugiat quidem expedita
                possimus velit adipisci asperiores. Culpa!
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold flex justify-start items-center">
                <div className="rounded-full bg-light-violet p-2 text-white text-xs mr-4">
                  <BadgeOutlined />
                </div>
                Correo Electrónico
              </h3>
              <p className="text-sm mt-4">correo@correo.com</p>
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default ProviderPage;
