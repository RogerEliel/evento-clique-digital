
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PhotoUploaderProps {
  onUploadComplete?: (files: File[]) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter for only image files
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
    setError('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      setError('Por favor, adicione fotos antes de fazer upload.');
      return;
    }

    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          if (onUploadComplete) onUploadComplete(files);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="bg-seuclique-coral/10 text-seuclique-coral p-4 rounded-md flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-seuclique-turquoise bg-seuclique-turquoise/5' 
            : 'border-gray-300 hover:border-seuclique-turquoise hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload size={48} className="text-seuclique-silver" />
          <div>
            <p className="text-lg font-medium text-seuclique-darkslate">
              Arraste e solte as fotos aqui
            </p>
            <p className="text-seuclique-silver">
              ou clique para selecionar fotos
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <>
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50 flex justify-between">
              <h3 className="font-medium">{files.length} foto{files.length > 1 ? 's' : ''} selecionada{files.length > 1 ? 's' : ''}</h3>
              <button 
                onClick={() => setFiles([])} 
                className="text-seuclique-silver hover:text-seuclique-coral text-sm"
              >
                Remover todas
              </button>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-3">
                    <Image size={20} className="text-seuclique-silver" />
                    <span className="text-seuclique-darkslate truncate max-w-md">{file.name}</span>
                    <span className="text-xs text-seuclique-silver">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-seuclique-silver hover:text-seuclique-coral"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="bg-seuclique-turquoise hover:bg-seuclique-turquoise/90 text-white flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>Iniciar Upload</span>
                </>
              )}
            </Button>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-seuclique-silver">
                <span>{progress}%</span>
                <span>{Math.floor((files.length * progress) / 100)} de {files.length} fotos</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoUploader;
