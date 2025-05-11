import type { RequestModel } from "./request.model";

export interface BlogAttributes {
  firstTitle: string;
  secondTitle: string;
  fullText: Array<{
    type: "heading" | "paragraph" | "list";
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export interface Blog {
  id: number;
  attributes: BlogAttributes;
}

export type BlogRequestModel = RequestModel<Blog>;