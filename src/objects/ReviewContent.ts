import { ReviewType } from '@/@types/Review';

abstract class ReviewContent {
  blockType: ReviewType;

  protected constructor(blockType: ReviewType) {
    this.blockType = blockType;
  }
}

class TextContent extends ReviewContent {
  text: string;

  constructor(text: string) {
    super('text');
    this.text = text;
  }
}

class PictureContent extends ReviewContent {
  path: string;

  constructor(path: string) {
    super('picture');
    this.path = path;
  }
}

class EmotionContent extends ReviewContent {
  emoji: string;
  description: string;

  constructor(emoji: string, description: string) {
    super('emotion');
    this.emoji = emoji;
    this.description = description;
  }
}

class WeatherContent extends ReviewContent {
  weather: string;
  description: string;

  constructor(weather: string, description: string) {
    super('weather');
    this.weather = weather;
    this.description = description;
  }
}

class KPTContent extends ReviewContent {
  keepStr: string;
  problemStr: string;
  tryStr: string;

  constructor(keepStr: string, problemStr: string, tryStr: string) {
    super('kpt');
    this.keepStr = keepStr;
    this.problemStr = problemStr;
    this.tryStr = tryStr;
  }
}

class FourFContent extends ReviewContent {
  facts: string;
  feeling: string;
  finding: string;
  future: string;

  constructor(facts: string, feeling: string, finding: string, future: string) {
    super('4f');
    this.facts = facts;
    this.feeling = feeling;
    this.finding = finding;
    this.future = future;
  }
}

export {
  ReviewContent,
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
};
