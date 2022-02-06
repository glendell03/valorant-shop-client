import tw, { styled } from "twin.macro";
import BG from "@/assets/shop-bg.jpg";

export const Wrapper = styled.div`
  background-image: url(${BG});

  ${tw`
    h-screen
    w-screen 
    bg-no-repeat 
    bg-cover 
    bg-center
    relative
    `}
`;

export const Blur = styled.div`
  background: rgba(27, 39, 73, 0.25);
  backdrop-filter: blur(8px);

  ${tw`
    absolute
    top-0
    left-0
    w-full
    h-full
    `}
`;

export const Container = styled.div`
  ${tw`
    h-full 
    flex
    flex-col
    `}

  .react-multi-carousel-item {
    ${tw`flex items-center justify-center mx-5`}
  }
  .react-multi-carousel-list {
    z-index: ${({z}) => z};
  }
`;

export const CarouselItem = styled.div`
  background: rgba(27, 51, 100, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  ${({ active }) =>
    active &&
    `
      background: rgba(27, 51, 100, 0.8);
    `}
  ${tw`
  flex
  flex-col
  justify-between
  items-center
  h-full
  w-full
  p-5
  cursor-pointer
  select-none
  `}
`;

export const Skins = tw.div`
    flex-1 
    container
    mx-auto
    flex
    items-center
    justify-center 
    overflow-hidden
`;

export const Names = styled.div`
  ${tw`
  max-h-96
  flex
  flex-col
  text-white
  overflow-auto
  `}

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Weapons = tw.div`
flex-1
flex 
items-center
justify-center
`;
