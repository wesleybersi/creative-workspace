// import "./carousel.scss";
import styles from "./styles.module.scss";
import {
  FiArrowLeft as IconLeft,
  FiArrowRight as IconRight,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import useWindowSize from "../../hooks/useWindowSize";

interface Props {
  images: string[];
  autoplay?: boolean;
  duration?: number;
}

const Carousel: React.FC<Props> = ({ images, autoplay, duration }) => {
  const [dim, resizing] = useWindowSize();
  const interval = duration ?? 6000;
  //Refs
  const lensRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<HTMLDivElement | null>(null);

  //Variables
  const amount = images.length;
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [gap] = useState<number>(128);

  //States
  const [slide, setSlide] = useState(1);
  const [animating, setAnimating] = useState<boolean>(false);
  const [noTransition, setNoTransition] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState<boolean>(false);

  useEffect(() => {
    if (!lensRef.current) return;
    if (resizing) {
      setNoTransition(true);
      setTimeout(() => {
        setNoTransition(false);
        setAnimating(false);
      }, 250);
    }

    const sectionWidth = lensRef.current.offsetWidth;
    setSlideWidth(sectionWidth);
  }, [lensRef.current?.offsetWidth, resizing]);

  useEffect(() => {
    if (!slidesRef.current) return;

    function start() {
      setResetTimer(true);
      if (!noTransition) setAnimating(true);
    }
    function end() {
      if (slide === amount + 1) {
        setNoTransition(true);
        setSlide(1);
      }
      if (slide === 0) {
        setNoTransition(true);
        setSlide(amount);
      }
      setAnimating(false);
    }

    slidesRef.current.addEventListener("transitionstart", start);
    slidesRef.current.addEventListener("transitionend", end);

    return () => {
      slidesRef.current?.removeEventListener("transitionstart", start);
      slidesRef.current?.removeEventListener("transitionend", end);
    };
  }, [slidesRef.current, slide, noTransition, autoplay]);

  useEffect(() => {
    //If autoplay
    let timer: number;
    if (autoplay && !animating) {
      timer = setTimeout(() => {
        setResetTimer(true);
        setSlide((prev) => prev + 1);
      }, interval);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [animating]);

  useEffect(() => {
    if (resetTimer) setResetTimer(false);
    if (noTransition) setNoTransition(false);
  }, [noTransition, resetTimer]);

  function isActiveDot(index: number): boolean {
    if (index + 1 === slide) return true;
    if (index === 0 && slide === amount + 1) return true;
    if (index === amount - 1 && slide === 0) return true;
    return false;
  }
  return (
    <div className={styles.carousel}>
      <section className={styles.controls}>
        <div onClick={() => !animating && setSlide((prev) => prev - 1)}>
          <IconLeft size="32px" />
        </div>
        <div onClick={() => !animating && setSlide((prev) => prev + 1)}>
          <IconRight size="32px" />
        </div>
      </section>

      <section ref={lensRef} className={styles.lens}>
        <div
          ref={slidesRef}
          className={`${styles.content} ${noTransition ? styles.dead : ""}`}
          style={{
            gap,
            transform: `translateX(-${slide * (slideWidth + gap)}px)`,
          }}
        >
          {[images[amount - 1], ...images, images[0]].map((image, index) => (
            <div className={styles.slide} key={index}>
              <img
                src={image}
                alt=""
                style={{
                  maxWidth: slideWidth,
                  minWidth: slideWidth,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={isActiveDot(index) ? styles.activedot : undefined}
            onClick={() => !animating && setSlide(index + 1)}
          ></button>
        ))}
      </section>
    </div>
  );
};
export default Carousel;
