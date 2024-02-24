'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { useState, useCallback } from 'react';

export default function Picture({ alt, src }) {
  const [isPopupOpen, setIsPopupOpen] = useState();
  const onClick = useCallback((e) => {
    if (e.target instanceof HTMLImageElement) {
      setIsPopupOpen(true);
    }
  }, []);

  return (
    <>
      {Boolean(isPopupOpen) && (
        <span onClick={() => setIsPopupOpen()} role="button" tabIndex="0">
          <span className={styles.overlay}>
            <span>
              <Image
                alt={alt}
                src={src}
                fill
                quality={100}
                className={styles.popupPicture}
              />
            </span>
          </span>
        </span>
      )}
      <span
        className={styles.image}
        onClick={onClick}
        role="button"
        tabIndex="0"
      >
        <Image
          alt={alt}
          src={src}
          fill
          priority={false}
          sizes="(max-width: 1200px) 90vw, 50vw"
        />
      </span>
    </>
  );
}
