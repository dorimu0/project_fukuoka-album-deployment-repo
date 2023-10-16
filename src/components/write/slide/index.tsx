import { SliderBox, PostImg } from "../writeStyles";

export const Slide = () => {
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
        <PostImg src="./img/miku.jpeg" alt="" />
        <PostImg src="./logo.svg" alt="" />
      </SliderBox>
    </>
  );
};

export default Slide;
