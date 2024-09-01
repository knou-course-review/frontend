import { z } from "zod";

export const SearchSchema = z.object({
  name: z.string().min(1),
  searchType: z.string().min(1),
});
