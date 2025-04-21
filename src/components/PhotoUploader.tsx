
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface PhotoUploaderProps {
  eventId: string;
  onUploadComplete: () => void;
  onUploadError: (error: Error) => void;
}

export function PhotoUploader({ eventId, onUploadComplete, onUploadError }: PhotoUploaderProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let processed = 0;
      const total = files.length;

      for (const file of files) {
        await eventsService.uploadPhotos(eventId, [file]);
        processed++;
        setUploadProgress((processed / total) * 100);
      }

      toast({
        title: "Upload concluído",
        description: `${files.length} fotos foram enviadas com sucesso.`,
      });

      setFiles([]);
      onUploadComplete();
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar algumas fotos.",
        variant: "destructive",
      });
      onUploadError(error as Error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-[#52E0A1] bg-[#52E0A1]/10' : 'border-gray-300 hover:border-[#52E0A1]'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Arraste suas fotos aqui ou clique para selecionar
        </p>
        <p className="text-xs text-gray-500">
          JPG, PNG ou GIF até 10MB cada
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            {files.length} {files.length === 1 ? 'arquivo selecionado' : 'arquivos selecionados'}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-white/80 hover:bg-white
                    text-gray-600 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {isUploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-center text-gray-600">
                Enviando: {Math.round(uploadProgress)}%
              </p>
            </div>
          ) : (
            <Button
              onClick={handleUpload}
              className="w-full bg-[#52E0A1] hover:bg-[#52E0A1]/90 text-[#1E2D3D]"
            >
              <Upload className="mr-2 h-4 w-4" />
              Fazer upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
