'use client';
import React, { useRef } from 'react'
import ImageComp from "@/components/ImageComp/ImageComp";
import { motion, useInView } from "framer-motion";
import clsx from 'clsx';
import styles from './ImageCard.module.css';

function ImageCard({visual}: {visual: string}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}  
      className={clsx(styles.visual)} key={visual}>
      <ImageComp
        image={visual}
        alt=""
        placeholder="visual"
        priority={false}
        key={visual}
      />
    </motion.div>
  )
}

export default ImageCard