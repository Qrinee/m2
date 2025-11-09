// Utwórz nowy hook do ładowania obrazów
const useImageLoader = (imagePaths) => {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      
      for (const [key, path] of Object.entries(imagePaths)) {
        try {
          const image = await import(`../assets/${path}`);
          images[key] = image.default;
        } catch (error) {
          console.warn(`Failed to load image: ${path}`);
        }
      }
      
      setLoadedImages(images);
    };

    loadImages();
  }, [imagePaths]);

  return loadedImages;
};