const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full bg-sky-400">
      {children}
    </div>
  );
};

export default AuthLayout;
