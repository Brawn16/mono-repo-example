import React from "react";

export function CenterPage({
  children
}: React.PropsWithChildren<{}>): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col justify-center flex-1">
        <div className="p-8 text-center">{children}</div>
      </main>
      <footer className="p-8 pt-0 text-xs text-center text-gray-400">
        &copy; {year}. All Rights Reserved.
      </footer>
    </div>
  );
}
