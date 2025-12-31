interface TaegeukProps {
  size?: number;
  className?: string;
}

export const Taegeuk = ({ size = 100, className }: TaegeukProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 태극 배경 원 */}
      <circle cx="50" cy="50" r="50" fill="#C97D60" />
      
      {/* 태극 상단 반원 (홍색) */}
      <path
        d="M 50,0 A 50,50 0 0,1 50,100 A 25,25 0 0,0 50,50 A 25,25 0 0,1 50,0 Z"
        fill="#C97D60"
      />
      
      {/* 태극 하단 반원 (청색) */}
      <path
        d="M 50,0 A 50,50 0 0,0 50,100 A 25,25 0 0,1 50,50 A 25,25 0 0,0 50,0 Z"
        fill="#6B8E9F"
      />
      
      {/* 홍색 영역 안의 청색 작은 원 */}
      <circle cx="50" cy="30" r="8" fill="#6B8E9F" />
      
      {/* 청색 영역 안의 홍색 작은 원 */}
      <circle cx="50" cy="70" r="8" fill="#C97D60" />
    </svg>
  );
};

