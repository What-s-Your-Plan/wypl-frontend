interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Widget {
  widgetType: string;
  layout: Layout;
}

/* Data */
interface DDayData {
  title: string;
  d_day: string;
  date: string;
  local_date: string;
}

interface WeatherDetailData {
  city: string;
  weather_id: number;
  temp: number;
  min_temp: number;
  max_temp: number;
  update_time: string;
  main: string;
  desc: string;
  is_sunrise: boolean;
}
