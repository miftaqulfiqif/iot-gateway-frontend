import { useAuth } from "@/context/AuthContext";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  className?: string;
  title: string;
}

export const Header = ({ className, title }: NavbarProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(title);
  }, [title]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsMounted(false), 300);
    }
  }, [isOpen]);

  return (
    <nav className={`h-30 flex items-center ${className}`}>
      <div className="flex flex-row justify-between w-full mx-10">
        <div className="flex flex-row items-center">
          <p className="text-3xl font-bold">{state}</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full p-4 hover:bg-gray-100">
            <Bell />
          </div>
          <div className="flex flex-row gap-5 p-5 items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UtRnIwPFHN2qIv5B3PP5cPMVbLKQYxd8j7eRCElLzErsAJCo4I1jEgAX2iQP-QFu1-M&usqp=CAU"
              alt=""
              className="w-18 h-18 rounded-full object-cover shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">{user?.name}</p>
              <p className="text-gray-500 text-base">{user?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
