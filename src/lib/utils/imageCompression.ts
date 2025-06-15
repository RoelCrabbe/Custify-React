export const compressImage = (
    file: File,
    maxWidth: number = 800,
    quality: number = 0.8,
): Promise<File> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            let { width, height } = img;
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxWidth) {
                    width = (width * maxWidth) / height;
                    height = maxWidth;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    } else {
                        resolve(file);
                    }
                },
                'image/jpeg',
                quality,
            );
        };

        img.src = URL.createObjectURL(file);
    });
};

export const compressImageUntilSize = async (
    file: File,
    maxSizeInBytes: number,
    attempts: { maxWidth: number; quality: number }[],
): Promise<File | null> => {
    for (const attempt of attempts) {
        const compressed = await compressImage(file, attempt.maxWidth, attempt.quality);
        if (compressed.size <= maxSizeInBytes) {
            return compressed;
        }
    }
    return null;
};
