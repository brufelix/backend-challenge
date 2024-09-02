import { z } from 'zod';

const messages = {
  invalid_type: 'Tipo de dado inválido',
  required_email: 'O e-mail é obrigatório.',
  required_password: 'A senha é obrigatória.',
  invalid_email: 'Formato de e-mail inválido.',
  min_password_length: 'A senha deve ter no mínimo 6 caracteres.',
};

export const loginValidation = z.object({
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
