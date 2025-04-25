"use client";

import React, { createContext, useContext, ReactNode } from "react";

type PostContext = {
  tree: Record<string, Record<string, number>>;
  tags: Record<string, number>;
};

const PostContext = createContext<PostContext | undefined>(undefined);

export const PostProvider = ({
  value,
  children,
}: {
  value: PostContext;
  children: ReactNode;
}) => {
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
