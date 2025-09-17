import { cn } from "@/lib";
import { useThemeSettings } from "@/store";

export const LoginBanner = ({ className }: { className: string }) => {
  const themeStore = useThemeSettings();
  const { primaryColor, successColor } = themeStore;

  return (
    <div
      className={cn(
        "transition-scale pointer-events-none fixed right-0 bottom-0 left-0 z-2 flex h-150 origin-bottom duration-800 sm:h-160 lg:h-[65vh] xl:h-[75vh]",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1271 599"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_3283_101175)">
          <rect
            x="1287"
            y="614"
            width="174"
            height="323"
            transform="rotate(180 1287 614)"
            fill="url(#paint0_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter1_f_3283_101175)">
          <rect
            x="1146"
            y="614"
            width="174"
            height="404"
            transform="rotate(180 1146 614)"
            fill="url(#paint1_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter2_f_3283_101175)">
          <rect
            x="1005"
            y="614"
            width="174"
            height="478"
            transform="rotate(180 1005 614)"
            fill="url(#paint2_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter3_f_3283_101175)">
          <rect
            width="174"
            height="323"
            transform="matrix(1 0 -5.78527e-07 -1 -16 614)"
            fill="url(#paint3_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter4_f_3283_101175)">
          <rect
            width="174"
            height="404"
            transform="matrix(1 0 -6.17385e-07 -1 125 614)"
            fill="url(#paint4_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter5_f_3283_101175)">
          <rect
            width="174"
            height="478"
            transform="matrix(1 0 -6.17385e-07 -1 266 614)"
            fill="url(#paint5_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter6_f_3283_101175)">
          <rect
            width="175"
            height="530"
            transform="matrix(1 0 -6.17385e-07 -1 407 614)"
            fill="url(#paint6_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter7_f_3283_101175)">
          <rect
            x="864"
            y="614"
            width="175"
            height="530"
            transform="rotate(180 864 614)"
            fill="url(#paint7_linear_3283_101175)"
          ></rect>
        </g>
        <g filter="url(#filter8_f_3283_101175)">
          <rect
            width="173"
            height="584"
            transform="matrix(1 0 -6.17385e-07 -1 549 614)"
            fill="url(#paint8_linear_3283_101175)"
          ></rect>
        </g>
        <defs>
          <filter
            id="filter0_f_3283_101175"
            x="1083"
            y="261"
            width="234"
            height="383"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter1_f_3283_101175"
            x="942"
            y="180"
            width="234"
            height="464"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter2_f_3283_101175"
            x="801"
            y="106"
            width="234"
            height="538"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter3_f_3283_101175"
            x="-46"
            y="261"
            width="234"
            height="383"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter4_f_3283_101175"
            x="95"
            y="180"
            width="234"
            height="464"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter5_f_3283_101175"
            x="236"
            y="106"
            width="234"
            height="538"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter6_f_3283_101175"
            x="377"
            y="54"
            width="235"
            height="590"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter7_f_3283_101175"
            x="659"
            y="54"
            width="235"
            height="590"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter8_f_3283_101175"
            x="519"
            y="0"
            width="233"
            height="644"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur_3283_101175"
            ></feGaussianBlur>
          </filter>
          <linearGradient
            id="paint0_linear_3283_101175"
            x1="1374"
            y1="614"
            x2="1374"
            y2="937"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_3283_101175"
            x1="1233"
            y1="614"
            x2="1233"
            y2="1018"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint2_linear_3283_101175"
            x1="1092"
            y1="614"
            x2="1092"
            y2="1092"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint3_linear_3283_101175"
            x1="87.0001"
            y1="0"
            x2="87.0001"
            y2="323"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint4_linear_3283_101175"
            x1="87.0001"
            y1="0"
            x2="87.0001"
            y2="404"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint5_linear_3283_101175"
            x1="87.0001"
            y1="0"
            x2="87.0001"
            y2="478"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint6_linear_3283_101175"
            x1="87.5002"
            y1="0"
            x2="87.5002"
            y2="530"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint7_linear_3283_101175"
            x1="951.5"
            y1="614"
            x2="951.5"
            y2="1144"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="paint8_linear_3283_101175"
            x1="86.5002"
            y1="0"
            x2="86.5002"
            y2="584"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#340B05"></stop>
            <stop offset="0.182709" stopColor="#0358F7"></stop>
            <stop offset="0.283673" stopColor="#5092C7"></stop>
            <stop offset="0.413484" stopColor="#E1ECFE"></stop>
            <stop offset="0.586565" stopColor="#FFD400"></stop>
            <stop offset="0.682722" stopColor={successColor}></stop>
            <stop offset="0.802892" stopColor={primaryColor}></stop>
            <stop offset="1" stopColor="#FFC0FD" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
