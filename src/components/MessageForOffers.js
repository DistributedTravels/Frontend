import React from 'react';

const MessageForOffers = (props) => (
    <div>
        {props !== undefined  ? props.offer1.hotelName !=="" ?
        <div>
            <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p>{props.offer1.hotelName} </p>
                {props.offer1.prefersBigRooms === true ? <p>Apartament </p> : <p>Pokój 2-osobowy </p>}
                {props.offer1.hasOwnTransport === true ? <p>Dojazd własny </p> : <p>Samolot </p>} 
            </div>  
        </div> : <p></p>
        : <p></p>}

        {props !== undefined ? props.offer2.hotelName !== "" ?
        <div>
            <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p>{props.offer2.hotelName} </p>
                {props.offer2.prefersBigRooms === true ? <p>Apartament </p> : <p>Pokój 2-osobowy </p>}
                {props.offer2.hasOwnTransport === true ? <p>Dojazd własny </p> : <p>Samolot </p>}
            </div>
        </div> : <p></p>
        : <p></p>}
        {props !== undefined ? props.offer3.hotelName !== "" ?
        <div>
            <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                <p>{props.offer3.hotelName} </p>
                {props.offer3.prefersBigRooms === true ? <p>Apartament </p> : <p>Pokój 2-osobowy </p>}
                {props.offer3.hasOwnTransport === true ? <p>Dojazd własny </p> : <p>Samolot </p>}
            </div>
        </div> : <p></p>
        : <p></p>}
    </div>
);

export default MessageForOffers;