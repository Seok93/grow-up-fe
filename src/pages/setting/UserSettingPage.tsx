import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { USER_INFO_DUMMY } from '@mocks/mockData';
import { USER_AUTH_VALIDATION_RULES } from '@constants/formValidationRules';
import ValidationInput from '@components/common/ValidationInput';
import ProfileImageContainer from '@/components/user/auth-form/ProfileImageContainer';
import LinkContainer from '@/components/user/auth-form/LinkContainer';
import type { EditUserInfoForm } from '@/types/UserType';

export default function UserSettingPage() {
  const [imageUrl, setImageUrl] = useState(USER_INFO_DUMMY.profileUrl);
  const methods = useForm<EditUserInfoForm>({
    mode: 'onChange',
    defaultValues: {
      id: USER_INFO_DUMMY.id,
      email: USER_INFO_DUMMY.email,
      nickname: USER_INFO_DUMMY.nickname,
      bio: USER_INFO_DUMMY.bio,
      links: USER_INFO_DUMMY.links,
      profileUrl: USER_INFO_DUMMY.profileUrl,
    },
  });

  // form 전송 함수
  const onSubmit = async (data: EditUserInfoForm) => {
    const { id, email, profileUrl, ...filteredData } = data;
    console.log(data);

    // TODO: 폼 제출 로직 작성
  };

  return (
    <FormProvider {...methods}>
      <div className="my-30">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mx-auto max-w-300 space-y-8">
          {/* 프로필 이미지 */}
          <ProfileImageContainer imageUrl={imageUrl} setImageUrl={setImageUrl} />

          {/* 아이디 */}
          <ValidationInput
            disabled
            label="아이디"
            required={false}
            errors={methods.formState.errors.id?.message}
            register={methods.register('id', USER_AUTH_VALIDATION_RULES.ID)}
          />

          {/* 이메일 */}
          <ValidationInput
            disabled
            label="이메일"
            required={false}
            errors={methods.formState.errors.email?.message}
            register={methods.register('email', USER_AUTH_VALIDATION_RULES.EMAIL)}
          />

          {/* 닉네임, 중복 확인 */}
          <ValidationInput
            label="닉네임"
            required={false}
            errors={methods.formState.errors.nickname?.message}
            register={methods.register('nickname', USER_AUTH_VALIDATION_RULES.NICKNAME)}
            isButtonInput
            buttonLabel="중복확인"
          />

          {/* 자기소개 */}
          <section>
            <label htmlFor="bio" className="font-bold">
              자기소개
            </label>
            <textarea
              {...methods.register('bio')}
              id="bio"
              placeholder="ex) 안녕하세요. 홍길동입니다."
              className="block h-70 w-full resize-none rounded-lg border border-input p-8 text-sm outline-none placeholder:text-emphasis"
            />
          </section>

          {/* 링크 */}
          <LinkContainer initialLinks={USER_INFO_DUMMY.links} />

          {/* 개인정보 수정 버튼 */}
          <button
            type="submit"
            className="h-25 w-full rounded-lg bg-sub px-8 font-bold"
            disabled={methods.formState.isSubmitting}
          >
            변경
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
