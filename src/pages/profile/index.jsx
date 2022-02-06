import { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetUserWeaponsState,
  selectorUserWeapons,
} from "@/features/userWeaponsSlice";
import Button from "@/components/Button";
import { deleteWeapons, getUserWeapons } from "@/utils/weapons.routes";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { weaponsData } = useSelector(selectorUserWeapons);

  const [dataUuid, setDataUuid] = useState("");

  useEffect(() => {
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);
  // console.log("state", weaponsData);

  const onClickdelete = (uuid) => {
    // setDataUuid(uuid);
    deleteWeapons(uuid);
    dispatch(fetchAllWeapons());
  };

  // useEffect(() => {}, [dataUuid]);

  return (
    <div className="bg-gray-900 h-full text-white">
      <div className="container mx-auto">
        <h1 className="text-center font-bold text-5xl py-10">MY WEAPONS</h1>
        <div className="py-10 flex flex-wrap gap-10 justify-center h-full">
          {weaponsData.length === 0
            ? errorMessage
            : weaponsData.map((data) => (
                <div
                  key={data.id}
                  className="ring ring-white p-10 rounded-xl flex flex-col justify-center items-center gap-10"
                >
                  <p>{data.displayName}</p>

                  <img
                    src={data.displayIcon}
                    alt={data.displayName}
                    className="h-10 w-48"
                  />

                  {/* DELETE BUTTON START HERE */}

                  <Button onClick={() => onClickdelete(data.uuid)}>
                    Delete
                  </Button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
