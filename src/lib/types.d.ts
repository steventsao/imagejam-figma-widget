export type SwingItem = {
  image_url: string;
};

export type Bookmark = {
  value: number;
  label: string;
};

export type IndexProps = {
  swing?: {
    id: number;
    createdAt: Date;
    image_url?: string;
    blobId?: string;
    userId?: number;
    // The types for `user`, `s3`, and `predictions` would depend on their respective structures.
    // Replace `any` with the appropriate types.
    user?: any;
    s3?: any;
    predictions?: any[];
  };
  swingFrames: string[];
  uploads: any[];
};

export type SwingProps = {
  isReady: boolean;
  swing?: {
    id: number;
    createdAt: Date;
    image_url?: string;
    blobId?: string;
    userId?: number;
    // The types for `user`, `s3`, and `predictions` would depend on their respective structures.
    // Replace `any` with the appropriate types.
    user?: any;
    s3?: any;
    predictions?: any[];
  };
  swingFrames: string[];
  swingId: string;
  frames: number;
  uploads: Upload[];
  bookmarks: Bookmark[];
};
