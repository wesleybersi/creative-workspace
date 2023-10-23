import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./carousel.module.scss";

import Carousel from "../../../../../../store/data/carousel";
import useStore from "../../../../../../store/store";
import Arrows from "./components/Arrows/Arrows";
import { wrapAround } from "../../../../../../utils/helper-functions";
import Dots from "./components/Dots/Dots";
import GridSection from "../GridSection/GridSection";

interface Props {
  carousel: Carousel;
  gridRef: HTMLDivElement | null;
  setCarouselTracker: React.Dispatch<React.SetStateAction<Map<string, number>>>;
}

const GridArea: React.FC<Props> = ({
  carousel,
  gridRef,
  setCarouselTracker,
}) => {
  const { cellSize, mode } = useStore();
  const areaRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  //Variables
  const slideAmount = carousel.slides.length;
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [gap] = useState<number>(cellSize);

  //States
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [noTransition, setNoTransition] = useState<boolean>(true);
  const [colors, setColors] = useState<string[]>([
    "hotpink",
    "aquamarine",
    "beige",
    "hotpink",
    "aquamarine",
  ]);

  useEffect(() => {
    if (!lensRef.current) return;
    // if (resizing) {
    //   setNoTransition(true);
    //   setTimeout(() => {
    //     setNoTransition(false);
    //     setAnimating(false);
    //   }, 250);
    // }

    const sectionWidth = lensRef.current.offsetWidth;
    const offset = slidesRef.current?.offsetLeft;
    // if (offset) setSlideWidth(cellSize * carousel.size.cols - offset * 3);
    if (offset) setSlideWidth(sectionWidth - offset * 2);
  }, [lensRef.current?.offsetWidth, cellSize]);

  useLayoutEffect(() => {
    if (!slidesRef.current) return;

    function start() {
      if (!noTransition) setIsAnimating(true);
    }

    if (currentSlide > 0 && currentSlide < slideAmount + 1) {
      setCarouselTracker((prev) => {
        const tracker = new Map([...prev]);
        tracker.set(carousel.id, currentSlide - 1);
        return tracker;
      });
    }

    function end() {
      if (currentSlide === slideAmount + 1) {
        setNoTransition(true);
        setCurrentSlide(1);
      }
      if (currentSlide === 0) {
        setNoTransition(true);
        setCurrentSlide(slideAmount);
      }
      setIsAnimating(false);
    }

    slidesRef.current.addEventListener("transitionstart", start);
    slidesRef.current.addEventListener("transitionend", end);

    return () => {
      slidesRef.current?.removeEventListener("transitionstart", start);
      slidesRef.current?.removeEventListener("transitionend", end);
    };
  }, [slidesRef.current, currentSlide, noTransition]);

  useLayoutEffect(() => {
    if (noTransition) setNoTransition(false);
  }, [noTransition]);

  return (
    <main
      className={styles.wrapper}
      ref={areaRef}
      style={{
        gridColumnStart: carousel.position.col.start,
        gridColumnEnd: carousel.position.col.end,
        gridRowStart: carousel.position.row.start,
        gridRowEnd: carousel.position.row.end,
        zIndex: 0,
      }}
    >
      <section className={styles.carousel}>
        <div
          className={styles.lens}
          ref={lensRef}
          // style={{ overflow: isAnimating ? "hidden" : "visible" }}
        >
          <section
            ref={slidesRef}
            className={`${styles.slides} ${noTransition ? styles.dead : ""}`}
            style={{
              gap,
              transform: `translateX(-${currentSlide * (slideWidth + gap)}px)`,
            }}
          >
            {[
              carousel.slides[slideAmount - 1],
              ...carousel.slides,
              carousel.slides[0],
            ].map((slide, index) => (
              <div
                className={styles.slide}
                key={index}
                style={{
                  // opacity: isAnimating || index === currentSlide ? 1 : 0,
                  maxWidth: slideWidth,
                  minWidth: slideWidth,
                  backgroundColor:
                    mode === "Edit" ? "rgba(255,255,255,0.35)" : "",
                  // outline: mode === "Edit" ? "3px dashed var(--grey)" : "",
                }}
              >
                <section
                  ref={sectionRef}
                  className={styles.sections}
                  style={{
                    gridTemplateColumns: `repeat(${carousel.size.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${carousel.size.rows}, 1fr)`,
                  }}
                >
                  {slide.map((section) => (
                    <GridSection
                      section={section}
                      gridRef={gridRef}
                      z={1}
                      carouselOffset={{
                        rows: carousel.position.row.start - 1,
                        cols: carousel.position.col.start - 1,
                      }}
                    />
                  ))}
                </section>
              </div>
            ))}
          </section>
        </div>
      </section>
      <Arrows
        onLeft={() =>
          !isAnimating &&
          setCurrentSlide((prev) =>
            wrapAround(prev - 1, 0, carousel.slides.length)
          )
        }
        onRight={() =>
          !isAnimating &&
          setCurrentSlide((prev) =>
            wrapAround(prev + 1, 1, carousel.slides.length + 1)
          )
        }
      />
      <Dots
        amount={carousel.slides.length}
        currentIndex={currentSlide}
        onTrigger={(index) => !isAnimating && setCurrentSlide(index)}
      />
    </main>
  );
};

export default GridArea;
