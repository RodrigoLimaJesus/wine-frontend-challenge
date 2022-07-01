import Image from 'next/image';

type MyImage = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function OwnImage({ src, alt, priority = false }: MyImage) {
  return <Image src={src} alt={alt} width="100%" height="100%" priority={priority} />;
}
