import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  arrow: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: '#007AFF',
  },
  month: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  dayOfWeek: {
    fontSize: 16,
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Regular',
    flex: 1,
    textAlign: 'center',
  },
  sunday: {
    color: 'red', // Sun 빨간색
  },
  saturday: {
    color: '#007AFF', // Sat 파란색
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 6,
    marginVertical: 2,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: '#fff',
  },
  today: {
    borderColor: '#007AFF',
  },
  selectedDay: {
    borderColor: '#FF9500',
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: '#3d3d3d',
  },
  otherMonthDayText: {
    color: '#ccc', // 흐리게 보이도록 색상 설정
  },
});
