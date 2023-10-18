import { SliderBox, PostImg } from "../writeStyles";
import { myImage } from "../../../types/user.interface";

export const Slide = (image: myImage) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // for (let i = 0; i < image.image.length; i++) {
  //   const file = image.image[i];
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const imgElement = document.querySelector(".img") as HTMLImageElement;
  //     if(e.target) {
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // }
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <SliderBox {...settings}>
        {image.image.map((image, index) => (
          <PostImg key={index} src={image} alt={`Preview ${index}`} />
        ))}
      </SliderBox>
    </>
  );
};

export default Slide;
