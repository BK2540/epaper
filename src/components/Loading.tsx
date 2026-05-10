import { motion } from "motion/react";

function Loading() {
  return (
    <div className="epaper-loading" role="status" aria-label="Loading">
      <motion.div
        className="epaper-loading-spinner"
        animate={{ transform: "rotate(360deg)" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .epaper-loading {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 40px;
                border-radius: 8px;
            }

            .epaper-loading-spinner {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 4px solid var(--color-neutral-300);
                border-top-color: var(--color-blue-600);
                will-change: transform;
            }
            `}
    </style>
  );
}

export default Loading;
