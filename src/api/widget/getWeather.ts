import { axiosWithAccessToken } from '../axios';

/* Response */
export type WeatherResponse = WeatherDetailData;

/* API */
export const getWeather = async () => {
  const { data } = await axiosWithAccessToken.get<BaseResponse<WeatherResponse>>(`/side/v1/weathers`);

  return data;
};
