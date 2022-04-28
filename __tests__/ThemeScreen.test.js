import React from 'react';
import ThemeScreen from '../screens/ThemeScreen';
import { fireEvent, render } from '@testing-library/react-native';



describe('Theme Screen Test', () => {
    it('TC1 : should go to Main page on click backToMain button', () => {
        const navigation = {navigate: () => {}}
        spyOn(navigation, 'navigate');

        const page = render(<ThemeScreen navigation={navigation}/>);

        const backButton = page.getByTestId('backButton');

        fireEvent.press(backButton);

        expect(navigation.navigate('Main'));
    })
})