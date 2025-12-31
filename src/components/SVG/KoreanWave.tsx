interface KoreanWaveProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const KoreanWave = ({ width = 200, height = 20, color = '#C97D60', className }: KoreanWaveProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 20"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 0,10 Q 25,0 50,10 T 100,10 T 150,10 T 200,10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
};

