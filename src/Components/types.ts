export interface Sideyard {
  id: 1;
  updated_at: string;
  cleanAddress: string;
  streetViewFilePath: string;
  wasCanvassed: boolean | null;
  shouldCanvass: boolean | null;
  shouldNotCanvass: boolean | null;
  comment: string | null;
}

export interface StatusState {
  wasCanvassed: boolean | null;
  shouldCanvass: boolean | null;
  shouldNotCanvass: boolean | null;
}

export interface UpdateBundle extends StatusState {
  id: number;
  comment: string;
}

export interface FilterStatuses {
  [key: string]: boolean;
  wasCanvassed: boolean;
  shouldCanvass: boolean;
  shouldNotCanvass: boolean;
  hideCanvassed: boolean;
}
