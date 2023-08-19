import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import AddFacbookPixel from '../forms/AddFacbookPixel';
import AddTiktokPixel from '../forms/AddTiktokPixel';
import AddSnapchatPixel from '../forms/AddSnapchatPixel';

const PixelTab = () => {
    const {user} =useAuth()

    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', `Bearer ${user.token}`);

    return (
        <div className="selected-tab-body">
            <AddFacbookPixel />
            <AddTiktokPixel />
            <AddSnapchatPixel />
        </div>
    )
}

export default PixelTab