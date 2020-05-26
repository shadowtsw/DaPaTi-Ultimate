import React from 'react';

let year = new Date().getFullYear();

export default () => <div className='has-background-info'>
    <br /><br />
    <footer className='has-text-centered'>
        <p className='has-text-white'>Made by the DaPaTi Team</p>
        <p className='has-text-white'>Copyright©{year}</p>
    </footer>
    <br /><br />
</div>