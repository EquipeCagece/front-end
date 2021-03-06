import { ValidationError } from 'yup';

interface ValidationErros {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError
): ValidationErros {
  const validationErros: ValidationErros = {};

  err.inner.forEach(error => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
