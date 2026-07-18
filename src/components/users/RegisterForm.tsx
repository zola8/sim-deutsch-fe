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
  onChange: (value: string) => void;
  onBlur: () => void;
}

function FormFieldUI({ id, label, type, value, error, touched, onChange, onBlur }: FieldProps) {
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
  const { formData, errors, touched, handleChange, handleBlur, handleSubmit } =
    useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFieldUI
        id="email"
        label="Email address"
        type="email"
        value={formData.email}
        error={errors.email}
        touched={touched.email}
        onChange={(v) => handleChange('email', v)}
        onBlur={() => handleBlur('email')}
      />
      <FormFieldUI
        id="username"
        label="Username"
        type="text"
        value={formData.username}
        error={errors.username}
        touched={touched.username}
        onChange={(v) => handleChange('username', v)}
        onBlur={() => handleBlur('username')}
      />
      <FormFieldUI
        id="password"
        label="Password"
        type="password"
        value={formData.password}
        error={errors.password}
        touched={touched.password}
        onChange={(v) => handleChange('password', v)}
        onBlur={() => handleBlur('password')}
      />
      <FormFieldUI
        id="passwordRepeat"
        label="Confirm Password"
        type="password"
        value={formData.passwordRepeat}
        error={errors.passwordRepeat}
        touched={touched.passwordRepeat}
        onChange={(v) => handleChange('passwordRepeat', v)}
        onBlur={() => handleBlur('passwordRepeat')}
      />
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-olive-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-olive-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-600"
        >
          OK
        </button>
      </div>
    </form>
  );
}
