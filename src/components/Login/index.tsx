import { TextField } from '@mui/material';
import { useState } from 'react';
import { emailRegEx } from '@/common/constants/regex';
import { color } from '@/theme/color';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import LoginFormContainer, {
  LoginFormBox,
  LoginFormErrorText,
  LoginGrid,
  LoginMainBox,
} from './Container';
import PrimaryBlueButton from '../Button/PrimaryBlueButton';
import { useMutation } from 'react-query';
import useAuthStore from '@/store/auth.store';
import { logo } from '@/assets/images';
import login from '@/queries/auth';
import Footer from '../Common/Footer';
export default function Login() {
  const router = useRouter();
  const [secretKey, setSecretKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isManagerEmail, setIsManagerEmail] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleButtonClick = async () => {
    // email check
    const isValid = email.trim() !== '' && emailRegEx.test(email);
    setIsValidEmail(isValid);

    if (isValid) {
      loginMutate.mutate({
        email,
        password,
      });
    }
  };

  const loginMutate = useMutation(
    async (body: any) => {
      const response = await login(body);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAccessToken(data.token);
        updateUser(data.userInfo);
        router.replace('/receiptsetting');
        console.log('onSuccess: loginMutate');
      },
      onError: (error) => {
        console.error('onError', error);
      },
    },
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidEmail(true);
    setIsManagerEmail(true);
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^\w-@.]/g, '');
    const trimmedValue = sanitizedValue.trim();
    setEmail(trimmedValue);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <LoginGrid>
      <LoginMainBox>
        <form>
          <LoginFormBox>
            <img width={400} height={100} src={logo.src} />
            {/* <LogoWorkForHyundai /> */}

            <LoginFormContainer>
              <TextField
                label={t('login:email')}
                value={email}
                variant="outlined"
                onChange={handleEmailChange}
                inputProps={{ maxLength: 63 }}
                sx={{
                  height: '56px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    fontFamily: 'Hyundai Sans Head Regular',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '24px',
                    color: isManagerEmail
                      ? color.text.black
                      : color.secondary.active_red,
                  },
                  '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                    color: color.text.black_40,
                  },
                  '& fieldset': {
                    borderRadius: '8px',
                    border: '1px solid #11111126',
                  },
                  '&:focus': {
                    border: '1px solid #11111126',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    border: '1px solid #11111126',
                    color: isManagerEmail
                      ? color.text.black
                      : color.secondary.active_red,
                  },
                  '& .MuiFormLabel-root.MuiInputLabel-root': {
                    fontFamily: 'Hyundai Sans Head Regular',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '24px',
                    color: color.text.black_40,
                  },
                  '& .MuiOutlinedInput-root:hover fieldset': {
                    border: '1px solid #11111126',
                  },
                  '& .MuiFormHelperText-root': {
                    margin: 0,
                    color: color.secondary.active_red,
                  },
                  '& input:-webkit-autofill': {
                    '-webkit-box-shadow': '0 0 0 100px white inset',
                    WebkitTextFillColor: color.text.black,
                    '-webkit-text-fill-color': 'none',
                  },
                }}
              />
              <TextField
                type="password"
                label={t('login:password')}
                value={password}
                variant="outlined"
                onChange={handlePasswordChange}
                inputProps={{ maxLength: 63 }}
                sx={{
                  height: '56px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    fontFamily: 'Hyundai Sans Head Regular',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '24px',
                    color: isManagerEmail
                      ? color.text.black
                      : color.secondary.active_red,
                  },
                  '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
                    color: color.text.black_40,
                  },
                  '& fieldset': {
                    borderRadius: '8px',
                    border: '1px solid #11111126',
                  },
                  '&:focus': {
                    border: '1px solid #11111126',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    border: '1px solid #11111126',
                    color: isManagerEmail
                      ? color.text.black
                      : color.secondary.active_red,
                  },
                  '& .MuiFormLabel-root.MuiInputLabel-root': {
                    fontFamily: 'Hyundai Sans Head Regular',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '24px',
                    color: color.text.black_40,
                  },
                  '& .MuiOutlinedInput-root:hover fieldset': {
                    border: '1px solid #11111126',
                  },
                  '& .MuiFormHelperText-root': {
                    margin: 0,
                    color: color.secondary.active_red,
                  },
                  '& input:-webkit-autofill': {
                    '-webkit-box-shadow': '0 0 0 100px white inset',
                    WebkitTextFillColor: color.text.black,
                    '-webkit-text-fill-color': 'none',
                  },
                }}
                onKeyDown={handleEnterPress}
              />
              {!isValidEmail && (
                <LoginFormErrorText>
                  {t('login:enter_correct_email')}
                </LoginFormErrorText>
              )}
              {!isManagerEmail && (
                <LoginFormErrorText>
                  {t('login:not_registered')}
                </LoginFormErrorText>
              )}
              {isError && <LoginFormErrorText>{errorMsg}</LoginFormErrorText>}
            </LoginFormContainer>

            <PrimaryBlueButton
              text={t('login:login')}
              type="button"
              size="large"
              disabled={!(isValidEmail && email && isManagerEmail && password)}
              onClick={handleButtonClick}
            />
          </LoginFormBox>
        </form>
      </LoginMainBox>
      <Footer />
    </LoginGrid>
  );
}
