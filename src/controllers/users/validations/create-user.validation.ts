import { z } from 'zod';

const messages = {
  invalid_type: 'Tipo de dado inválido',
  required_name: 'O nome é obrigatório.',
  required_email: 'O e-mail é obrigatório.',
  invalid_email: 'Formato de e-mail inválido.',
  required_password: 'A senha é obrigatória.',
  min_password_length: 'A senha deve ter no mínimo 6 caracteres.',
};

export const createUserValidation = z.object({
  name: z.string({
    required_error: messages.required_name,
    invalid_type_error: messages.invalid_type,
  }),

  email: z
    .string({
      required_error: messages.required_email,
      invalid_type_error: messages.invalid_type,
    })
    .email(messages.invalid_email),

  password: z
    .string({
      invalid_type_error: messages.invalid_type,
      required_error: messages.required_password,
    })
    .min(6, messages.min_password_length),
});
