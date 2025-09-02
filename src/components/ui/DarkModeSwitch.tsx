import * as React from 'react';
import { motion } from 'framer-motion';

export const defaultProperties = {
  dark: {
    circle: {
      r: 9,
    },
    mask: {
      cx: '50%',
      cy: '23%',
    },
    svg: {
      transform: 'rotate(40deg)',
    },
    lines: {
      opacity: 0,
    },
  },
  light: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(90deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
};

let REACT_TOGGLE_DARK_MODE_GLOBAL_ID = 0;

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange' | 'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'>;
export interface Props extends SVGProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  style?: React.CSSProperties;
  size?: number | string;
  animationProperties?: typeof defaultProperties;
  moonColor?: string;
  sunColor?: string;
}

export const DarkModeSwitch: React.FC<Props> = ({
  onChange,
  children,
  checked = false,
  size = 24,
  animationProperties = defaultProperties,
  moonColor = 'white',
  sunColor = 'black',
  style,
  ...rest
}) => {
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    REACT_TOGGLE_DARK_MODE_GLOBAL_ID += 1;
    setId(REACT_TOGGLE_DARK_MODE_GLOBAL_ID);
  }, [setId]);

  const properties = React.useMemo(() => {
    if (animationProperties !== defaultProperties) {
      return Object.assign(defaultProperties, animationProperties);
    }

    return animationProperties;
  }, [animationProperties]);

  const { circle, svg, lines, mask } = properties[checked ? 'dark' : 'light'];

  const svgMotion = {
    ...svg,
    transition: { mass: 4, tension: 250, friction: 35 },
  };
  const centerCircleMotion = {
    ...circle,
    transition: { mass: 4, tension: 250, friction: 35 },
  };
  const maskedCircleMotion = {
    ...mask,
    transition: { mass: 4, tension: 250, friction: 35 },
  };
  const linesMotion = {
    ...lines,
    transition: { mass: 4, tension: 250, friction: 35 },
  };

  const toggle = () => onChange(!checked);

  const uniqueMaskId = `circle-mask-${id}`;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={checked ? moonColor : sunColor}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onClick={toggle}
      animate={svgMotion}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      <mask id={uniqueMaskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <motion.circle
          animate={maskedCircleMotion}
          r="9"
          fill="black"
        />
      </mask>

      <motion.circle
        cx="12"
        cy="12"
        fill={checked ? moonColor : sunColor}
        animate={centerCircleMotion}
        mask={`url(#${uniqueMaskId})`}
      />
      <motion.g stroke="currentColor" animate={linesMotion}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.g>
    </motion.svg>
  );
};