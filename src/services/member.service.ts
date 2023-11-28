import { Member, MemberUpdate } from "../types/member.interface";
import { api, deleteImageApi, uploadApi } from "./api.service";

export const updateMember = async (
  id: number,
  member: MemberUpdate,
  prevImage?: string
): Promise<Member | undefined> => {
  // 이전 사진 삭제
  if (prevImage) {
    const result = await deleteImageApi([prevImage]);
    if (!result.ok) {
      window.alert("문제가 생겼습니다. 잠시 후 다시 시도하세요.");
      return;
    }
  }

  // 정보 수정
  const data = await api("PUT", `member/${id}`, member);

  return data;
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await uploadApi(formData);

  return res.path;
};
