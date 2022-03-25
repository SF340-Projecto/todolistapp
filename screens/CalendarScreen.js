import React from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'

const CalendarScreen = () => {
    return (
        <>
            <Calendar 
            markingType={'period'}
            markedDates={{
                '2022-02-15': {marked: true, dotColor: '#50cebb'},
                '2022-02-16': {marked: true, dotColor: '#50cebb'},
                '2022-02-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                '2022-02-22': {color: '#70d7c7', textColor: 'white'},
                '2022-02-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                '2022-02-24': {color: '#70d7c7', textColor: 'white'},
                '2022-02-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
              }}
            />
        </>
    )
}

export default CalendarScreen;