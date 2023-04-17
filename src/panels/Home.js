import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Home.css'
import bridge from '@vkontakte/vk-bridge';


import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input } from '@vkontakte/vkui';
import ItemName from './Components/ItemName';

function Home({fetchedUser}) {

  bridge.send('VKWebAppCheckNativeAds', { ad_format: 'reward' })
  .then((data) => {
    if (data.result) {

    } else {
      console.log('Рекламные материалы не найдены.');
    }
  })
  .catch((error) => { console.log(error); /* Ошибка */  });

  function fooButtonClick()
{
  // Показать рекламу
  bridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
    .then((data) => {
      if (data.result) // Успех
        console.log('Реклама показана');
      else // Ошибка 
        console.log('Ошибка при показе');
    })
    .catch((error) => { console.log(error); /* Ошибка */ });
}

	const [joke, setJoke] = useState('');
	const [image,setImage] = useState()
	const [reclama,setReclama] = useState(false)
  const [zagr,setZagr] = useState(false)
	const [netImeni,setNetImeni] = useState(false)
	const andeknodts = [
      {
          name: "Августин",
          mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
          people: "",
          dateName: ""
      },
      {
          name: "Агап",
          mean: "\"Агап\" - это имя греческого происхождения, которое переводится как \"любовь\", \"любящий\".",
          people: "",
          dateName: ""
      },
      {
          name: "Агата",
          mean: "\"Агата\" - это имя греческого происхождения, которое переводится как \"благородная\", \"добрая\", \"благоприятствующая\".",
          people: "",
          dateName: ""
      },
      {
          name: "Агафья",
          mean: "\"Агафья\" - это имя греческого происхождения, которое переводится как \"добрый\", \"благой\", \"благоприятствующий\".",
          people: "",
          dateName: ""
      },
      {
          name: "Адам",
          mean: "\"Адам\" - это имя еврейского происхождения, которое переводится как \"человек\", \"человечество\", \"земля\".",
          people: "Адам из игры Дес Икс ",
          dateName: "1 января"
      },
      
	]
	
  function load(){
    setZagr(false)
  }

	function getAnekdots(){

    if(reclama === false){
      async function heh(){
        setZagr(true)
        setTimeout(load,2000)
        setTimeout(fooButtonClick,2000)
        
        
      }
      heh()
      
    }
    setReclama(true)


	}


  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    console.log('111',searchResults);

    if (searchResults === '' && searchTerm != '' ){
      console.log('Нет таких имен!');
      console.log(searchResults);
      
      setNetImeni(true)
      
    }else if (searchTerm == ''){
      setNetImeni(false)
    }
    else {
      setNetImeni(false)
    }
    
  };



  const searchResults = getSearchResults(searchTerm);

  
 

  function getSearchResults(query) {
    const data = [
      {
        name: "Августин",
        mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
        people: "",
        dateName: ""
    },
    {
        name: "Агап",
        mean: "\"Агап\" - это имя греческого происхождения, которое переводится как \"любовь\", \"любящий\".",
        people: "",
        dateName: ""
    },
    {
        name: "Агата",
        mean: "\"Агата\" - это имя греческого происхождения, которое переводится как \"благородная\", \"добрая\", \"благоприятствующая\".",
        people: "",
        dateName: ""
    },
    {
        name: "Агафья",
        mean: "\"Агафья\" - это имя греческого происхождения, которое переводится как \"добрый\", \"благой\", \"благоприятствующий\".",
        people: "",
        dateName: ""
    },
    {
        name: "Адам",
        mean: "\"Адам\" - это имя еврейского происхождения, которое переводится как \"человек\", \"человечество\", \"земля\".",
        people: "",
        dateName: ""
    },
    ];
  
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // useEffect(()=>{
  //   NameVk()
  // },[])
  const NameVk = ()=>{
    setSearchTerm(fetchedUser.first_name)
  }



  return (
    <>
     
      <div className='container'>
        <Title className='TitleStyle' weight="1" level="1" style={{ marginBottom: 16 }}>Узнай значение своего имени!</Title>


        

        {zagr? <p>Идет загрузка...</p> : ''}

        <div className='miniContainer'>
          <div className='InputParent'>
           <Input type="text" value={searchTerm} onChange={handleInputChange} className='inputStyle' placeholder='Введите имя'/>
           {searchTerm&& <Button onClick={()=>setSearchTerm('')} className='btnDelete' mode='outline' appearance='neutral'>X</Button>}
           {searchTerm === '' && <Button onClick={()=>{
              console.log(fetchedUser)
              NameVk()
            }} className='btnDelete' mode='outline' appearance='neutral'>VK</Button>}
           {/* <Button className='BtnName' onClick={()=>{
              console.log(fetchedUser)
              NameVk()
            }}>VK</Button> */}
            
          </div>

         {searchTerm && 
         <div className='netImeniStyle'>
          {searchResults.length > 0 ? '' : 'Искомое имя не найдено'}
         </div>}

         {searchTerm === '' ? '' : <>
         <ul className='ulStyle'>
            {searchResults.map((result) => (
              <li key={result.id} className='liStyle'>
              <ItemName name1={result.name} getAnekdots={getAnekdots} zagr={zagr}  />
             
              </li>
               ))}
        
        
               </ul>
          </>}
    </div>
      
      </div>
    </>
  );
}




export default Home;
