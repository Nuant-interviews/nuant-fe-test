export const AvatarSize = {
  large: 160,
  medium: 24,
  small: 40,
} as const;
export function Avatar({
  src,
  alt = "avatar",
  size = "small",
  className,
}: {
  src: string;
  alt: string;
  size?: keyof typeof AvatarSize;
  className?: string;
}) {
  return (
    <img
      style={{ width: AvatarSize[size], height: AvatarSize[size] }}
      className={`z-40 inline-block rounded-full ring-opacity-50 ${className}`}
      src={src}
      alt={alt}
    />
  );
}
