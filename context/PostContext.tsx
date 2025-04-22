"use client";

import React, { createContext, useContext, ReactNode } from "react";

import { PostMeta } from "@/lib/posts";

type PostMetaTree = Record<string, Record<string, PostMeta[]>>;

const PostContext = createContext<PostMetaTree | undefined>(undefined);

export const PostProvider = ({
  value,
  children,
}: {
  value: PostMetaTree;
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
