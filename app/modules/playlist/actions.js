import * as t from './actionTypes';
import * as api from './api';

export function getSurah(data, successCB, errorCB) {
    return dispatch => {
      api.getSurah(data, function(data, success, error) {
        if (success) successCB(data);
        else if (error) errorCB(error);
      });
    };
  }