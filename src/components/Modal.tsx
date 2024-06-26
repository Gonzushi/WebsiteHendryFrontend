import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/solid";

type modalProps = {
  children?: JSX.Element;
  title: string;
  showModal: boolean;
  updateShowModal: () => void;
};

export default function ModalAdd(props: modalProps) {
  const styleMainModal = clsx(
    !props.showModal && "hidden",
    "fixed left-0 top-0 z-50 h-dvh w-full content-center p-8",
  );

  return (
    <>
      {/* <!-- Main modal --> */}
      <div className={styleMainModal}>
        <div className="mx-auto h-full w-full max-w-2xl content-center p-4 md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg border border-gray-300 bg-white p-4 shadow sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {props.title}
              </h3>
              <button onClick={() => props.updateShowModal()}>
                <XMarkIcon className="h-8 w-8 rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-primary-600" />
              </button>
            </div>
            {/* <!-- Modal body --> */}
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
