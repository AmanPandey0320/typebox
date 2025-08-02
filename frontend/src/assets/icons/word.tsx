import IconProps from "./type";
export const WordIcon = ({size="1em", fill="currentColor",...props}: IconProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" {...props}>
    <mask id="ipSWord0">
        <g fill="none" strokeWidth="4">
            <rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3"></rect>
            <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m14 16l4 16l6-13l6 13l4-16"></path>
        </g>
    </mask>
    <path fill={fill} d="M0 0h48v48H0z" mask="url(#ipSWord0)"></path>
</svg>
    )