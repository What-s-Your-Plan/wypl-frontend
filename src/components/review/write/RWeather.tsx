import Question from '@/assets/icons/emoji/question.svg';
import SunDim from '@/assets/icons/sunDim.svg';
import Cloud from '@/assets/icons/weather/cloud.svg';
import CloudAngledRain from '@/assets/icons/weather/cloudAngledRain.svg';
import CloudSnow from '@/assets/icons/weather/cloudSnow.svg';
import FastWind from '@/assets/icons/weather/fastWinds.svg';
import Sun from '@/assets/icons/weather/sun.svg';
import { WhiteContainer } from '@/components/common/Container';
import { InputDefault } from '@/components/common/InputText';
import { WeatherContent } from '@/objects/Content';
import useReviewStore from '@/stores/ReviewStore';

type RWeatherProps = {
  index: number;
  content: WeatherContent;
};

function RWeather({ index, content }: RWeatherProps) {
  const { setContent } = useReviewStore();
  const handleWeather = (weather: string) => {
    const newContent = content;
    newContent.weather = weather;
    setContent(index, newContent);
  };

  const handleTextInput = (description: string) => {
    const newContent = content;
    newContent.description = description;
    setContent(index, newContent);
  };

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
      <div className="flex flex-row flex-wrap items-center">
        <div>
          <div className="mx-6 mt-1 mb-1 flex">
            <button onClick={() => handleWeather('Sun')}>
              <img src={Sun} alt="맑음" className="w-12" />
            </button>
            <button onClick={() => handleWeather('Cloud')}>
              <img src={Cloud} alt="흐림" className="w-12" />
            </button>
            <button onClick={() => handleWeather('FastWind')}>
              <img src={FastWind} alt="바람" className="w-12" />
            </button>
            <button onClick={() => handleWeather('CloudAngledRain')}>
              <img src={CloudAngledRain} alt="비" className="w-12" />
            </button>
            <button onClick={() => handleWeather('CloudSnow')}>
              <img src={CloudSnow} alt="눈" className="w-12" />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {renderWeather(content.weather)}
          <InputDefault
            placeholder="오늘의 날씨를 입력해주세요"
            className="!h-10"
            value={content.description}
            onChange={(e) => handleTextInput(e.target.value)}
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default RWeather;
