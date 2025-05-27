import React, { useEffect, useState, type ReactNode } from "react";
import style from "./style.module.css";

type PopoverProps = {
  children?: ReactNode;
  parent: HTMLElement | null;
  placement?: "top" | "bottom" | "left" | "right";
};
const Popover = ({ children, parent, placement = "bottom" }: PopoverProps) => {
  const [parentDimension, setParentDimension] =
    useState<Nullable<DOMRect>>(null);

  useEffect(() => {
    /**
     * @description gets the dimension of the parent element received as parent props from the parent component
     */
    const getParentDimension = () => {
      if (parent) {
        const dimension = parent.getBoundingClientRect();

        setParentDimension(dimension);
      }
    };

    getParentDimension();
  }, [parent, window.innerHeight, window.innerWidth]);

  const hasContent = React.Children.count(children) > 0;

  if (!hasContent || !parent) {
    return null; // Don't render the popover
  }

  return parent && parentDimension && children ? (
    <div
      className={style.popover_container}
      style={{
        "--top": `${parentDimension?.bottom}px`,
        "--left": `${parentDimension?.left}px`,
        "--width": `${parentDimension?.width}px`,
      }}
    >
      {children}
    </div>
  ) : null;
};

export default Popover;
