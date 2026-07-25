import type { RegisterFormWithPasswordData } from '../hooks/useRegisterFormWithPassword';

export interface RegisterResponse {
  user_id: string;
  status: string;
  message: string;
}

interface BackendErrorDetailsObject {
  field: string;
  [key: string]: unknown;
}

interface BackendErrorDetailsArrayItem {
  field: string;
  message: string;
}

interface BackendErrorResponse {
  success: boolean;
  error_code: string;
  message: string;
  details?: BackendErrorDetailsObject | BackendErrorDetailsArrayItem[];
}

export interface ApiErrorOptions {
  errorCode?: string;
  fieldErrors?: Record<string, string>;
  details?: unknown;
}

export class ApiError extends Error {
  public status: number;
  public errorCode?: string;
  public fieldErrors: Record<string, string>;
  public details?: unknown;

  constructor(message: string, status: number, options: ApiErrorOptions = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorCode = options.errorCode;
    this.fieldErrors = options.fieldErrors ?? {};
    this.details = options.details;
  }
}

export async function registerUserWithPassword(
  data: RegisterFormWithPasswordData
): Promise<RegisterResponse> {
  const body = {
    username: data.username,
    email: data.email,
    password: data.password,
    password_repeat: data.passwordRepeat,
  };

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return (await res.json()) as RegisterResponse;
  }

  let json: BackendErrorResponse;
  try {
    json = await res.json();
  } catch {
    // Fallback if the response isn't valid JSON
    throw new ApiError(`Request failed with status ${res.status}`, res.status);
  }

  const fieldErrors: Record<string, string> = {};

  if (json.details) {
    if (Array.isArray(json.details)) {
      // Fallback in case details is an array (e.g., standard validation errors)
      for (const detail of json.details) {
        if (detail.field && detail.message) {
          fieldErrors[detail.field] = detail.message;
        }
      }
    } else if (json.details.field) {
      // Handle the specific object structure: { field: "email" }
      fieldErrors[json.details.field] = json.message || json.details.field;
    }
  }

  throw new ApiError(
    json.message || `Request failed (${res.status})`,
    res.status,
    {
      errorCode: json.error_code,
      fieldErrors,
      details: json.details,
    }
  );
}


export interface ActivateResponse {
  user_id: string;
  status: string;
  message: string;
}

interface ActivateErrorResponse {
  success: boolean;
  error_code: string;
  message: string;
  details: unknown;
}

export async function activateUser(token: string): Promise<ActivateResponse> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/activate/${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.ok) {
    return (await res.json()) as ActivateResponse;
  }

  let json: Partial<ActivateErrorResponse> = {};
  try {
    json = await res.json();
  } catch {
  }

  throw new ApiError(
    json.message || 'Activation failed. The link may be expired or invalid.',
    res.status,
    {
      errorCode: json.error_code,
      details: json.details,
    }
  );
}
