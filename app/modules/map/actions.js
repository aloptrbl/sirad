import * as t from './actionTypes';
import * as api from './api';

// Add Quote - CREATE (C)
export function addQuote(quote, successCB, errorCB) {
    return (dispatch) => {
        api.addQuote(quote, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get Quotes - READ (R)
export function getQuotes(successCB, data, errorCB) {
    return (dispatch) => {
        api.getQuotes(function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

// Update Quote - UPDATE (U)
export function updateQuote(quote, successCB, errorCB) {
    return (dispatch) => {
        api.updateQuote(quote, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete Quote - DELETE (D)
export function deleteQuote(quote, errorCB) {
    return (dispatch) => {
        api.deleteQuote(quote, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// Like/Unlike
export function toggleLove(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_QUOTES});
        api.toggleLove(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

export function toggleJoinEvent(event_id, cyclist_id, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_QUOTES});
        api.toggleJoinEvent(event_id, cyclist_id, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}