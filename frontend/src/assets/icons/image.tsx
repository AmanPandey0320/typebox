import { Icon } from "next/dist/lib/metadata/types/metadata-types";

import IconProps from "./type";

export const ImageIcon = ({size="1em", fill="currentColor",...props}:IconProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 384 384" {...props}>
    <path fill={fill} d="M384 341q0 18-12.5 30.5T341 384H43q-18 0-30.5-12.5T0 341V43q0-18 12.5-30.5T43 0h298q18 0 30.5 12.5T384 43v298zM117 224l-74 96h298l-96-128l-74 96z"></path>
</svg>
    )