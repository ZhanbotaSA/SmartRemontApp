import { Component } from "react";
import Slider from "react-slick";
import './galleryCarousel.scss';

export default class GalleryCarousel extends Component {
  render() {
    const { settings, selectedComplex } = this.props;

    return (
      <Slider {...settings}>
        {selectedComplex.images.map(image =>
          (<img src={image.path} className="d-block w-100" alt="..." />)
        )}
      </Slider>
    )
  }
}