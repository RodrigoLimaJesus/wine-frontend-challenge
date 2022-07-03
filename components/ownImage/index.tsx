import Image from 'next/image';

type MyImage = {
  src: string;
  alt: string;
  responsive?: boolean;
  priority?: boolean;
};

export default function OwnImage({
  src,
  alt,
  responsive = false,
  priority = false,
}: MyImage) {
  return (
    <Image
      src={src}
      alt={alt}
      width="100%"
      height="100%"
      layout={responsive ? 'responsive' : 'intrinsic'}
      priority={priority}
    />
  );
}
