export type LineType = 'roundBroken' | 'curve'

export type TopicStyle = {
  backgroundColor?: string;
  border?: string;
  borderRadius?: number;
  color?: string;
  fontSize?: number;
  padding?: string;
  lineStyle?: {
    lineType?: LineType;
    lineWidth?: number;
    lineColor?: string;
  };
}

export interface GlobalTheme {
  background?: string;
  marginH: number;
  marginW: number;
  childMarginH: number;
  childMarginW: number;
}

export interface Theme extends GlobalTheme {
    /** 背景颜色 */
    background?: string;
    startType: never[];
    common: {
      family: string;
      bold: boolean;
      italic: boolean;
      textAlign: string;
    };
    connectionStyle: {
      lineWidth?: number;
      lineColor?: string;
      color?: string;
    };
    centerTopic: Omit<TopicStyle, 'lineStyle'>
    subTopic: TopicStyle;
    childTopic: TopicStyle;

    [key: string]: unknown
  }