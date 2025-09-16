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
import { useSatusehat } from "@/hooks/api/use-satusehat";
import { useFormik } from "formik";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";

export const SatusehatSetting = () => {
  const {
    organizationId,
    clientId,
    clientSecret,
    getDataSatuSehat,
    updateDataSatuSehat,
  } = useSatusehat();

  const [showOrganizationId, setShowOrganizationId] = useState(false);
  const [showClientId, setShowClientId] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    getDataSatuSehat();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      organization_id: organizationId || "",
      client_id: clientId || "",
      client_secret: clientSecret || "",
    },
    onSubmit: (values) => {
      console.log(values);
      updateDataSatuSehat(values);
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-bold">SATUSEHAT Integration</p>
      <p className="bg-gray-200 p-4 rounded-lg text-base text-gray-500">
        SATU SEHAT is Indonesia's national health data exchange platform.
        Configure your API credentials to enable data synchronization.
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold">Enable SATUSEHAT Integration</p>
          <p>Connect to Indonesia's national health database</p>
        </div>
        <div
          className={`flex rounded-full w-12 h-6 cursor-pointer items-center p-1 transition-colors duration-300 ${
            isEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              isEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Organization ID</p>
            <div className="flex gap-2 items-center">
              <input
                name="organization_id"
                className="text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Input your organization ID"
                value={formik.values.organization_id}
                onChange={formik.handleChange}
                type={showOrganizationId ? "text" : "password"}
              />
              {showOrganizationId ? (
                <EyeClosed
                  onClick={() => setShowOrganizationId(false)}
                  className="cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowOrganizationId(true)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Client ID</p>
            <div className="flex gap-2 items-center">
              <input
                name="client_id"
                className="text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Input your client ID"
                value={formik.values.client_id}
                onChange={formik.handleChange}
                type={showClientId ? "text" : "password"}
              />
              {showClientId ? (
                <EyeClosed
                  onClick={() => setShowClientId(false)}
                  className="cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowClientId(true)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Client Secret</p>
            <div className="flex gap-2 items-center">
              <input
                name="client_secret"
                className="text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Input your client secret"
                value={formik.values.client_secret}
                onChange={formik.handleChange}
                type={showClientSecret ? "text" : "password"}
              />
              {showClientSecret ? (
                <EyeClosed
                  onClick={() => setShowClientSecret(false)}
                  className="cursor-pointer"
                />
              ) : (
                <Eye
                  onClick={() => setShowClientSecret(true)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <button className="flex-1 border-2 border-blue-500 text-blue-500 p-2 rounded-xl font-bold cursor-pointer mt-10 disabled:bg-blue-200 disabled:cursor-not-allowed hover:bg-gray-50">
            Test Connection
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex-1 bg-blue-500 text-white p-2 rounded-xl font-bold cursor-pointer mt-10 disabled:bg-blue-200 disabled:cursor-not-allowed">
                Save Changes
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Change a SATUSEHAT will replace the current SATUSEHAT is{" "}
                  {isEnabled ? (
                    <span className="text-green-600 font-bold">ENABLED</span>
                  ) : (
                    <span className="text-red-600 font-bold">DISABLED</span>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="text-black border">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  className="bg-blue-500 text-white"
                >
                  Change
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
