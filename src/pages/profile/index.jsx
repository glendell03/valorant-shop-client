import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetUserWeaponsState,
  selectorUserWeapons,
} from "features/userWeaponsSlice";
import Button from "components/Button";
import { deleteWeapons } from "utils/weapons.routes";
import { Link } from "react-router-dom";
import { userSelector } from "features/userSlice";
import axios from "axios";

const DB_URL = process.env.REACT_APP_DB_URL;

const Profile = () => {
  const dispatch = useDispatch();
  const { weaponsData, errorMessage } = useSelector(selectorUserWeapons);
  const { token } = useSelector(userSelector);

  useLayoutEffect(() => {
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);

  const onClickdelete = async (id) => {
    await axios.delete(`${DB_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await dispatch(resetUserWeaponsState());
    await dispatch(fetchAllWeapons());
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto">
        <div className="flex gap-5">
          <Link to="/">
            <Button>Buy</Button>
          </Link>
        </div>
        <h1 className="text-center font-bold text-5xl py-10">MY WEAPONS</h1>
        <div className="py-10 flex flex-wrap gap-10 justify-center h-full">
          {weaponsData.length === 0
            ? "No Weapons Found. Buy Now!"
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

                  <Button onClick={() => onClickdelete(data.id)}>Delete</Button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
