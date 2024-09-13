import Question from '@/assets/icons/emoji/question.svg';
import SunDim from '@/assets/icons/sunDim.svg';
import Cloud from '@/assets/icons/weather/cloud.svg';
import CloudAngledRain from '@/assets/icons/weather/cloudAngledRain.svg';
import CloudSnow from '@/assets/icons/weather/cloudSnow.svg';
import FastWind from '@/assets/icons/weather/fastWinds.svg';
import Sun from '@/assets/icons/weather/sun.svg';
import { WhiteContainer } from '@/components/common/Container';
import { WeatherContent } from '@/objects/ReviewContent.ts';

type VWeatherProps = {
  content: WeatherContent;
};

function VWeather({ content }: VWeatherProps) {
  const renderWeather = (emoji: string) => {
    switch (emoji) {
      case 'Sun':
        return <img src={Sun} alt="맑음" className="w-10" />;
      case 'Cloud':
        return <img src={Cloud} alt="흐림" className="w-10" />;
      case 'FastWind':
        return <img src={FastWind} alt="바람" className="w-10" />;
      case 'CloudAngledRain':
        return <img src={CloudAngledRain} alt="비" className="w-10" />;
      case 'CloudSnow':
        return <img src={CloudSnow} alt="눈" className="w-10" />;
      default:
        return <img src={Question} alt="날씨" className="w-10" />;
    }
  };
  return (
    <WhiteContainer $width="900">
      <div className="flex flex-row">
        <img src={SunDim} alt="날씨" className="w-5 mr-2" />
        <span>오늘의 날씨</span>
      </div>
      {renderWeather(content.weather)}
      {content.description}
    </WhiteContainer>
  );
}

export default VWeather;
