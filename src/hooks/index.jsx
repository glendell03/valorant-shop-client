import { useEffect } from "react";
import * as S from "./styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllWeaponSkins } from "@/features/weaponsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weapons);

  useEffect(() => {
    dispatch(fetchAllWeaponSkins());
  }, []);

  console.log(data);
  return (
    <S.Wrapper>
      <S.Blur />
    </S.Wrapper>
  );
};

export default Home;
