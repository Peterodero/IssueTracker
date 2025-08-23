
export default function NotificationModal({error, title, handleSubmit, mesg}) {
  console.log(mesg)

  return (
    <div>
      {error ? <div className="error-message">{error}</div> : <div><h2 className="text-2xl">{title}</h2></div>}
      <form onSubmit={handleSubmit} className="space-y-6 flex justify-between">
        <div>
          <p>{mesg}</p>
        </div>
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
