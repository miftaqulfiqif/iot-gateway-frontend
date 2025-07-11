type AppSidebarProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  url: string;
};
const AppSidebar = ({ icon, title, isActive, url }: AppSidebarProps) => {
  return (
    <a href={url}>
      <div
        className={`flex flex-row items-center gap-2 px-5 py-2 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.03] hover:z-10  hover:bg-[#f0f0f0] ${
          isActive
            ? "bg-gradient-to-b from-[#6e79f4] to-[#4956F4] text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            : ""
        }`}
      >
        {icon}
        <p>{title}</p>
      </div>
    </a>
  );
};

export default AppSidebar;
