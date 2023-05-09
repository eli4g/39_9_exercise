import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

/** GitHub Profile Component --- shows info from GH API */

function Card({image}) {

    //const [card, setCard] = useState(null);



//      // this is called *after* component first added to DOM
//   useEffect(() => {
//     async function getCard() {
//       const cardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`);
        


//         console.log(cardResult.cards.image);
//         setCard(cardResult.cards.image);

   
//     }

    
//     getCard();
  
    
//   }, []);


  return (

        <div>
            <img src = {image}/>
        </div>



  )



}




export default Card;