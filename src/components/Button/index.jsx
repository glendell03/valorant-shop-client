import * as S from "./styles";

const Button = ({ children, ...otherProps }) => {
  return <S.Wrapper {...otherProps}>{children}</S.Wrapper>;
};

export default Button;
