
export default function NotificationModal({error, handleSubmit}) {

  return (
    <div>
      {error ? <div className="error-message">{error}</div> : <div>Issue resolved successfully</div>}
      <form onSubmit={handleSubmit} className="space-y-6 flex justify-between">
        <div></div>
        <div className="space-y-2">
          <button
            type="submit"
            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Okay
          </button>
        </div>
      </form>
    </div>
  );
}
