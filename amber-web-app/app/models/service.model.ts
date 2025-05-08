import type { RequestModel } from "./request.model";

export interface ServiceAttributes {
  title: string;
  shortText: string;
  longText: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
  slug: string;
  qaFinalizeText: Array<{
    type: string;
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
      };
    };
  };
}

export interface Service {
  id: number;
  attributes: ServiceAttributes;
}

export type ServiceRequestModel = RequestModel<Service>;