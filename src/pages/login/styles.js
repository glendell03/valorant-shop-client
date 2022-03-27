import tw,{styled} from "twin.macro";
import Loginbg from "assets/1186639.png";

export const LoginButton = tw.button `
bg-vred-primary
hover:bg-vred-hover
p-5
rounded-xl
`;

export const Wrapper = tw.div`
 flex
 h-screen
`;

export const Left = tw.div`
bg-white
flex 
flex-col
p-20
items-center
`;

export const Right = styled.div`
//bg-yellow-100
//flex-1
//flex
//justify-center
//items-center
background-image: url(${Loginbg});
${tw`flex-1 bg-center bg-cover`}
`;

export const Input = styled.input`

&::-webkit-input-placeholder {
    font-size: 14px;
    
}

${tw`h-10
bg-gray-100
p-4`}
`;

