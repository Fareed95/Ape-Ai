interface GlowingBorderProps {
  children: React.ReactNode;
}

export const GlowingBorder = ({ children }: GlowingBorderProps) => (
  <div className="relative group w-full">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
    {children}
  </div>
);