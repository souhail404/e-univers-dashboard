import React from 'react'
import AddFacbookPixel from '../forms/AddFacbookPixel';
import AddTiktokPixel from '../forms/AddTiktokPixel';
import AddSnapchatPixel from '../forms/AddSnapchatPixel';

const PixelTab = () => {
    return (
        <div className="selected-tab-body">
            <AddFacbookPixel />
            <AddTiktokPixel />
            <AddSnapchatPixel />
        </div>
    )
}

export default PixelTab