import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const SatusehatSetting = () => {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-bold">SATUSEHAT Platform Setting</p>
      {/* Content */}
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Organization ID</p>
            <input
              className=" bg-gray-100 text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Input your organization ID"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Client ID</p>
            <input
              className=" bg-gray-100 text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Input your client ID"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Client Secret</p>
            <input
              className=" bg-gray-100 text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Input your client secret"
            />
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="bg-blue-500 text-white p-2 rounded-xl font-bold cursor-pointer mt-10 disabled:bg-blue-200 disabled:cursor-not-allowed">
              Save Changes
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Change a gateway will replace the current gateway
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-black border">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {}}
                className="bg-blue-500 text-white"
              >
                Change
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
