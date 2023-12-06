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
  <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className={classNames("min-h-screenHeightWithoutHeader", className)}
  >
    {children}
  </motion.main>
);