import { useEffect, useState } from "react";
import * as S from "./styles";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetWeaponsState,
  selectorWeapons,
} from "features/weaponsSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "components/Button";
import ScrollIntoView from "react-scroll-into-view";
import {
  fetchContentTierByUuid,
  resetContentTierState,
  SelectorContentTier,
} from "features/contentTierSlice";
import { useCart } from "react-use-cart";
import Cart from "components/Cart";
import { Link, useNavigate } from "react-router-dom";
import { logout, userSelector } from "features/userSlice";

function AuthStatus() {
  const { token } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) {
    return <p>You are not logged in.</p>;
  }

  return (
    <Button
      onClick={() => {
        dispatch(logout());
        navigate("/login", { replace: true });
      }}
    >
      Sign out
    </Button>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const { weaponsData } = useSelector(selectorWeapons);
  const { contentTierData } = useSelector(SelectorContentTier);
  const [weapons, setWeapons] = useState([]);
  const [skins, setSkins] = useState([]);
  const [selectedSkin, setSelectedSkin] = useState({});
  const [activeSkin, setActiveSkin] = useState(null);
  const [activeWeapon, setActiveWeapon] = useState(null);
  const { addItem, totalUniqueItems, inCart } = useCart();
  const [zIndex, setZIndex] = useState(1);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    batch(() => {
      dispatch(resetWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);

  useEffect(() => {
    if (skins.length > 0) {
      batch(() => {
        dispatch(resetContentTierState());
        dispatch(fetchContentTierByUuid(selectedSkin.contentTierUuid));
      });
    }
  }, [selectedSkin]);

  useEffect(() => {
    const data_copy = weaponsData.filter(
      (item) =>
        item.displayIcon !== null &&
        !item.displayName.includes("Standard") &&
        item.displayName !== "Melee"
    );
    setWeapons(data_copy);
  }, [weaponsData]);

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

  const handleAddtoCart = (skin, tier) => {
    addItem({
      id: skin.uuid,
      price: getGunPrice(tier.devName),
      displayName: skin.displayName,
      displayIcon: skin.displayIcon,
    });
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
          <Button
            onClick={() => handleAddtoCart(selectedSkin, contentTierData)}
            disabled={inCart(selectedSkin.uuid)}
          >
            {inCart(selectedSkin.uuid)
              ? "Incart"
              : getGunPrice(contentTierData.devName)}
          </Button>
        </>
      ) : (
        <span>No data</span>
      )}
    </div>
  );

  const getGunPrice = (devName) => {
    let price = 0;
    if (devName === "Select") price = 875;
    else if (devName === "Deluxe") price = 1275;
    else if (devName === "Premium") price = 1775;
    else if (devName === "Exclusive") price = 2175;
    else if (devName === "Ultra") price = 2475;
    else price = 2675;

    return price;
  };

  const onClickCart = () => {
    setShowCart(!showCart);
    if (showCart) {
      setZIndex(1);
    } else {
      setZIndex(-1);
    }
  };
  return (
    <S.Wrapper>
      <S.Blur>
        <S.Container z={zIndex}>
          <div className="absolute top-0 right-0">
            <span className="absolute top-0 right-10 flex gap-5">
              <Button onClick={onClickCart}>
                {showCart ? "CLOSE" : `CART ${totalUniqueItems}`}
              </Button>
              <Link to="/profile">
                <Button>PROFILE</Button>
              </Link>
              <AuthStatus />
            </span>
            {showCart && <Cart />}
          </div>
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
              <ScrollIntoView
                selector="#top-item"
                key={item.uuid}
                className="w-full"
              >
                <S.CarouselItem
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
