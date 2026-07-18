// api/users.ts knows about HTTP

import type { RegisterFormData } from '../hooks/useRegisterForm';


export interface UserCreateResponse {
  user_id: string;
  status: string;
}


export class ApiError extends Error {
  public status: number;
  public fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {}
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}


export async function registerUser(
  data: RegisterFormData
): Promise<UserCreateResponse> {

  const body = {
    username: data.username,
    email: data.email,
    password: data.password,
    password_repeat: data.passwordRepeat,
  };

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 201) {
    return (await res.json()) as UserCreateResponse;
  }

  const json = await res.json();

  const fieldErrors: Record<string, string> = {};
  for (const detail of json.details ?? []) {
    if (detail.field && detail.message) {
      fieldErrors[detail.field] = detail.message;
    }
  }

  throw new ApiError(
    json.message || `Request failed (${res.status})`,
    res.status,
    fieldErrors
  );

}
