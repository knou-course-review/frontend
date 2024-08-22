import { z } from "zod";

export const TerminationFormSchema = z.object({
  isChecked: z.boolean().refine((val) => val === true, { message: "* 안내 사항을 확인해 주세요." }),
});
