import { Variants, motion } from "framer-motion";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Loader() {
  const navigate = useNavigate();
  const container: Variants = {
    hidden: {
      opacity: 1,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        delayChildren: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };
  const textContainer: Variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.45,
      },
    },
  };
  const letterVariant: Variants = {
    hidden: {
      y: 150,
      scale: 0,
    },
    show: (i) => ({
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 1.2,
      },
    }),
  };
  useEffect(() => {
    setTimeout(() => navigate("/home"), 3000);
  }, [navigate]);
  const text = "SM STORE";
  return (
    <motion.main
      className="h-screen fixed top-0 z-[999999] bg-white left-0 w-full flex flex-col items-center justify-center space-y-8"
      variants={container}
      exit={"exit"}
      initial={"hidden"}
      animate={"show"}
    >
      {true && (
        <motion.div
          className="absolute z-[9999998] top-50 left-50 -translate-y-50 -translate-x-50 text-center "
          variants={textContainer}
        >
          <div className="text-3xl lg:text-5xl mx-auto overflow-hidden flex justify-center text-center mb-5 ">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                custom={index}
                className="block"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
            className="font-medium"
          >
            Get awesome stuff at affordable rates.
          </motion.p>
        </motion.div>
      )}
    </motion.main>
  );
}

export default Loader;
