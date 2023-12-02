import "./banner-grid.styles.scss";

const BannerGrid = () => {
  return (
    <div className="banner-grid">
      <picture className="banner-grid__image banner-grid__image--one">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/01/89/63/f5/lobby.jpg"
          alt=""
        />
      </picture>
      <picture className="banner-grid__image banner-grid__image--two">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/01/89/63/f5/lobby.jpg"
          alt=""
        />
      </picture>
      <picture className="banner-grid__image banner-grid__image--three">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/01/89/63/f5/lobby.jpg"
          alt=""
        />
      </picture>
      <picture className="banner-grid__image banner-grid__image--four">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/01/89/63/f5/lobby.jpg"
          alt=""
        />
      </picture>
    </div>
  );
};

export default BannerGrid;
