import { useEffect, useState } from "react";
import * as S from "./styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllWeapons, resetWeaponsState } from "@/features/weaponsSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { batch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weapons);

  const [weapons, setWeapons] = useState([]);

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6, // optional, default to 1.
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

  return (
    <S.Wrapper>
      <S.Blur>
        <S.Container>
          <div></div>
          <Carousel
            responsive={responsive}
            infinite={true}
            keyBoardControl={true}
            centerMode={true}
            showDots={true}
            containerClass="carousel-container"
            className="pb-10 mb-1"
          >
            {weapons.map((item) => (
              <S.CarouselItem>
                <img
                  src={item.displayIcon}
                  alt={item.displayName}
                  className="h-14 w-auto"
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

export default Home;
