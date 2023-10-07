import type { IProps } from "../../../types/common.interface";
import { BodyStyle } from "./BodyStyles";

const Body = ({ children }: IProps) => {
  return <BodyStyle>{children}</BodyStyle>;
};

export default Body;
