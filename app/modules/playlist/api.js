import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
console.disableYellowBox = true;

export function getSurah(callback) {
    fetch('http://api.alquran.cloud/v1/surah', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => callback(response.data))
      .catch(error => callback(false, null, error.json()));
  }