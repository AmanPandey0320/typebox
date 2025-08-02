import IconProps from "./type";

export const FolderIcon = ({size="1em", fill="currentColor", ...props}:IconProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" {...props}>
    <path fill={fill} d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path>
</svg>
    )