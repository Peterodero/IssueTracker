import Modal from "./UI/Modal";

export default function DeleteConfirmation({text, content, handleDelete, closeDeleteModal}) {
  return (
    <Modal>
      <div className=" p-1 rounded-lg max-w-sm mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirm Action
        </h3>
        {content}
        <p className="text-sm text-gray-700 mb-6">
         {text}
        </p>
        <div className="flex justify-between space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2bg-red-500 bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
