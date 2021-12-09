import * as S from "./styles";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
  return (
    <S.Wrapper>
      <S.Left>
        <h1 className="font-bold mb-7 text-2xl">Sign in</h1>
        <div className="flex flex-col gap-4 mb-7">
          <S.Input placeholder="Gamename"></S.Input>
          <S.Input placeholder="#Tagline"></S.Input>
        </div>

        <S.LoginButton>
          <FaArrowRight className="text-white"></FaArrowRight>
        </S.LoginButton>
      </S.Left>

      <S.Right></S.Right>
    </S.Wrapper>
  );
};

export default Login;
