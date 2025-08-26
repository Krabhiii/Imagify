import React, { useState, useContext } from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, ease: 'easeOut' } }
};

const imageVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

const progressVariants = {
  idle: { width: '0%' },
  loading: { width: '100%', transition: { duration: 10, ease: 'linear' } }
};

const formVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

const buttonVariants = {
  hover: { scale: 1.03, y: -3 },
  tap: { scale: 0.98 }
};

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [IsimageLoaded, setIsimageLoaded] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [input, setInput] = useState('');
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setIsimageLoaded(false);
    setIsGenerated(false);

    if (input.trim()) {
      const generated = await generateImage(input);
      if (generated) {
        setImage(generated);
        console.log("Generated image URL:", generated);
        setIsGenerated(true);
      }
    }
  };

  const handleGenerateAnother = () => {
    setIsimageLoaded(false);
    setIsloading(false);
    setInput('');
    setImage(assets.sample_img_1);
    setIsGenerated(false);
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col justify-center items-center min-h-[90vh]'
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div>
        <div className='relative'>
         <motion.img
  src={image}
  width={300}
  className='max-w-sm rounded'
  initial={{ opacity: 0.5, scale: 0.98 }}
  animate={{
    opacity: IsimageLoaded ? 1 : 0.5,
    scale: IsimageLoaded ? 1 : 0.98
  }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  style={{
    filter: IsimageLoaded ? 'none' : 'blur(4px)',
    transition: 'filter 0.6s ease-out'
  }}
  onLoad={() => {
    setIsimageLoaded(true);
    setIsloading(false);
  }}
/>

          <motion.span
            className='absolute bottom-0 left-0 h-1 bg-blue-500'
            variants={progressVariants}
            animate={isLoading ? 'loading' : 'idle'}
          />
        </div>

        <motion.p
          className={!isLoading ? 'hidden' : ''}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          Loading...
        </motion.p>
      </div>

      {!isGenerated && (
        <motion.div
          className='text-white flex w-full max-w-xl rounded-full bg-neutral-500 mt-20'
          variants={formVariants}
          initial="hidden"
          animate="show"
        >
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'
            placeholder='Enter the text you want to generate'
          />
          <motion.button
            type='submit'
            className='bg-zinc-900 px-10 sm:px-10 py-3 rounded-full'
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            Submit
          </motion.button>
        </motion.div>
      )}

      {IsimageLoaded && isGenerated && (
        <motion.div
          className='flex gap-8 items-center mt-10'
          variants={formVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p
            onClick={handleGenerateAnother}
            className='bg-white/95 text-zinc-800 px-6 py-3 rounded-full cursor-pointer border-2 border-zinc-800'
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate Another
          </motion.p>
          <motion.a
            href={image}
            download
            className='bg-zinc-800 text-white px-6 py-3 rounded-full cursor-pointer'
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Download image
          </motion.a>
        </motion.div>
      )}
    </motion.form>
  );
};

export default Result;
