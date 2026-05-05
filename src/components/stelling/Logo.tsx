interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 32 }: LogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7B4FFF" />
        <stop offset="100%" stopColor="#00E5FF" />
      </linearGradient>
    </defs>
    <path
      d="M58 22 L36 22 L24 32 L24 44 L44 44 L58 50 L58 62 L46 70 L24 70"
      stroke="url(#logo-grad)"
      strokeWidth="5.5"
      fill="none"
      strokeLinecap="square"
    />
    <circle cx="58" cy="22" r="5.5" fill="#00E5FF" />
    <circle cx="24" cy="70" r="5.5" fill="#7B4FFF" />
  </svg>
);