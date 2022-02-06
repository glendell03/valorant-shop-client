import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetUserWeaponsState,
  selectorUserWeapons,
} from "@/features/userWeaponsSlice";
import Button from "@/components/Button";
import { deleteWeapons, getUserWeapons } from "@/utils/weapons.routes";

const Profile = () => {
  const dispatch = useDispatch();
  const { weaponsData, errorMessage } = useSelector(selectorUserWeapons);

  const [dataUuid, setDataUuid] = useState("");

  useLayoutEffect(() => {
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);

  const onClickdelete = (uuid) => {
    setDataUuid(uuid);
  };

  useEffect(() => {
    deleteWeapons(dataUuid);
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, [dataUuid]);

  return (
    <div className="bg-gray-900 h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-center font-bold text-5xl py-10">MY WEAPONS</h1>
        <div className="my-10 flex flex-wrap gap-10 justify-center">
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
                    className="h-20"
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
