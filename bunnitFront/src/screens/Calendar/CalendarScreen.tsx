import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './CalendarScreen.styles';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarScreen = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today); // 현재 표시 중인 달력의 기준 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 선택된 날짜
  const [isMonthlyView, setIsMonthlyView] = useState(true); // 월간/주간 보기 상태 관리

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // 제스처 종료 시 처리 (스와이프 방향에 따라 동작 수행)
  const handleGestureEnd = ({nativeEvent}: any) => {
    const {translationX, translationY} = nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      // 좌우 스와이프 처리
      if (translationX > 50) {
        // 이전 달 또는 이전 주로 이동
        if (isMonthlyView) {
          setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
          );
        } else {
          const prevWeek = new Date(currentDate);
          prevWeek.setDate(currentDate.getDate() - 7);
          setCurrentDate(prevWeek);
        }
      } else if (translationX < -50) {
        // 다음 달 또는 다음 주로 이동
        if (isMonthlyView) {
          setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
          );
        } else {
          const nextWeek = new Date(currentDate);
          nextWeek.setDate(currentDate.getDate() + 7);
          setCurrentDate(nextWeek);
        }
      }
    } else {
      // 상하 스와이프 처리
      if (translationY < -50) {
        setIsMonthlyView(false); // 주간 보기로 전환
      } else if (translationY > 50) {
        setIsMonthlyView(true); // 월간 보기로 전환
      }
    }

    // 애니메이션 위치 초기화
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
  };

  // 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  // 월간 보기 날짜 계산
  const getDaysInMonth = (
    date: Date,
  ): {day: number; isCurrentMonth: boolean}[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // 이전 달의 마지막 날짜
    const previousDays = Array.from({length: firstDay}, (_, i) => ({
      day: prevMonthDays - firstDay + i + 1,
      isCurrentMonth: false,
    }));

    // 현재 달의 날짜
    const currentMonthDays = Array.from({length: daysInMonth}, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
    }));

    // 다음 달의 시작 날짜
    const totalDays = previousDays.length + currentMonthDays.length;
    const nextDays = Array.from({length: 42 - totalDays}, (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
    }));

    // 총 날짜 배열 반환 (6줄 기준으로 배열 크기 조정)
    const allDays = [...previousDays, ...currentMonthDays, ...nextDays];
    const lastRowStartIndex = allDays.length - 7;
    const lastRow = allDays.slice(lastRowStartIndex);
    const isLastRowNextMonth = lastRow.every(day => !day.isCurrentMonth);

    return isLastRowNextMonth ? allDays.slice(0, lastRowStartIndex) : allDays;
  };

  // 주간 보기 날짜 계산
  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    return Array.from({length: 7}, (_, i) => ({
      day: new Date(
        startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1)),
      ).getDate(),
      isCurrentMonth: true,
    }));
  };

  const days = isMonthlyView
    ? getDaysInMonth(currentDate)
    : getWeekDates(currentDate);

  return (
    <PanGestureHandler onEnded={handleGestureEnd}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* 캘린더 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
              )
            }>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.month}>
            {currentDate.toLocaleString('default', {month: 'long'})}{' '}
            {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
              )
            }>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* 요일 표시 */}
        <View style={styles.daysOfWeek}>
          {daysOfWeek.map((day, index) => (
            <Text
              key={index}
              style={[
                styles.dayOfWeek,
                index === 0 && styles.sunday,
                index === 6 && styles.saturday,
              ]}>
              {day}
            </Text>
          ))}
        </View>

        {/* 캘린더 날짜 렌더링 */}
        <FlatList
          data={days}
          keyExtractor={(item, index) => index.toString()}
          numColumns={7}
          renderItem={({item}) => {
            const isToday =
              item.isCurrentMonth &&
              item.day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            const isSelected =
              item.isCurrentMonth &&
              selectedDate &&
              item.day === selectedDate.getDate() &&
              currentDate.getMonth() === selectedDate.getMonth() &&
              currentDate.getFullYear() === selectedDate.getFullYear();

            return (
              <TouchableOpacity
                style={[
                  styles.day,
                  isToday && styles.today,
                  isSelected && styles.selectedDay,
                ]}
                onPress={() =>
                  setSelectedDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      item.day,
                    ),
                  )
                }>
                <Text
                  style={[
                    styles.dayText,
                    !item.isCurrentMonth && styles.otherMonthDayText,
                  ]}>
                  {item.day}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CalendarScreen;
