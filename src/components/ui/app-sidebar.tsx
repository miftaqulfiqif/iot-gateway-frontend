type AppSidebarProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  url: string;
  isHide?: boolean;
};

const AppSidebar = ({
  icon,
  title,
  isActive,
  url,
  isHide,
}: AppSidebarProps) => {
  return (
    <a href={url}>
      <div
        className={`group relative flex items-center gap-2 px-3 py-2 rounded-2xl cursor-pointer transition-all duration-200 
        hover:shadow-xl hover:scale-[1.03] hover:z-10 hover:bg-[#f0f0f0] ${
          isActive
            ? "bg-gradient-to-b from-[#6e79f4] to-[#4956F4] text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            : ""
        } ${isHide ? "justify-center" : ""}`}
      >
        {icon}
        {!isHide && <p className="text-sm">{title}</p>}
      </div>
    </a>
  );
};

export default AppSidebar;
