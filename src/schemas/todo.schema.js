const { z } = require("zod");

const createTodoSchema = z.object({
  title: z.string().trim().min(3, "Title must contain atleast 3 characters"),
  description: z.string().optional(),
});

const updateTodoSchema = z.object({
  title: z.string().trim().min(3, "Title must contain atleast 3 characters"),
  description: z.string(),
});

module.exports = { createTodoSchema, updateTodoSchema };
