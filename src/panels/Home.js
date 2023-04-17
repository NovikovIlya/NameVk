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
	const images = ['/_6a103aba-2fd8-4a64-97eb-3958ab67fa4a.png',
					'/_1d9bb5df-3c09-4757-8220-6193314cbb90.png',
				     '/_6d86caa4-edf7-408a-8161-41cc7009618c.png',
            '/_9bce6d5b-0dfe-4858-9e33-5066ff491316.png',
            '/_9e7d7951-01dc-419f-859e-6315dcfe0207.png',
           '/_11f1a93a-f9f0-4878-be53-ea991a6deb77.png',
          '/_40ff23e6-cea2-4afb-a93b-91af671ee81c.png',
        '/_127a7218-d660-4a21-90ee-61b024e44750.png',
      '/_642a1eff-d337-47d6-80a9-758dfa3a1aca.png',
    '/_43748afb-80f7-42a7-b987-55c23b8cc5c5.png',
    '/_c9915854-1309-450b-991e-d6aa289040aa.png',
  '/_ecc0ca87-0525-42f4-9bbb-e478472aedcd.png']
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

	function getImages(){
		const randomItem = Math.floor(Math.random() * images.length);
		const randomImages = images[randomItem]
		console.log(randomImages);
		setImage(randomImages)
	}

  
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    
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

  const NameVk = ()=>{
    setSearchTerm(fetchedUser.first_name)
  }

  // NameVk()

  return (
    <>
     
      <div className='container'>
        <Title className='TitleStyle' weight="1" level="1" style={{ marginBottom: 16 }}>Узнай значение своего имени!</Title>


        

        {zagr? <p>Идет загрузка...</p> : ''}

        <div className='miniContainer'>
          <div className='InputParent'>
           <Input type="text" value={searchTerm} onChange={handleInputChange} className='inputStyle' placeholder='Введите имя'/>
           {searchTerm&& <Button onClick={()=>setSearchTerm('')} className='btnDelete' mode='outline' appearance='neutral'>X</Button>}
           
           {/* <Button className='BtnName' onClick={()=>{
              console.log(fetchedUser)
              NameVk()
            }}>Имя из ВК</Button> */}
          </div>
           

         {searchTerm === '' ? '' : <>
         <ul className='ulStyle'>
            {searchResults.map((result) => (
              <li key={result.id} className='liStyle'>
              <ItemName name1={result.name} getAnekdots={getAnekdots} zagr={zagr} />
             
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
