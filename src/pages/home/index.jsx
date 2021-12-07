import { useEffect, useState } from "react";
import * as S from "./styles";
import { useSelector, useDispatch, batch } from "react-redux";
import { fetchAllWeapons, resetWeaponsState } from "@/features/weaponsSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weapons);

  const [weapons, setWeapons] = useState([]);
  const [skins, setSkins] = useState([]);
  const [selectedSkin, setSelectedSkin] = useState({});
  const [active, setActive] = useState(null);

  useEffect(() => {
    batch(() => {
      dispatch(resetWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);

  useEffect(() => {
    const data_copy = data.filter(
      (item) =>
        item.displayIcon !== null &&
        !item.displayName.includes("Standard") &&
        item.displayName !== "Melee"
    );
    setWeapons(data_copy);
  }, [data]);

  useEffect(() => {
    setSelectedSkin({});
  }, [skins]);

  const handleGetSkins = (index) => {
    const data_copy = weapons[index].skins.filter(
      (item) =>
        item.displayIcon !== null &&
        !item.displayName.includes("Standard") &&
        item.displayName !== "Melee"
    );
    setSkins(data_copy);
  };

  const renderWeaponNames = () => (
    <>
      {skins.map((item) => (
        <div
          key={item.uuid}
          className="cursor-pointer select-none"
          onClick={() => {
            setSelectedSkin(item);
            setActive(item.uuid);
          }}
        >
          <span className={`${active === item.uuid && "text-red-400"}`}>
            {item.displayName}
          </span>
        </div>
      ))}
    </>
  );

  const renderSelectedWeapon = () => (
    <div>
      <span className="select-none">
        <img
          src={selectedSkin.displayIcon}
          alt={selectedSkin.displayName}
          className="h-32 w-auto"
          onDragStart={(e) => e.preventDefault()}
        />
      </span>
    </div>
  );
  console.log(weapons);

  return (
    <S.Wrapper>
      <S.Blur>
        <S.Container>
          <S.Skins>
            {skins.length > 0 ? (
              <>
                <S.Names>{renderWeaponNames()}</S.Names>
                <S.Weapons>{renderSelectedWeapon()}</S.Weapons>
              </>
            ) : (
              <div>No Data</div>
            )}
          </S.Skins>
          <Carousel
            responsive={responsive}
            infinite={true}
            centerMode={true}
            showDots={true}
            containerClass="carousel-container"
            className="pb-10 mb-1"
          >
            {weapons.map((item, index) => (
              <S.CarouselItem
                key={item.uuid}
                onClick={() => handleGetSkins(index)}
              >
                <img
                  src={item.displayIcon}
                  alt={item.displayName}
                  className="h-14 w-auto"
                  onDragStart={(e) => e.preventDefault()}
                />
                <span className="text-white text-center">
                  {item.displayName}
                </span>
              </S.CarouselItem>
            ))}
          </Carousel>
        </S.Container>
      </S.Blur>
    </S.Wrapper>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default Home;
