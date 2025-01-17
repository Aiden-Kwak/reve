import TimetableContent from "./timetableContent";

export default function TimetablePage() {
  // 시간표 서버에서 가져오기전 임시. 
  const schedules = {
    ballet: {
      title: "발레 시간표",
      content: [
        "월요일: 10:00 AM - 12:00 PM",
        "수요일: 2:00 PM - 4:00 PM",
        "금요일: 6:00 PM - 8:00 PM",
      ],
    },
    modern: {
      title: "현대무용 시간표",
      content: [
        "화요일: 11:00 AM - 1:00 PM",
        "목요일: 3:00 PM - 5:00 PM",
        "토요일: 1:00 PM - 3:00 PM",
      ],
    },
    korean: {
      title: "한국무용 시간표",
      content: [
        "월요일: 4:00 PM - 6:00 PM",
        "수요일: 10:00 AM - 12:00 PM",
        "금요일: 2:00 PM - 4:00 PM",
      ],
    },
  };

  return <TimetableContent schedules={schedules} />;
}
