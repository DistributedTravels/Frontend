import React from 'react';

const MessageForChanges = (props) => (
    
    props.message
        .map(change => {

            return (
            <li key={change.key} className="border list-group-item mt-5 offer">

                <div class="row">
                    <div class="column3">
                        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                            <h4>{change.oldOffer.hotelName}</h4>
                            <h5>{change.oldOffer.destination}</h5>
                            <h5>Cena PLN: {change.oldOffer.totalPrice}</h5>
                                {change.oldOffer.offerAvailable ? <h5 style={{ color: 'green' }}> Oferta dostępna</h5> : <h5 style={{ color: 'red' }}> Oferta niedostępna</h5>}
                        </div>
                    </div>


                    <div class="column3">
                        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
                            <h4>{change.newOffer.hotelName}</h4>
                            <h5>{change.newOffer.destination}</h5>
                            <h5>Cena PLN: {change.newOffer.totalPrice}</h5>
                            {change.newOffer.offerAvailable ? <h5 style={{ color: 'green' }}> Oferta dostępna</h5> : <h5 style={{ color: 'red' }}> Oferta niedostępna</h5>}
                        </div>
                    </div>

                </div>
            </li>
            )
        })
  
);

export default MessageForChanges;