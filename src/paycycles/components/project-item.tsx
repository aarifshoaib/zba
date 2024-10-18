import { Animated, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useRef, useContext } from 'react'
import { darkenColor, lightenColor, theme } from '../../shared/theme';
import { Swipeable } from 'react-native-gesture-handler';
import { mainStyle } from '../../shared/main-style';
import AppIcon from '../../shared/ui/icons';
import IbtikarStatus from './ibtikar-status';
import moment from 'moment';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AuthContext } from '../../auth/redux/auth.context';


const IbtikarItem = ({ data, navigation, index }) => {

  const authContext = useContext(AuthContext);
  const ref = useRef<BottomSheetModal>(null);
  const [isSwiped, setIsSwiped] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    ref.current?.present();
  }, []);

  const rightSwipe = (progress, dragX) => {
    const scaleButtonText = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });


    if (data.status === 'Not Approved') {
      return (
        <TouchableOpacity style={styles.actionButton} onPress={handlePresentModalPress}>
          <Animated.Text style={{ transform: [{ scale: scaleButtonText }], ...styles.actionText }}>Appeal</Animated.Text>
        </TouchableOpacity>
      )
    } else {
      return <></>
    }
  };

  const navigateToDetails = () => {
    authContext.selectedPC(data);
    navigation.navigate('HomeScreen');
  }

  return (
    <View style={[styles.container, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <TouchableOpacity onPress={navigateToDetails} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.ref}>{data.base_value}-{data.process_description}</Text>
            <View style={mainStyle.whiteChip}>
              <IbtikarStatus item={data} color={undefined} />
              <Text style={styles.status}>{data.hours_per_day}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={styles.date}>{moment(data.modified_on).format('DD-MMM-YYYY hh:mm') }</Text>
          </View>
        </View>
        <View style={[mainStyle.row, { justifyContent: 'space-between', paddingVertical: 5, alignItems: 'center' }]}>
          <View style={{ width: '60%' }}>
            <Text style={styles.suggestionTitle}
              numberOfLines={1} 
              ellipsizeMode="tail"
            >{moment(data.date_from).format('DD-MMM-YYYY hh:mm') } - {moment(data.date_to).format('DD-MMM-YYYY hh:mm')}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={mainStyle.listIcon}>
              <AppIcon type={'feather'} name={'users'} color={theme.primaryDark} size={10} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default IbtikarItem

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    marginBottom: 10,
    flex: 1
  },
  status: {
    fontFamily: theme.fontFamily,
    color: darkenColor(theme.primary, 0.1),
    fontSize: 11,
    marginEnd: 5,
    marginStart: 5
  },
  suggestionTitle: {
    color: '#4D4848',
    overflow: 'hidden',
    fontFamily: theme.fontFamily,
    paddingTop: 5,
    fontSize: 13
  },
  evenRow: {
    backgroundColor: '#F5FBFF',
    borderColor: '#DDECFC',
  },
  oddRow: {
    backgroundColor: '#fff',
    borderColor: '#D4E6F4',
  },
  date: {
    alignSelf: 'flex-end',
    fontFamily: theme.fontFamily,
    fontSize: 11,
    color: '#4D4848',
  },
  ref: {
    fontSize: 14,
    color: theme.primary,
    fontFamily: theme.fontSemiBold,
    marginEnd: 10
  },
  actionButton: {
    justifyContent: 'center',
    backgroundColor: theme.primary,
    width: 90,
    alignItems: 'center',
    borderBottomEndRadius: theme.controlBorderRadius,
    borderTopRightRadius: theme.controlBorderRadius
  },
  actionText: {
    fontSize: 18,
    alignSelf: 'center',
    color: theme.tint,
    fontFamily: 'Poppins'
  },
  itemWrapper: {
    borderRadius: 10,
    flexDirection: 'row'
  },
})