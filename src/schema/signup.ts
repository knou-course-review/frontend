import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z.object({
      name: z.string().min(1, { message: "* 아이디를 입력해 주세요." }).trim(),
      isValid: z.boolean().refine((val) => val === true, { message: "* 아이디 중복확인을 해주세요." }),
    }),
    email: z.object({
      email: z
        .string()
        .min(1, { message: "* 이메일을 입력해 주세요." })
        .email({ message: "* 이메일 형식이 아닙니다." })
        .endsWith("@knou.ac.kr", { message: "* @knou.ac.kr 도메인의 이메일을 입력해 주세요." })
        .trim(),
      isValid: z.boolean().refine((val) => val === true, { message: "* 이메일이 인증되지 않았습니다." }),
    }),
    confirmationCode: z.object({
      code: z.string().min(1, { message: "* 인증번호를 입력해 주세요." }).trim(),
      isValid: z.boolean().refine((val) => val === true, { message: "* 인증번호를 확인해 주세요." }),
    }),
    password: z
      .string()
      .min(1, { message: "* 비밀번호를 입력해 주세요." })
      .min(8, { message: "* 비밀번호는 8자리 이상이어야 합니다." })
      .trim(),
    passwordConfirm: z.string().min(1, { message: "* 비밀번호를 확인해 주세요." }),
    agreements: z
      .object({
        tos: z.boolean(),
        pp: z.boolean(),
      })
      .refine((checks) => checks.tos === checks.pp && checks.tos === true, {
        message: "* 필수 약관에 동의해 주세요.",
        path: ["pp"],
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "* 비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
