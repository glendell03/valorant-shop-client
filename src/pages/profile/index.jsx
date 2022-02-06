import { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetUserWeaponsState,
  selectorUserWeapons,
} from "@/features/userWeaponsSlice";
import Button from "@/components/Button";
import { deleteWeapons } from "@/utils/weapons.routes.js";
import axios from "axios";

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

  const onClickdelete = async (uuid) => {
    await axios.delete("http://localhost/valorant-shop-api/api/delete.php", {
      uuid,
    });
    console.log(uuid);
  };
  return (
    <div className="bg-gray-900 h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-center font-bold text-5xl py-10">MY WEAPONS</h1>
        <div className="my-10 flex flex-wrap gap-10 justify-center">
          {weaponsData.map((data) => (
            <div
              key={data.id}
              className="ring ring-white p-10 rounded-xl flex flex-col justify-center items-center gap-10"
            >
              <p>{data.displayName}</p>
              <img
                src={data.displayIcon}
                alt={data.displayName}
                className="h-20"
              />
              {/* DELETE BUTTON START HERE */}

              <Button onClick={() => onClickdelete(data.uuid)}>Delete</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
