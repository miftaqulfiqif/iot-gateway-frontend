type MenuSettingsProps = {
  title: string;
  icon: string | React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
};

export const MenuSettings = ({
  title,
  icon,
  isActive,
  onClick,
  className,
}: MenuSettingsProps) => {
  const isStringIcon = typeof icon === "string";

  return (
    <div
      onClick={onClick}
      className={`flex flex-row gap-4 items-center w-3xs rounded-4xl px-6 py-2 cursor-pointer 
      ${
        isActive
          ? "border-2 border-[#0D00FF] scale-105 bg-[#f0faff]"
          : "border-none"
      }
      transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#f0f0f0] ${className}`}
    >
      {isStringIcon ? (
        <img src={icon} className="w-8 h-8" alt={title + " icon"} />
      ) : (
        <span className="w-8 h-8 flex items-center justify-center">{icon}</span>
      )}
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};
