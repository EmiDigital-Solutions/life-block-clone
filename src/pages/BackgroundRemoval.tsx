import { useState } from "react";
import { Button } from "@/components/ui/button";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";
import { Upload, Download } from "lucide-react";

const BackgroundRemoval = () => {
  const [processing, setProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);
    setProcessing(true);

    try {
      const img = await loadImage(file);
      const resultBlob = await removeBackground(img);
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to remove background. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'ai-badge-no-bg.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Background Removal Tool</h1>
          <p className="text-muted-foreground">Upload an image to remove its background</p>
        </div>

        <div className="flex justify-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="border-2 border-dashed border-border rounded-lg p-12 hover:border-primary transition-colors">
              <div className="flex flex-col items-center gap-4">
                <Upload className="w-12 h-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="font-semibold">Click to upload image</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {processing && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Processing image...</p>
          </div>
        )}

        {(originalImage || processedImage) && !processing && (
          <div className="grid md:grid-cols-2 gap-8">
            {originalImage && (
              <div className="space-y-4">
                <h3 className="font-semibold text-center">Original</h3>
                <div className="border rounded-lg p-4 bg-white">
                  <img src={originalImage} alt="Original" className="w-full h-auto" />
                </div>
              </div>
            )}
            
            {processedImage && (
              <div className="space-y-4">
                <h3 className="font-semibold text-center">Background Removed</h3>
                <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img src={processedImage} alt="Processed" className="w-full h-auto" />
                </div>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundRemoval;
