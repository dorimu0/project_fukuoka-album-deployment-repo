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
