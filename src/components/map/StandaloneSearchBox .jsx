import React, { useRef, useEffect, useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

const SearchBox = ({ onLoad, onPlacesChanged }) => {
    const searchBoxRef = useRef(null);

    const handleLoad = (searchBox) => {
        searchBoxRef.current = searchBox;
        if (onLoad) {
            onLoad(searchBox);
        }
    };

    useEffect(() => {
        if (searchBoxRef.current) {
          onLoad(searchBoxRef.current);
        }
    }, [onLoad]);

    return (
        <StandaloneSearchBox
            onLoad={handleLoad}
            onPlacesChanged={onPlacesChanged}>

            <input
            type="text"
            placeholder="Search for a place"
            style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
            }}
        />
        </StandaloneSearchBox>
      );
    };
    
    export default SearchBox;

      