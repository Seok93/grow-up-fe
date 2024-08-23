import { useForm } from 'react-hook-form';
import AuthFormLayout from '@layouts/AuthFormLayout';
import { USER_AUTH_VALIDATION_RULES } from '@constants/formValidationRules';
import ValidationInput from '@components/common/ValidationInput';
import FooterLinks from '@components/user/auth-form/FooterLinks';
import type { SearchPasswordForm } from '@/types/UserType';

export default function SearchPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchPasswordForm>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      email: '',
      code: '',
    },
  });

  const onSubmit = (data: SearchPasswordForm) => {
    console.log(data);
  };

  return (
    <AuthFormLayout onSubmit={handleSubmit(onSubmit)} marginTop="mt-34.9">
      {/* 아이디 */}
      <ValidationInput
        placeholder="아이디"
        errors={errors.id?.message}
        register={register('id', USER_AUTH_VALIDATION_RULES.ID)}
      />

      {/* 이메일 */}
      <ValidationInput
        isButtonInput
        buttonLabel="인증번호 발송"
        placeholder="이메일"
        errors={errors.email?.message}
        register={register('email', USER_AUTH_VALIDATION_RULES.EMAIL)}
      />

      {/* 이메일 인증 */}
      <ValidationInput
        placeholder="인증번호"
        errors={errors.code?.message}
        register={register('code', USER_AUTH_VALIDATION_RULES.CERTIFICATION)}
      />

      <button type="submit" className="auth-btn" disabled={isSubmitting}>
        비밀번호 찾기
      </button>

      <FooterLinks type="searchPassword" />
    </AuthFormLayout>
  );
}
