import * as S from "./styles";
import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, AuthContext } from "auth";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    auth.signin(data, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      if (data.gamename === "wuhoo" && data.tagline === "#lesgo") {
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Wrapper>
        <S.Left>
          <h1 className="font-bold mb-7 text-2xl">Sign in</h1>

          <div>
            {auth.user &&
              auth?.user?.gamename !== "wuhoo" &&
              auth?.user?.tagline !== "#lesgo" && (
                <span className="text-red-800">
                  Wrong gamename/tagline. Please try again!
                </span>
              )}
          </div>

          <div className="flex flex-col gap-4 mb-7">
            <S.Input
              placeholder="Gamename"
              {...register("gamename", { required: true })}
            />
            {errors.gamename && (
              <span className="text-red-800">This field is required</span>
            )}
            <S.Input
              placeholder="#Tagline"
              {...register("tagline", { required: true })}
            />
            {errors.tagline && (
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
