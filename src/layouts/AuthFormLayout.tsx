import { FormEvent, ReactNode } from 'react';

type AuthFormLayoutProps = {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function AuthFormLayout({ children, onSubmit }: AuthFormLayoutProps) {
  return (
    <>
      <section className="text-large text-main">
        환영합니다.
        <br />
        우리와 함께 당신의 삶을 한층 더 성장시켜보세요!
      </section>
      <form onSubmit={onSubmit} className="flex w-300 grow flex-col justify-center gap-8">
        {children}
      </form>
    </>
  );
}
