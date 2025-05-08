export interface GoogleReview {
  html_attributions: unknown[];
  result: {reviews: ReviewRecord[]};
  status: string;
}

export interface ReviewRecord {
  author_name: string; 
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string; 
  text: string;
  time: number;
  translated: boolean;
}