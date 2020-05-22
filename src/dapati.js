import React from 'react';
import ReactDOM from 'react-dom';


function getQuery() {
    return document.getElementById('searchbar').value
}
function getFilter() {
    let query = '';
    let value = '';

    let filter = {
        limit: 20,
        offset: 0,
        where: {[query]: value}
    }
}