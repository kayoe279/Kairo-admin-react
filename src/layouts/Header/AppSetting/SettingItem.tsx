interface SettingItemProps {
  title: string;
  children: React.ReactNode;
}

export const SettingItem = ({ title, children }: SettingItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{title}</span>
      {children}
    </div>
  );
};
