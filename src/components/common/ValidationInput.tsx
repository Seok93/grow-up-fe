import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

/**
 * ValidationInput 컴포넌트 params, 모든 params는 optional
 *
 * @params {string} [label] - 입력 필드의 label 텍스트
 * @params {boolean} [required] - 입력 필드 필수 여부
 * @params {string} [errors] - 유효성 검증 후 오류 발생 시 표시할 오류 메시지
 * @params {UseFormRegisterReturn} [register] - react-hook-form의 resister 함수.
 *         register('password', {required: ...})부분을 그대로 파라미터에 넣으면 됩니다.
 * @params {string} [type] - 입력 필드의 유형(ex: text, password). 기본값은 'text'
 * @params {string} [placeholder] - 입력 필드의 placeholder 텍스트
 * @params {boolean} [isButtonInput] - 버튼이 포함된 입력 필드인지 여부. 기본값은 'false'
 * @params {React.ReactNode} [buttonLabel] - 버튼에 표시할 텍스트 또는 아이콘
 * @params {() => void} [onButtonClick] - 버튼 클릭 시 호출할 함수
 *
 * 예시) 
 * <ValidationInput
      label="비밀번호 확인"
      errors={errors.checkPassword?.message}
      register={register('checkPassword', {
        required: '비밀번호를 한 번 더 입력해 주세요.',
        validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
      })}
      type="password"
    />
 */

type ValidationInputProps = {
  label?: string;
  required?: boolean;
  errors?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  isButtonInput?: boolean;
  buttonLabel?: React.ReactNode;
  onButtonClick?: () => void;
};

export default function ValidationInput({
  label,
  required = true,
  errors,
  register,
  type = 'text',
  placeholder,
  isButtonInput = false,
  buttonLabel,
  onButtonClick,
}: ValidationInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-row gap-1">
        {label && (
          <label htmlFor={label} className="font-bold">
            {label}
            {required && <sup className="font-bold text-main">*</sup>}
          </label>
        )}
      </div>
      <div
        className={`flex h-30 items-center rounded-lg border px-6 text-sm ${
          errors ? 'border-2 border-error' : 'border-input'
        }`}
      >
        <div className="flex h-full w-full flex-row items-center gap-8">
          <input
            id={label}
            {...register}
            type={type === 'password' && showPassword ? 'text' : type}
            placeholder={placeholder}
            className="h-full grow bg-inherit outline-none placeholder:text-default"
          />
          {type === 'password' && (
            <div className="flex h-20 w-20 items-center text-gray-400">
              {showPassword ? (
                <RiEyeFill className="h-15 w-15 cursor-pointer" onClick={handleTogglePassword} />
              ) : (
                <RiEyeOffFill className="h-15 w-15 cursor-pointer" onClick={handleTogglePassword} />
              )}
            </div>
          )}
          {isButtonInput && (
            <button
              type="button"
              className="flex h-20 w-75 items-center justify-center rounded bg-sub px-8 font-bold shadow-md"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
      {errors && <p className="mt-[.5rem] text-sm text-error">{errors}</p>}
    </div>
  );
}