
import React from 'react';
import {motion} from 'framer-motion';

export default function ReceivedEmail({ message}) {
  return (
    <motion.div 
    initial={{opacity:0, x: -50}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x: -50}}
    transition={{duration:0.5}}
    className="fixed top-5 left-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-center space-x-4 z-50">
      <div className="text-base font-semibold">
        {message || 'Email Received. Enjoy Shopping!'}
      </div>
    </motion.div>
  );
}

