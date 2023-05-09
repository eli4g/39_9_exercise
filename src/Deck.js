import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Card from "./Card";

/** GitHub Profile Component --- shows info from GH API */

function Deck() {
  //const deck = useRef();
  const [deck, setDeck] = useState(null);
  const [deckAuto, setDeckAuto] = useState(null);
  const [card, setCard] = useState(null);
  const [cardAuto, setCardAuto] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [remainingAuto, setRemainingAuto] = useState(null);
  const [lastCard, setLastCard] = useState(0);
  const timerId = useRef();


  
  // this is called *after* component first added to DOM

  const fetchData = async () =>{

        const cardResult =  await axios.get(`https://deckofcardsapi.com/api/deck/${deckAuto}/draw/`);
        return cardResult;

};


const getDeck = async () =>{
  const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    

    
   
     
    
    
     

     return deckResult;

  };


const getDeck2 = async () =>{
    const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      

      
     
      
       

       return deckResult;


    };


  


  useEffect(() => {



   

    getDeck()
        .then(res => 
              {
                setDeck(res.data.deck_id);
                setRemaining(res.data.remaining);
              })
   
    getDeck2().then(res => 
      {
        setDeckAuto(res.data.deck_id);
        setRemainingAuto(res.data.remaining);
      });

 

      
    


    

  
    
  }, []);


  useEffect(() => {
            console.log("EFFECT RAN!");

            console.log(deck, " - ", deckAuto);

           


            timerId.current = setInterval(() => {
             
             
              if (remainingAuto === 0){ 
                console.log("EFFECT RAN inside ELSE!");
  
                setLastCard(-1);
  
  
            }else if (deckAuto) {
               fetchData().then(res =>{
                setRemainingAuto(res.data.remaining);
                setCardAuto(res.data.cards[0].image);
               }); 

            } 
            
                               
                



         }, 1000);




          



 



           


            return () => {
              console.log("Unmount ID", timerId.current);
              clearInterval(timerId.current);
            };
          }, [timerId,deckAuto,cardAuto]);
 
        

        

  



  async function getCard() {



            if (remaining === 0){

              setRemaining(-1)

            }else{
            
            const cardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`);
            
            console.log (cardResult.data.remaining);

            setRemaining(cardResult.data.remaining)

            setCard(cardResult.data.cards[0].image);

            }


          


       
       
   
    };








  
  return (
    <div>
    <div>
       
       <button onClick = {getCard}>Get Card Manually</button>
       <div>{remaining < 0 ? <h2>Error: No More Cards</h2> : <div>{card ? <img src = {card}/> : <i>loading...</i>}</div>}
       </div>
    </div>



     <div>
          
    <button onClick = {() => {getDeck2().then(res => 
      {
        setDeckAuto(res.data.deck_id);
        setRemainingAuto(res.data.remaining);
        console.log(deckAuto);
        console.log(cardAuto);
      });}}>Get Card Automatically</button>
    <div>{lastCard < 0 ? <h2>Error: No More Cards</h2> : <div>{cardAuto ? <div> <img src = {cardAuto}/> <p>{remainingAuto}</p></div> : <i>loading...</i>}</div>}
    
    </div> 

    </div>
    </div>
  );
};
// end

export default Deck;
