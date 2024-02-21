import React, { useEffect, useState } from "react";
import "./MobileAPIPageStyle.css";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import useCreateOutPutArray from "../../hooks/useCreateOutPutArray";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";
import Card from "../card/Card";

function MobileAPIPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [searchValue, setSearchValue] = useState("");
  const [speciesValue, setSpeciesValue] = useState("all");
  const [originValue, setOriginValue] = useState("all");

  const handleOnChangeSpecies = (e) => {
    setSpeciesValue(e.target.value);
  };
  const handleOnChangeLocation = (e) => {
    setOriginValue(e.target.value);
  };
  const handleOnChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const { outPutArr, speciesArr, originArr, loading } = useCreateOutPutArray(
    speciesValue,
    originValue,
    searchValue
  );
  const [slides, setSlides] = useState(1 | 3);
  useEffect(() => {
    if (outPutArr.length > 1) {
      setSlides(3);
    } else {
      setSlides(1);
    }
  }, [outPutArr]);

  return (
    <div className="mobileApi">
      <div className="titleBox">
        <h1>Browse characters</h1>
      </div>
      <div className="swipMobileContainer">
        {loading ? (
          <p className="loadingText">Sorry, it's loading...</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Scrollbar]}
            effect={"coverflow"}
            spaceBetween={50}
            slidesPerView={slides}
            navigation={true}
            centeredSlides={true}
            pagination={{
              // clickable: true,
              // dynamicBullets: true,
              // type: "bullets",
              type: "fraction",
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
            }}
            scrollbar={{ draggable: true }}
          >
            {" "}
            {outPutArr &&
              outPutArr.map((char, index) => {
                return (
                  <SwiperSlide className="singleSlide" key={index}>
                    <Card>{char}</Card>{" "}
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
      <button onClick={toggleDrawer} className="filterBtn">
        <p>Apply Filters</p>
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        lockBackgroundScroll={true}
        className="drawer"
      >
        <div className="mobileFilterBox">
          <div className="searchContainer">
            <label>Search by name:</label>
            <input
              type="text"
              id="search"
              value={searchValue}
              onChange={handleOnChangeSearch}
            />
          </div>
          <div className="speciesContainer">
            <label>Choose a species:</label>
            <select className="speciesSelect" onChange={handleOnChangeSpecies}>
              <option value="all">all</option>
              {speciesArr &&
                speciesArr.map((species, index) => {
                  return (
                    <option key={index} value={species}>
                      {species}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="locContainer">
            <label>Choose an origin:</label>
            <select
              className="locationSelect"
              onChange={handleOnChangeLocation}
            >
              <option value="all">all</option>
              {originArr &&
                originArr.map((location, index) => {
                  return (
                    <option key={index} value={location?.toString()}>
                      {location}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileAPIPage;
