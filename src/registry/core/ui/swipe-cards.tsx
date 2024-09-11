import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useState } from 'react';

const pages = [1, 2, 3, 4, 5, 6, 7, 8];
const indicatorSize = 10;
const indicatorPadding = 10;
const indicatorWidth = pages.length * indicatorSize;
const indicatorPaddingTotal = (pages.length - 1) * indicatorPadding;
const indicatorWidthTotal = indicatorWidth + indicatorPaddingTotal;
const indicatorAlpha = 0.3;

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);

  return (
    <div className='grid h-[500px] w-full place-items-center bg-neutral-100 relative'>
      {cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            card={card}
            currentIndex={index}
            setCards={setCards}
            cards={cards}
            setCurrentIndex={setCurrentIndex}
          />
        );
      })}

      {/* <div className='absolute bottom-4 flex justify-center space-x-2'>
        {cards.map((_, index) => (
          <motion.div
            key={index}
            style={{
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: '50%',
              backgroundColor: 'black',
              position: 'absolute',
              top: 'calc(50% + 100px)',
              left: `calc(50% + ${index} * ${
                indicatorSize + indicatorPadding
              }px)`,
              x: -indicatorWidthTotal / 2,
            }}
            className='w-2.5 h-2.5 bg-gray-400 rounded-full'
            animate={{
              opacity: currentIndex === index ? 1 : indicatorAlpha,
            }}
            onTap={() => setCurrentIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

const Card = ({ card, currentIndex, setCards, cards, setCurrentIndex }) => {
  const { id, url } = card;
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prevCards) => prevCards.filter((v) => v.id !== id));
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <motion.img
      src={url}
      alt='Placeholder alt'
      className='h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing'
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: '0.125s transform',
        boxShadow: isFront
          ? '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)'
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default SwipeCards;

const cardData = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
