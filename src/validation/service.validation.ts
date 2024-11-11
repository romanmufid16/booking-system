import { z, ZodType } from "zod";

export class ServiceValidation {

  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    price: z.number().positive(),
    capacity: z.number().positive()
  });

  static readonly GET: ZodType = z.object({
    page: z.number().positive().optional(),
    limit: z.number().positive().optional()
  });
}