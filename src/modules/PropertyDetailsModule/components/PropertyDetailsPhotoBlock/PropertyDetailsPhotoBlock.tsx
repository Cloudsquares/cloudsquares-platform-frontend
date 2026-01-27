import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import { PropertyPhoto } from "../../../../shared/interfaces/Property";

/**
 * Пропсы блока фото деталей объекта.
 */
interface PropertyDetailsPhotoBlockProps {
  /**
   * Массив фотографий объекта.
   * Если пустой — будет показана заглушка.
   */
  photos: PropertyPhoto[];
  /**
   * Состояние загрузки данных. Пока идёт загрузка — показываем заглушку,
   * чтобы не мигали старые фото.
   */
  loading?: boolean;
  /**
   * Ключ сущности (обычно `propertyId`). Нужен для жёсткой смены состояния
   * при переходе между разными объектами.
   */
  entityKey?: string | number;
}

/**
 * Блок слайдера фотографий объекта недвижимости.
 *
 * Особенности:
 * - Показывает заглушку, если фото нет или идёт загрузка;
 * - «Хард-ресет» состояния карусели при смене набора фото (carouselKey)
 *   или сущности (entityKey);
 * - Дизейблит стрелки, если листать нечего.
 */
export const PropertyDetailsPhotoBlock = ({
  photos,
  loading = false,
  entityKey,
}: PropertyDetailsPhotoBlockProps) => {
  const hasPhotos = Array.isArray(photos) && photos.length > 0;
  const showPlaceholder = loading || !hasPhotos;

  const carouselKey = React.useMemo(() => {
    if (showPlaceholder) return `placeholder-${entityKey ?? "no-id"}`;
    const ids = photos.map((p) => p.id).join("_");
    return `${entityKey ?? "no-id"}__${ids}`;
  }, [showPlaceholder, photos, entityKey]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    dragFree: false,
    containScroll: "trimSnaps",
    inViewThreshold: 0.5,
    breakpoints: {},
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [carouselKey]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, carouselKey]);

  return (
    <div className="relative overflow-hidden">
      <div key={carouselKey} ref={emblaRef} className="embla overflow-hidden">
        <div className="flex touch-pan-y gap-4" style={{ marginLeft: "-8px" }}>
          {(showPlaceholder ? [null] : photos).map((photo, idx) => {
            const key = photo ? photo.id : "placeholder";
            const url = (photo as PropertyPhoto | null)?.file_url;

            return (
              <div
                key={`${key}-${idx}`}
                className="flex-[0_0_100%] md:flex-[0_0_80%] rounded-lg"
              >
                {url ? (
                  <img
                    src={url}
                    alt="Property photo"
                    className="block h-[30rem] w-full rounded-lg object-cover"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label="Изображение недоступно"
                    className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-grey-300 bg-grey-100 text-grey-500"
                  >
                    <MdPhoto size={48} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white disabled:opacity-50"
        disabled={showPlaceholder || !canPrev}
        aria-label="Предыдущая фотография"
      >
        <FaChevronLeft size={16} />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white disabled:opacity-50"
        disabled={showPlaceholder || !canNext}
        aria-label="Следующая фотография"
      >
        <FaChevronRight size={16} />
      </button>

      <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-caption2 text-white">
        {showPlaceholder ? "0/0" : `${selectedIndex + 1}/${photos.length}`}
      </div>
    </div>
  );
};
