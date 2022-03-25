import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  fetchAllWeapons,
  resetUserWeaponsState,
  selectorUserWeapons,
} from "@/features/userWeaponsSlice";
import Button from "@/components/Button";
import { deleteWeapons, getUserWeapons } from "@/utils/weapons.routes";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth";

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();
  console.log(auth);

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <Button
      onClick={() => {
        auth.signout(() => navigate("/"));
      }}
    >
      Sign out
    </Button>
  );
}

const Profile = () => {
  const dispatch = useDispatch();
  const { weaponsData, errorMessage } = useSelector(selectorUserWeapons);

  const [dataid, setDataid] = useState("");

  useLayoutEffect(() => {
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, []);

  const onClickdelete = (id) => {
    setDataid(id);
  };

  useEffect(() => {
    deleteWeapons(dataid);
    batch(() => {
      dispatch(resetUserWeaponsState());
      dispatch(fetchAllWeapons());
    });
  }, [dataid]);

  console.log(weaponsData);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto">
        <div className="flex gap-5">
          <AuthStatus />
          <Link to="/">
            <Button>Buy</Button>
          </Link>
        </div>
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

                  <Button onClick={() => onClickdelete(data.id)}>Delete</Button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
