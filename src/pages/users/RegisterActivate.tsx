import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { activateUser, ApiError } from '../../api/users';

export default function RegisterActivatePage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const { email, successMessage } = (location.state as { email?: string; successMessage?: string }) || {};

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      const performActivation = async () => {
        setIsLoading(true);
        try {
          await activateUser(token);
          setIsSuccess(true);
        } catch (err) {
          const errorMessage = err instanceof ApiError
            ? err.message
            : 'Failed to activate account. Please try again.';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      performActivation();
    }
  }, [token]);

  // Shared button class matching your Register form
  const buttonClass = "flex w-full justify-center rounded-md bg-olive-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-olive-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-600 disabled:opacity-50 disabled:cursor-not-allowed";

  // Shared link/button class for secondary actions
  const linkClass = "mt-4 flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-olive-600 shadow-sm ring-1 ring-inset ring-olive-600 hover:bg-olive-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-600";

  // --- RENDER STATES ---

  // State 1: Activating...
  if (isLoading) {
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 text-center space-y-4">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-olive-600 border-t-transparent"></div>
            <p className="text-base font-medium text-gray-900">Activating your account...</p>
            <p className="text-sm text-gray-500">Please wait a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Activation Successful
  if (isSuccess) {
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 text-center space-y-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Account Activated!</h2>
              <p className="mt-2 text-sm text-gray-600">
                Your account has been successfully activated and is ready to use.
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className={buttonClass}
            >
              Proceed to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Activation Failed
  if (error) {
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 text-center space-y-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Activation Failed</h2>
              <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700 text-left">
                {error}
              </div>
            </div>
            <button
              onClick={() => navigate('/register')}
              className={buttonClass}
            >
              Return to Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  // State 4: No token in URL (User just registered, or navigated directly)
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Check Your Email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent you an email with instructions to activate your account.
            </p>
          </div>

          {successMessage && (
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          {email && (
            <div className="rounded-md bg-olive-50 p-4 text-sm text-olive-800">
              <p className="font-medium">Email sent to:</p>
              <p className="mt-1 font-semibold text-olive-900">{email}</p>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 space-y-1">
            <p>Didn't receive the email?</p>
            <p>Check your spam or junk folder, or ensure you entered the correct address.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/register')}
              className={linkClass}
            >
              Back to Registration
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-olive-600 hover:text-olive-500 w-full text-center"
            >
              Already activated? Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
