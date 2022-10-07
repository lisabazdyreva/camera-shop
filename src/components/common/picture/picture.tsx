interface PictureProps {
  width: number,
  height: number,
  alt: string,
  src: string,
  srcSetImg: string,
  srcSetSource: string[],
}

const Picture = ({width, height, alt, src, srcSetImg, srcSetSource}: PictureProps):JSX.Element => (
  <picture>
    <source type="image/webp" srcSet={`${srcSetSource[0]}, ${srcSetSource[1]} 2x`} />
    <img
      src={src}
      srcSet={`${srcSetImg} 2x`}
      width={String(width)}
      height={String(height)}
      alt={alt}
    />
  </picture>
);


export default Picture;
