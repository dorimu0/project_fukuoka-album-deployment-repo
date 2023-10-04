import React from "react";

interface Props {
  // area prop 타입 정의, 선택된 마커의 지역을 받아옴
  area?: string | null;
}

const Album: React.FC<Props> = ({ area }) => {
  return <div>{area}</div>; // 선택된 마커의 지역을 출력
};

export default Album;
