import { Member, MemberWithoutId } from "../types/member.interface";
import { api } from "./api.service";

/**
 * 맴버 조회
 */
export const getMembers = async (): Promise<Member[]> => {
  const res: Member[] = await api("GET", "member");

  return res;
};

/**
 * 맴버 추가
 * @param {MemberWithoutId} memberInfo - 맴버의 name, position, imageUrl 값이 필요합니다.
 */
export const createMember = async (
  memberInfo: MemberWithoutId
): Promise<Member> => {
  const res: Member = await api("POST", "member", memberInfo);

  return res;
};

/**
 * 맴버 수정
 * @param {Member} memberInfo - 맴버의 id, name, position, imageUrl 값이 필요합니다.
 */
export const updateMember = async (memberInfo: Member): Promise<Member> => {
  const { id } = memberInfo;

  const res = await api("PUT", `member/${id}`, memberInfo);

  return res;
};

/**
 * 맴버 삭제
 * @param {number} id - 맴버의 id 값이 필요합니다.
 */
export const deleteMember = async (id: number): Promise<boolean> => {
  const res = await api("DELETE", `member/${id}`);

  return res ? true : false;
};
