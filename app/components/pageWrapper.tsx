"use client";

import classNames from "classnames";
import { delay, motion } from "framer-motion";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className={classNames("overflow-hidden w-full", className)}
  >
    {children}
  </motion.section>
);
