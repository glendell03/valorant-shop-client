import { useEffect } from "react";
import axios from "axios";
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
  return <div>hello</div>;
};

export default Home;
