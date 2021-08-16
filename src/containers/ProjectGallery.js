import { Component } from "react";
import '../../src/App.scss';
import { complexes } from "../repositories/complexes";
import GalleryCarousel from "../components/GalleryCarousel";
import Arrow_Right from "../assets/icons/angle-right.svg";
import Arrow_Left from "../assets/icons/angle-left.svg";
import Dots_Bg from "../assets/images/dots-bg.png";

export default class ProjectGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      complexes: complexes,
      activeSlide: 0,
      activeSlide2: 0
    };
    this.selectComplex = this.selectComplex.bind(this);
  }

  selectComplex(id) {
    if (this.state.selected !== id) {
      this.setState({ selected: id })
    }
  }

  render() {
    const { selected, complexes, activeSlide } = this.state;
    const selectedComplex = complexes.find(complex => complex.id === selected);

    function SampleNextArrow(props) {
      const { onClick } = props;
      return (
        <div
          className="slick-arrow right"
          onClick={onClick}
        >
          <img src={Arrow_Right} alt="arrow_right" />
        </div>
      );
    }

    function SamplePrevArrow(props) {
      const { onClick } = props;
      return (
        <div
          className="slick-arrow left"
          onClick={onClick}
        >
          <img src={Arrow_Left} alt="arrow_left" />
        </div>
      );
    }

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      afterChange: current => this.setState({ activeSlide2: current }),
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className="container main-container px-md-5 py-md-4 my-3">
        <div className="row">
          <div className="col-12 col-md-3 py-3">
            <h1 className="title bold">Галерея проектов</h1>
            <p className="description py-3">Сумма экономии рассчитана в сравнении с суммой цен этого же перечня товаров по отдельности</p>
            <button className="btn btn-outline">Выбрать дизайн</button>
          </div>
          <div className="col-12 col-md-9 align-items-end justify-content-end d-md-flex px-md-5 pb-md-3">
            <img src={Dots_Bg} alt="dots" className="dots-bg" />
            <h2 className="subtitle">Мы успешно завершили уже <span>более 450</span> ремонтов</h2>
          </div>
        </div>
        <div className="row my-3">
          {/* filter by complex name */}
          <div className="col-12 col-md-3 nav-pills-col d-none d-md-block">
            {complexes.map((complex) =>
              <div className="nav-pills me-3" key={complex.id}>
                <button onClick={this.selectComplex.bind(this, complex.id)} className={selected === complex.id ? 'nav-link active' : 'nav-link'}>{complex.name}</button>
              </div>
            )}
          </div>

          <div className="col-12 d-md-none">
            <p className="label bold mb-2">Сделанные ремонты</p>
            <div class="dropdown mb-3">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedComplex.name}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {complexes.map((complex) =>
                  <li><span class="dropdown-item" onClick={this.selectComplex.bind(this, complex.id)}>{complex.name}</span></li>
                )}
              </ul>
            </div>
          </div>

          {/* complex details */}
          <div className="col-12 col-md-9 px-md-4 details-pane">
            <div className='container px-0' key={selectedComplex.id}>
              <div className="row">
                {/* carousel */}
                <div className="col-12 mb-3">
                  <GalleryCarousel
                    selectedComplex={selectedComplex}
                    settings={settings}
                  />
                </div>
                {/* complex name-address */}
                <div className="col-10 col-md-9">
                  <p className="complex-name"><span >{selectedComplex.name}</span> - <span className="address">{selectedComplex.address}</span></p>
                </div>
                {/* current index slider */}
                <div className="col col-md text-end px-md-5">
                  <span className="bold">{activeSlide + 1}</span> <span className="grey bold">/{selectedComplex.images.length}</span>
                </div>
                {/* description */}
                <div className="col-12 col-md-9">
                  <p> {selectedComplex.description}</ p>
                  <div className="back-box"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
