interface IProps {
  imgURL: string;
  alt: string;
  className:string;
}

const Image = ({imgURL,alt,className} : IProps) => {
  return (<img src={imgURL} alt={alt} className={className}/>)
};

export default Image;
