import type { RequestModel } from "./request.model";

export interface ServiceAttributes {
  title: string;
  shortText: string;
  longText: Array<{
    type: "heading" | "paragraph" | "list";
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  slug: string;
  qaFinalizeText: Array<{
    type: "heading" | "paragraph" | "list";
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
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
  qaList: {
    id: number;
    question: string;
    answer: {
      type: "paragraph",
      children: {
        text: string;
        type: "heading" | "paragraph" | "list";
      }[]
    }[]
  }[]
}

export interface Service {
  id: number;
  attributes: ServiceAttributes;
}

export type ServiceRequestModel = RequestModel<Service>;