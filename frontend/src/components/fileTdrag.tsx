import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

interface FileDropzoneProps {
  onDrop?: (acceptedFiles: File[]) => void;
  accept?: string;
  multiple?: boolean;
  onRemove?: () => void;
  className?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onDrop,
  // accept = "image/*",
  multiple = false,
  onRemove,
  className = "",
}) => {
  const [dataURL, setDataURL] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result as string;
        setDataURL(binaryStr);
        if (onDrop) onDrop(acceptedFiles);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    // accept,
    multiple,
  });

  return (
    <div className={`max-w-2lg mx-auto mt-4 ${className}`}>
      <div className="rounded w-full flex justify-center items-center overflow-hidden border border-blue-500 border-dashed">
        {dataURL ? (
          <div className="selected relative">
            <img
              src={dataURL}
              className="w-full max-h-100 bg-cover bg-center block rounded-inherit"
              alt="Uploaded Preview"
            />
            <Button
              variant={"ghost"}
              className="mt-2"
              onClick={() => {
                setDataURL(null);
                if (onRemove) onRemove();
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div
            className="drop-zone w-full h-full cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="drop-files rounded-inherit w-full h-36 flex justify-center items-center transition-colors duration-300 bg-gray-800 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="50"
                  width="50"
                  fill="currentColor"
                >
                  <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
                </svg>
              </div>
            ) : (
              <div className="drag-files rounded-inherit w-full h-36 flex justify-center items-center transition-colors duration-300 text-gray-400">
                Drop your files here or click to browse
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
