import tw, { styled } from "twin.macro";
import BG from "@/assets/shop-bg.jpg";

export const Wrapper = styled.div`
  background-image: url(${BG});
  ${tw`h-screen w-screen bg-no-repeat bg-cover bg-center`}
`;

export const Blur = styled.div`
  background: rgba(27, 39, 73, 0.25);
  backdrop-filter: blur(8px);
  height: 100%;
  width: 100%;
`;
