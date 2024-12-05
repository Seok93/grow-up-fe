import { FormEvent, ReactNode } from 'react';

type AuthFormLayoutProps = {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export default function AuthFormLayout({ children, onSubmit }: AuthFormLayoutProps) {
  return (
    <>
      <section className="text-large text-main">
        Grow Up!
        <br />
        follow us!
      </section>
      <form onSubmit={onSubmit} className="flex w-300 grow flex-col justify-center gap-8">
        {children}
      </form>
    </>
  );
}
