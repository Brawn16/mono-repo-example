import React, { ReactElement, useEffect, useState } from "react";
import { UploadViewerFileProps, UploadViewerChildrenProps } from "./types";

export function FileViewer({
  children,
  file,
  loadingChildren = null,
}: UploadViewerFileProps): ReactElement | null {
  const [childrenProperties, setChildrenProperties] = useState<
    UploadViewerChildrenProps
  >();

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener("error", () => {
      const { error } = reader;
      if (error === null) {
        return;
      }

      setChildrenProperties({
        error: {
          extraInfo: null,
          graphQLErrors: [],
          message: error.message,
          name: "Error",
          networkError: null,
        },
      });
    });

    reader.addEventListener("load", () => {
      setChildrenProperties({
        data: {
          upload: {
            contentType: file.type,
            name: file.name,
            size: file.size,
          },
          url: reader.result as string,
        },
      });
    });

    reader.readAsDataURL(file);
  }, []);

  if (childrenProperties === undefined) {
    return loadingChildren;
  }

  return <>{children(childrenProperties)}</>;
}
