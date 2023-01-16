import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../App.css';

const Grid = ( { selectedImg }) => {
    return ( <div>
        <ImageList sx={{
            width: 1000,
            height: 200
        }}
            cols={5}
            rowHeight={4}
        >
            {selectedImg.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        // className={index === selected ? "selected" : ""}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"

                    />
                </ImageListItem>
            ))}
        </ImageList>
        {console.log(selectedImg)}
    </div> );
}
 
export default Grid;