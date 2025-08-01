import { useLocation, useNavigate} from "react-router-dom";
import Modal from "../UI/Modal";
import { url } from "../../util/http";
import { useEffect, useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function ViewAttachment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  // Get attachment path from location state
  const attachmentPath = location.state?.attachmentUrl;

  useEffect(() => {
    if (!attachmentPath) {
      setError("No attachment found");
      setLoading(false);
      return;
    }

    const fetchImage = async () => {
      try {
        // Create authenticated URL with timestamp to prevent caching issues
        const fullUrl = `${url}${attachmentPath}?t=${Date.now()}`;
        
        // Verify the image exists and is accessible
        const response = await fetch(fullUrl, {
          method: 'HEAD',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Attachment not found or inaccessible');
        }

        // If HEAD request succeeds, set the image URL
        setImageUrl(fullUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [attachmentPath, accessToken]);

  if (loading) {
    return (
      <Modal>
        <div className="flex justify-center items-center h-64">
          <LoadingIndicator />
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal>
        <div className="p-4">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </Modal>
    );
  }

  const isImage = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(attachmentPath);
  const isPDF = attachmentPath.toLowerCase().endsWith('.pdf');

  return (
    <Modal>
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Attachment</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
        
        <div className="max-h-[80vh] overflow-auto flex justify-center items-center">
          {isImage ? (
            <img 
              src={imageUrl}
              alt="Attachment" 
              className="max-w-full max-h-[70vh] object-contain"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.png';
                setError('Failed to load image');
              }}
            />
          ) : isPDF ? (
            <iframe 
              src={`${url}/api/pdf-viewer?file=${encodeURIComponent(attachmentPath)}`}
              className="w-full h-[70vh] border-0"
              title="PDF Viewer"
            />
          ) : (
            <div className="p-4 bg-gray-100 rounded text-center">
              <p className="mb-2">Unsupported file type</p>
              <a 
                href={imageUrl}
                download
                className="px-4 py-2 bg-blue-500 text-white rounded inline-block hover:bg-blue-600"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}