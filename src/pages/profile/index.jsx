import { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetUserWeaponsState,
  selectorUserWeapons,
} from "@/features/userWeaponsSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { weaponsData } = useSelector(selectorUserWeapons);
  useEffect(() => {
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);
  console.log("state", weaponsData);
  return (
    <div className="bg-gray-900 h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-center font-bold text-5xl py-10">MY WEAPONS</h1>
        <div className="my-10 flex flex-wrap gap-10 justify-center">
          {weaponsData.map((data) => (
            <div key={data.id} className="ring ring-white p-10 rounded-xl">
              <p className="text-center mb-10">{data.displayName}</p>
              <img
                src={data.displayIcon}
                alt={data.displayName}
                className="h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
