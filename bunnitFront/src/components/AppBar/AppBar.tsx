import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {styles} from './AppBar.styles'; // 스타일 파일 임포트
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation'; // RootStackParamList를 가져옵니다
import icons from '../../constants/icons'; // 아이콘 임포트

type AppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AppBar: React.FC = () => {
  const navigation = useNavigation<AppBarNavigationProp>();
  const [selectedIcon, setSelectedIcon] = useState<string>('Home');

  const tabs: {
    name: string;
    screen: keyof RootStackParamList;
    activeIcon: JSX.Element;
    disabledIcon: JSX.Element;
  }[] = [
    {
      name: 'HOME',
      screen: 'Home',
      activeIcon: <icons.home width={24} height={24} />,
      disabledIcon: <icons.homeDisabled width={24} height={24} />,
    },
    {
      name: 'CALENDAR',
      screen: 'Calendar',
      activeIcon: <icons.calendar width={24} height={24} />,
      disabledIcon: <icons.calendarDisabled width={24} height={24} />,
    },
    {
      name: 'LIBRARY',
      screen: 'Library',
      activeIcon: <icons.library width={24} height={24} />,
      disabledIcon: <icons.libraryDisabled width={24} height={24} />,
    },
    {
      name: 'MY PAGE',
      screen: 'MyPage',
      activeIcon: <icons.mypage width={24} height={24} />,
      disabledIcon: <icons.mypageDisabled width={24} height={24} />,
    },
  ];

  return (
    <View style={styles.appBarContainer}>
      <View style={styles.appBar}>
        {tabs.map((tab, index) => (
          <Pressable
            key={index}
            style={styles.icon}
            onPress={() => {
              setSelectedIcon(tab.screen); // 선택된 아이콘 상태 업데이트
              navigation.navigate(tab.screen); // 해당 화면으로 이동
            }}>
            {/* 현재 선택된 아이콘에 따라 활성/비활성 아이콘 렌더링 */}
            {selectedIcon === tab.screen ? tab.activeIcon : tab.disabledIcon}
            <Text style={styles.text}>{tab.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AppBar;
