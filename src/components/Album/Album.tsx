import React from "react";

interface Props {
  area?: string | null;
}

const Album: React.FC<Props> = ({ area }) => {
  return <div>{area}</div>;
  // Map.tsx에서 가져온 선택된 내용 출력
};

export default Album;