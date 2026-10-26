"use client";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type Props = {
    slides: { src: string; alt: string }[];
    index: number;
    onClose: () => void;
    onIndexChange: (index: number) => void;
};

/**
 * Kept in its own module so callers can lazy-load the lightbox (and its CSS)
 * only when a gallery is actually opened.
 */
export default function ProjectGallery({ slides, index, onClose, onIndexChange }: Props) {
    return (
        <Lightbox
            open
            close={onClose}
            index={index}
            slides={slides}
            plugins={[Zoom, Fullscreen]}
            carousel={{ finite: false }}
            controller={{ closeOnBackdropClick: true }}
            on={{ view: ({ index: currentIndex }) => onIndexChange(currentIndex) }}
        />
    );
}
