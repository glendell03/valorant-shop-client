import { useEffect, useState } from "react";
import * as S from "./styles";
import { useSelector, useDispatch, batch } from "react-redux";
import { fetchAllWeapons, resetWeaponsState } from "@/features/weaponsSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "@/components/Button";
import ScrollIntoView from "react-scroll-into-view";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weapons);
  const [weapons, setWeapons] = useState([]);
  const [skins, setSkins] = useState([]);
  const [selectedSkin, setSelectedSkin] = useState({});
  const [activeSkin, setActiveSkin] = useState(null);
  const [activeWeapon, setActiveWeapon] = useState(null);

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

  const handleGetSkins = (index) => {
    const data_copy = weapons[index].skins.filter(
      (item) =>
        item.displayIcon !== null &&
        !item.displayName.includes("Standard") &&
        item.displayName !== "Melee"
    );
    setSkins(data_copy);
    setSelectedSkin(data_copy[0]);
    setActiveSkin(data_copy[0].uuid);
    setActiveWeapon(index);
  };

  const renderWeaponNames = () => (
    <>
      {skins.map((item) => (
        <ul
          key={item.uuid}
          id="top-item"
          className="cursor-pointer select-none w-60"
          onClick={() => {
            setSelectedSkin(item);
            setActiveSkin(item.uuid);
          }}
        >
          <li
            className={`${
              activeSkin === item.uuid &&
              "text-vred-primary font-semibold drop-shadow-2xl"
            } p-4`}
          >
            {item.displayName}
          </li>
        </ul>
      ))}
    </>
  );

  const renderSelectedWeapon = () => (
    <div className="flex flex-col items-center justify-center gap-20">
      {activeSkin !== null ? (
        <>
          <span className="select-none">
            <img
              src={selectedSkin.displayIcon}
              alt={selectedSkin.displayName}
              className="h-32 w-auto"
              onDragStart={(e) => e.preventDefault()}
            />
          </span>
          <Button>Buy</Button>
        </>
      ) : (
        <span>No data</span>
      )}
    </div>
  );

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
              <ScrollIntoView selector="#top-item" className="w-full">
                <S.CarouselItem
                  key={item.uuid}
                  onClick={() => handleGetSkins(index)}
                  active={activeWeapon === index}
                >
                  <img
                    src={item.displayIcon}
                    alt={item.displayName}
                    className="h-16 w-auto"
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <span className="text-white text-center">
                    {item.displayName}
                  </span>
                </S.CarouselItem>
              </ScrollIntoView>
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
