import type { RequestModel } from "./request.model";

export interface DoctorAttributes {
  name: string;
  role: string;
  slug: string;
  cvText: Array<{
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
}

export interface Doctor {
  id: number;
  attributes: DoctorAttributes;
}

export type DoctorRequestModel = RequestModel<Doctor>;