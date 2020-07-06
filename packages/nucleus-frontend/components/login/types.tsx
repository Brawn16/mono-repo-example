export interface LoginProps {
  onSuccess?: () => void;
}

export type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};
