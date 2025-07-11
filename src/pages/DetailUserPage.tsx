import { useParams } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";

const DetailUserPage = () => {
  const { userId } = useParams();

  return (
    <MainLayout title="Detail Users" state="Users">
      <div className="flex flex-col gap-6 w-full pb-5">
        <p>Detail Users : {userId}</p>
      </div>
    </MainLayout>
  );
};

export default DetailUserPage;
