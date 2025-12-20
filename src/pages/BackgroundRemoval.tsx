import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";
import { Upload, Download, Zap, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundRemoval = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processImage = useCallback(async (file: File) => {
    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);
    setProcessing(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 90));
    }, 200);

    try {
      const img = await loadImage(file);
      const resultBlob = await removeBackground(img);
      const resultUrl = URL.createObjectURL(resultBlob);
      setProgress(100);
      setTimeout(() => setProcessedImage(resultUrl), 300);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to remove background. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setProcessing(false);
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processImage(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  }, [processImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'removed-background.png';
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium tracking-wide">WEBGPU ACCELERATED</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Background<span className="text-blue-400">Eraser</span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-md mx-auto">
            AI-powered background removal in seconds. No upload to servers.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!originalImage ? (
            <motion.label
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              htmlFor="file-upload"
              className="cursor-pointer w-full max-w-2xl"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className={`relative border-2 border-dashed rounded-3xl p-16 transition-all duration-300 ${
                isDragging 
                  ? 'border-blue-400 bg-blue-500/20 scale-105' 
                  : 'border-blue-500/40 hover:border-blue-400/60 bg-blue-950/50 hover:bg-blue-900/30'
              }`}>
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-white mb-2">Drop your image here</p>
                    <p className="text-blue-300/60">or click to browse • PNG, JPG, WEBP</p>
                  </div>
                </div>
                {isDragging && (
                  <div className="absolute inset-0 rounded-3xl bg-blue-400/10 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
                  </div>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.label>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-5xl"
            >
              {/* Reset button */}
              <div className="flex justify-end mb-4">
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="text-blue-300 hover:text-white hover:bg-blue-500/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  New Image
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Original */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <h3 className="font-semibold text-white">Original</h3>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-slate-800/50 border border-blue-500/20 p-4">
                    <img src={originalImage} alt="Original" className="w-full h-auto rounded-xl" />
                  </div>
                </div>

                {/* Processed */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <h3 className="font-semibold text-white">Background Removed</h3>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-blue-500/20 p-4 relative"
                    style={{
                      background: 'repeating-conic-gradient(#1e293b 0% 25%, #334155 0% 50%) 50% / 20px 20px'
                    }}
                  >
                    {processing ? (
                      <div className="aspect-square flex flex-col items-center justify-center gap-6">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full border-4 border-blue-500/30" />
                          <div 
                            className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-blue-400 animate-spin"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-white font-medium mb-2">Processing...</p>
                          <div className="w-48 h-2 bg-blue-950 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <p className="text-blue-400 text-sm mt-2">{Math.round(progress)}%</p>
                        </div>
                      </div>
                    ) : processedImage ? (
                      <img src={processedImage} alt="Processed" className="w-full h-auto rounded-xl" />
                    ) : null}
                  </div>
                  
                  {processedImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Button 
                        onClick={handleDownload} 
                        className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 rounded-xl shadow-lg shadow-blue-500/30"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download PNG
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-blue-300/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Browser-based AI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>No watermarks</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundRemoval;
