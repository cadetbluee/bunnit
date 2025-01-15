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
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMonthlyView, setIsMonthlyView] = useState(true); // 월/주 상태 관리

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleGestureEnd = ({nativeEvent}: any) => {
    const {translationX, translationY} = nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      // 좌우 스와이프
      if (translationX > 50) {
        // 스와이프 오른쪽 → 이전 달/주
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
        // 스와이프 왼쪽 → 다음 달/주
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
      // 상하 스와이프
      if (translationY < -50) {
        // 스와이프 위 → 주 캘린더
        setIsMonthlyView(false);
      } else if (translationY > 50) {
        // 스와이프 아래 → 월 캘린더
        setIsMonthlyView(true);
      }
    }

    // 애니메이션 위치 초기화
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const getDaysInMonth = (
    date: Date,
  ): {day: number; isCurrentMonth: boolean}[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const previousDays = Array.from({length: firstDay}, (_, i) => ({
      day: prevMonthDays - firstDay + i + 1,
      isCurrentMonth: false,
    }));

    const currentMonthDays = Array.from({length: daysInMonth}, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
    }));

    const totalDays = previousDays.length + currentMonthDays.length;
    const nextDays = Array.from({length: 42 - totalDays}, (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
    }));

    const allDays = [...previousDays, ...currentMonthDays, ...nextDays];
    const lastRowStartIndex = allDays.length - 7;
    const lastRow = allDays.slice(lastRowStartIndex);
    const isLastRowNextMonth = lastRow.every(day => !day.isCurrentMonth);

    return isLastRowNextMonth ? allDays.slice(0, lastRowStartIndex) : allDays;
  };

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
        {/* Header */}
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

        {/* Days of Week */}
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

        {/* Calendar Days */}
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
