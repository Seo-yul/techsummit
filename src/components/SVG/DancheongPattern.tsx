interface DancheongPatternProps {
  width?: number;
  height?: number;
  className?: string;
}

export const DancheongPattern = ({ width = 200, height = 200, className }: DancheongPatternProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.1 }}
    >
      {/* 단청 문양 - 구름 문양 */}
      <path
        d="M 50,100 Q 60,80 70,100 T 90,100 Q 100,80 110,100 T 130,100 Q 140,80 150,100"
        stroke="#C97D60"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 50,120 Q 60,100 70,120 T 90,120 Q 100,100 110,120 T 130,120 Q 140,100 150,120"
        stroke="#6B8E9F"
        strokeWidth="2"
        fill="none"
      />
      
      {/* 단청 문양 - 꽃잎 문양 */}
      <circle cx="100" cy="50" r="15" fill="none" stroke="#C97D60" strokeWidth="1.5" />
      <circle cx="100" cy="50" r="8" fill="#6B8E9F" />
      
      <circle cx="100" cy="150" r="15" fill="none" stroke="#6B8E9F" strokeWidth="1.5" />
      <circle cx="100" cy="150" r="8" fill="#C97D60" />
    </svg>
  );
};

