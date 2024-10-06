// import { animate } from "framer-motion";
// import { useEffect, useRef } from "react";

// type CounterProps = {
//   from: number;
//   to: number;
//   duration?: number;
//   digit?: number;
// };

// export const Counter = ({
//   from,
//   to,
//   duration = 6,
//   digit = 2,
// }: CounterProps) => {
//   const nodeRef = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     if (!nodeRef.current) return;
//     const node = nodeRef.current;

//     const controls = animate(from, to, {
//       duration,
//       ease: "easeInOut",

//       onUpdate(value) {
//         node.textContent = value
//           .toFixed(digit)
//           .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
//       },
//     });

//     return () => controls.stop();
//   }, [from, to, duration, digit]);

//   return (
//     <span ref={nodeRef}>
//       {from.toFixed(digit).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}
//     </span>
//   );
// };

import { animate, motion } from "framer-motion";
import { useRef } from "react";

type CounterProps = {
  from: number;
  to: number;
  duration?: number;
  digit?: number;
};

export const Counter = ({
  from,
  to,
  duration = 2,
  digit = 2,
}: CounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  const startAnimation = () => {
    if (!nodeRef.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      ease: "easeInOut",
      onUpdate(value) {
        node.textContent = value
          .toFixed(digit)
          .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      },
    });

    return controls;
  };

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={startAnimation} // Démarre l'animation lorsque le composant entre dans la vue
      onViewportLeave={() => {
        if (nodeRef.current) {
          nodeRef.current.textContent = from
            .toFixed(digit)
            .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
        }
      }}
    >
      {from.toFixed(digit).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}
    </motion.span>
  );
};
