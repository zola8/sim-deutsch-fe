import RegisterForm from '../../components/users/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?
          <a href="/login" className="ml-1 font-semibold text-rose-600 hover:text-rose-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
