import { useRegisterForm, type FormField } from '../../hooks/useRegisterForm';

const inputClass =
  'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-olive-600 sm:text-sm/6';

interface FieldProps {
  id: FormField;
  label: string;
  type: string;
  value: string;
  error?: string;
  touched?: boolean;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean
}

function FormFieldUI({ id, label, type, value, error, touched, autoComplete, onChange, onBlur }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
        {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default function RegisterForm() {
  const {
    formData,
    errors,
    touched,
    submitting,
    serverError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {serverError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <FormFieldUI
        id="email"
        label="Email address"
        type="email"
        value={formData.email}
        error={errors.email}
        touched={touched.email}
        autoComplete="email"
        onChange={(v) => handleChange('email', v)}
        onBlur={() => handleBlur('email')}
        disabled={submitting}
      />
      <FormFieldUI
        id="username"
        label="Username"
        type="text"
        value={formData.username}
        error={errors.username}
        touched={touched.username}
        autoComplete="username"
        onChange={(v) => handleChange('username', v)}
        onBlur={() => handleBlur('username')}
        disabled={submitting}
      />
      <FormFieldUI
        id="password"
        label="Password"
        type="password"
        value={formData.password}
        error={errors.password}
        touched={touched.password}
        autoComplete="new-password"
        onChange={(v) => handleChange('password', v)}
        onBlur={() => handleBlur('password')}
        disabled={submitting}
      />
      <FormFieldUI
        id="passwordRepeat"
        label="Confirm Password"
        type="password"
        value={formData.passwordRepeat}
        error={errors.passwordRepeat}
        touched={touched.passwordRepeat}
        autoComplete="new-password"
        onChange={(v) => handleChange('passwordRepeat', v)}
        onBlur={() => handleBlur('passwordRepeat')}
        disabled={submitting}
      />
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full justify-center rounded-md bg-olive-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-olive-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-600"
        >
          {submitting ? 'Creating account...' : 'OK'}
        </button>
      </div>
    </form>
  );
}
