
export interface CategoryContent {
  title: string;
  description: string;
  highlights?: string[];
}

export interface District {
  id: string;
  name: string;
  categories: {
    history?: CategoryContent;
    language?: CategoryContent;
    food?: CategoryContent;
    festivals?: CategoryContent;
    climate?: CategoryContent;
    architecture?: CategoryContent;
    wildlife?: CategoryContent;
    fabrics?: CategoryContent;
    giTags?: CategoryContent;
    artsCrafts?: CategoryContent;
    famousFor?: CategoryContent;
  };
}

export interface State {
  id: string;
  name: string;
  nickname: string;
  summary: string;
  climate: string;
  bestTimeToVisit: string;
  landmarks: string[];
  districts: District[];
}

export interface BharatData {
  states: State[];
}
