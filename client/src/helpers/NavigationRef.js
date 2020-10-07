import React from 'react';

import { NavigationAction } from '@react-navigation/native';
let navigator;

export const setNavigator = nav => {
    navigator = nav
}

export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationAction.navigate({
            routeName,
            params
        })
    )
}