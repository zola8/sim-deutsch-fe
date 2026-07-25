import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterActivatePage from '../../../pages/users/RegisterActivate';
import { useSearchParams, useLocation } from 'react-router-dom';
import { activateUser, ApiError } from '../../../api/users';


// Mock the module, preserving the real ApiError class for `instanceof` checks

vi.mock('../../../api/users', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../api/users')>();
  return {
    ...actual,
    activateUser: vi.fn(), // Only mock the function we need to control
  };
});

// Mock react-router-dom hooks

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
  useLocation: vi.fn(),
  useNavigate: () => mockNavigate,
}));

const mockUseSearchParams = vi.mocked(useSearchParams);
const mockUseLocation = vi.mocked(useLocation);



describe('RegisterActivatePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupRedirectScenario = (email?: string, message?: string) => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);
    mockUseLocation.mockReturnValue({
      state: { email, successMessage: message }
    } as any);
  };

  const setupEmailLinkScenario = (token: string) => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams(`token=${token}`), vi.fn()]);
    mockUseLocation.mockReturnValue({ state: null } as any);
  };


  it('shows "Check Your Email" when redirected from the registration form', () => {
    setupRedirectScenario('user@example.com', 'Registration successful!');

    render(<RegisterActivatePage />);

    expect(screen.getByText('Check Your Email')).toBeInTheDocument();
    expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to registration/i })).toBeInTheDocument();
  });


  it('shows loading state and then success when token is valid', async () => {
    setupEmailLinkScenario('valid-jwt-token');

    vi.mocked(activateUser).mockResolvedValue({
      user_id: '123',
      status: 'ACTIVE',
      message: 'Success'
    });

    render(<RegisterActivatePage />);

    expect(screen.getByText('Activating your account...')).toBeInTheDocument();
    expect(activateUser).toHaveBeenCalledWith('valid-jwt-token');

    await waitFor(() => {
      expect(screen.getByText('Account Activated!')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /proceed to login/i })).toBeInTheDocument();
  });


  it('shows loading state and then error when token is invalid', async () => {
    setupEmailLinkScenario('expired-jwt-token');

    vi.mocked(activateUser).mockRejectedValue(
      new ApiError('Invalid or expired activation token', 400, { errorCode: 'AUTHENTICATION_FAILED' })
    );

    render(<RegisterActivatePage />);

    expect(screen.getByText('Activating your account...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Activation Failed')).toBeInTheDocument();
      expect(screen.getByText('Invalid or expired activation token')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /return to registration/i })).toBeInTheDocument();
  });


  it('navigates correctly when buttons are clicked', async () => {
    const user = userEvent.setup();
    setupRedirectScenario();

    render(<RegisterActivatePage />);

    await user.click(screen.getByRole('button', { name: /back to registration/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/register');

    await user.click(screen.getByRole('button', { name: /already activated\? go to login/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });


  it('navigates to login on success button click', async () => {
    const user = userEvent.setup();
    setupEmailLinkScenario('valid-token');

    vi.mocked(activateUser).mockResolvedValue({
      user_id: '1',
      status: 'ACTIVE',
      message: 'ok'
    });

    render(<RegisterActivatePage />);

    await waitFor(() => {
      expect(screen.getByText('Account Activated!')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /proceed to login/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

});
