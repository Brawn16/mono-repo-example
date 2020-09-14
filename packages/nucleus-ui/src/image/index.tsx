import React, { useState } from "react";
import { Spinner } from "../spinner";
import { ImageProps } from "./types";

export function Image(props: ImageProps) {
  const [loading, setLoading] = useState(true);
  const { alt } = props;

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      <img {...props} alt={alt} onLoad={handleLoad} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
