import Image from "next/image";

interface ProductImageProps {
  src?: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div data-testid="product-image" className="relative w-full h-[400px] rounded overflow-hidden bg-white">
      <Image
        src={src || "/fallback.png"}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}