import React from 'react';

let year = new Date().getFullYear();

export default () => <div className='has-background-info'>
    <br /><br />
    <footer className='has-text-centered'>
        <p>Copyright©{year}</p>
    </footer>
    <br /><br />
</div>