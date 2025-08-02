import IconProps from "./type";

export const TextIcon = ({size="1em", fill="currentColor",...props}: IconProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" {...props}>
    <mask id="ipSText0">
        <g fill="none" strokeLinejoin="round" strokeWidth="4">
            <rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3"></rect>
            <path stroke="#000" strokeLinecap="round" d="M16 19v-3h16v3M22 34h4m-2-16v16"></path>
        </g>
    </mask>
    <path fill={fill} d="M0 0h48v48H0z" mask="url(#ipSText0)"></path>
</svg>
    )