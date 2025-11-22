interface SumiEImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function SumiEImage({ src, alt, className = '' }: SumiEImageProps) {
    return (
        <div className={`sumi-e-image-wrapper ${className}`}>
            <div className="sumi-e-image-inner">
                <img
                    src={src}
                    alt={alt}
                    className="sumi-e-image"
                />
            </div>
        </div>
    );
}
