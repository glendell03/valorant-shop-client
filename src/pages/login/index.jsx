import { useEffect } from "react";
import * as S from "./styles";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, AuthContext } from "auth";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearState,
  userSelector,
  getToken,
} from "features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage, token } = useSelector(userSelector);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Wrapper>
        <S.Left>
          <h1 className="font-bold mb-7 text-2xl">Sign in</h1>

          <div>
            {isError && (
              <span className="text-red-800 mb-2">{errorMessage}</span>
            )}
          </div>

          <div className="flex flex-col gap-4 mb-7">
            <S.Input
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-800">This field is required</span>
            )}
            <S.Input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <S.LoginButton type="submit">
            <FaArrowRight className="text-white"></FaArrowRight>
          </S.LoginButton>
        </S.Left>

        <S.Right></S.Right>
      </S.Wrapper>
    </form>
  );
};

export default Login;
