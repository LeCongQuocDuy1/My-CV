import './testimonials.css';
import { Data } from './Data';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

SwiperCore.use([Autoplay]);
function Testimonials() {
    return (
        <section className="section testimonial container">
            <h2 className="section__title">My Technologies</h2>
            <span className="section__subtitle">Technologies that I have used</span>

            <Swiper className="testimonial__container"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                loop={true}
                grabCursor={true}
                spaceBetween={24}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 48,
                    },
                }}
                modules={[Pagination]}
            >
                {
                    Data.map(({ id, image, title, description }) => {
                        return (
                            <SwiperSlide className="testimonial__card" key={id}>
                                <img src={image} alt="" className="testimonial__img" />
                                <h3 className="testimonial__title">{title}</h3>
                                <p className="testimonial__description">{description}</p>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    );
}

export default Testimonials;