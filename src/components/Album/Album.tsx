import React from "react";

interface Props {
  area?: string | null;
}

const Album: React.FC<Props> = ({ area }) => {
  return <div>{area}</div>;
};

export default Album;
