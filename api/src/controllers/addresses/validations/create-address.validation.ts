import { z } from 'zod';

const messages = {
  city_required: 'Cidade é obrigatória',
  invalid_type: 'Tipo de dado inválido',
  zipCode_required: 'CEP é obrigatório',
  state_required: 'Estado é obrigatório',
  country_required: 'País é obrigatório',
  neighborhood_required: 'Bairro é obrigatório',
  zipCode_max: 'CEP deve ter no máximo 9 caracteres',
  user_id_required: 'Identificador do usuário é obrigatório',
};

export const createAddressValidation = z.object({
  userId: z.string({
    required_error: messages.user_id_required,
    invalid_type_error: messages.invalid_type,
  }),

  country: z.string({
    required_error: messages.country_required,
    invalid_type_error: messages.invalid_type,
  }),

  neighborhood: z.string({
    invalid_type_error: messages.invalid_type,
    required_error: messages.neighborhood_required,
  }),

  city: z.string({
    required_error: messages.city_required,
    invalid_type_error: messages.invalid_type,
  }),

  state: z.string({
    required_error: messages.state_required,
    invalid_type_error: messages.invalid_type,
  }),

  zipCode: z
    .string({
      required_error: messages.zipCode_required,
      invalid_type_error: messages.invalid_type,
    })
    .max(9, { message: messages.zipCode_max }),

  complement: z
    .string({
      invalid_type_error: messages.invalid_type,
    })
    .optional(),
});
