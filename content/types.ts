export type MediaItem = {
  poster: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  video?: { webm: string; mp4: string };
};

export type FlowStep = {
  title: string;
  description: string;
  systems: string[];
};

export type Decision = {
  title: string;
  problem: string;
  resolution: string;
};

export type DiagramNode = {
  title: string;
  details: string[];
  center: [x: number, y: number];
  mobileCenter: [x: number, y: number];
};

export type Architecture = {
  caption: string;
  description: string;
  nodes: DiagramNode[];
  connections: {
    desktop: string;
    mobile: string;
    direction?: "both";
    dashed?: boolean;
  }[];
};

export type CaseStudy = {
  overview: string;
  architecture: Architecture;
  flow?: FlowStep[];
  decisions: Decision[];
  features: { title: string; description: string }[];
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  year: string;
  group: "featured" | "client" | "team" | "experiment";
  summary: string;
  highlights?: string[];
  stack?: string[];
  demo?: string;
  code?: string;
  media?: MediaItem;
  caseStudy?: CaseStudy;
};
