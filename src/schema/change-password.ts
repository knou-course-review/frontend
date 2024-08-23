import { z } from "zod";

export const ChangePasswordFormSchema = z
  .object({
    nowPassword: z.string().min(1, { message: "* 현재 비밀번호를 입력해 주세요." }),
    password: z
      .string()
      .min(1, { message: "* 새 비밀번호를 입력해 주세요." })
      .min(8, { message: "* 비밀번호는 8자리 이상이어야 합니다." }),
    rePassword: z.string().min(1, { message: "* 비밀번호를 확인해 주세요." }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "* 비밀번호가 일치하지 않습니다.",
    path: ["rePassword"],
  });
