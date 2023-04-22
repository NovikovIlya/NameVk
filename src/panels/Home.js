import React,{useState,useEffect,useContext} from 'react';
import './Home.css'
import bridge from '@vkontakte/vk-bridge';
import { Icon20FavoriteCircleFillYellow,Icon20NotificationOutline ,Icon20CrownCircleFillVkDating} from '@vkontakte/icons';
import {useLastName} from './../Store'
import { Link, useParams } from 'react-router-dom'
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input } from '@vkontakte/vkui';
import ItemName from './Components/ItemName';
import { Context } from "./Context";
import {dataZero} from './../data'
import {dataZeroName} from './../dataName'
import Top from './Components/Top';


function Home({fetchedUser}) {
  bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' })
  .then((data) => {
    if (data.result) {
    } else {
      console.log('Рекламные материалы не найдены.');
    }
  })
  .catch((error) => { console.log(error); /* Ошибка */  });

  function fooButtonClick(){
  // Показать рекламу
  bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
    .then((data) => {
      if (data.result) // Успех
        console.log('Реклама показана');
      else // Ошибка 
        console.log('Ошибка при показе');
    })
    .catch((error) => { console.log(error); /* Ошибка */ });
  }

  const [context, setContext] = useContext(Context);
  const [poslednieImenas,setPoslednieImenas] = useState([])
	const [reclama,setReclama] = useState(false)
  const [zagr,setZagr] = useState(false)
	const [netImeni,setNetImeni] = useState(false)
  const [conditionValue,setContditionValue] = useState(false)
  const andeknodts = dataZero
	// const andeknodts = [
  //     {
  //         name: "Августин",
  //         mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
  //         people: "",
  //         dateName: "",
 
  //     {
  //         name: "Агап",
  //         mean: "\"Агап\" - это имя греческого происхождения, которое переводится как \"любовь\", \"любящий\".",
  //         people: "",
  //         dateName: ""
  //     },
  //     {
  //         name: "Агата",
  //         mean: "\"Агата\" - это имя греческого происхождения, которое переводится как \"благородная\", \"добрая\", \"благоприятствующая\".",
  //         people: "",
  //         dateName: ""
  //     },
  //     {
  //         name: "Агафья",
  //         mean: "\"Агафья\" - это имя греческого происхождения, которое переводится как \"добрый\", \"благой\", \"благоприятствующий\".",
  //         people: "",
  //         dateName: ""
  //     },
  //     {
  //         name: "Адам",
  //         mean: "\"Адам\" - это имя еврейского происхождения, которое переводится как \"человек\", \"человечество\", \"земля\".",
  //         people: "Адам из игры Дес Икс ",
  //         dateName: "1 января"
  //     },
      
	// ]

   const poslendi = (value)=>{
    setPoslednieImenas(...poslednieImenas,value)
  }
	
  function load(){
    setZagr(false)
  }

	function getAnekdots(){
    if(reclama === false){
      async function heh(){
        setZagr(true)
        // setTimeout(load,2000)
        setTimeout(fooButtonClick,2000)
      }
      heh()
    }
    setReclama(true)
	}

  const zagryzimReclamy1 = ()=>{
    if(context !== false){
        getAnekdots()
        setTimeout(menyamZagr2,5000)
    } 
  }

  const menyamZagr2 = ()=>{
    setContext(false)
  }


  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');

  const handleInputChange = (event) => {
    
    setSearchTerm1(event.target.value);
    // console.log(searchTerm);
    // console.log('111',searchResults);

    // if (searchResults === '' && searchTerm != '' ){
    //   console.log('Нет таких имен!');
    //   console.log(searchResults);
    //   setNetImeni(true)
      
    // }else if (searchTerm == ''){
    //   setNetImeni(false)
    // }
    // else {
    //   setNetImeni(false)
    // }
    
  };

  const handle = (event) => {
    
    setSearchTerm(searchTerm1);
   

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
    const data = dataZeroName
  
    return data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
      // Object.keys(item).join().toLowerCase().includes(query.toLowerCase())
    );
  }


  const NameVk = ()=>{
    setSearchTerm(fetchedUser.first_name)
  }

  function izbranoe(){
    bridge.send('VKWebAppAddToFavorites')
  .then((data) => { 
    if (data.result) {
      // Мини-приложение или игра добавлены в избранное
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
  }

  function podiskaUvedomlenie(){
    bridge.send('VKWebAppAllowNotifications')
  .then((data) => { 
    if (data.result) {
      // Разрешение на отправку уведомлений мини-приложением или игрой получено
    } else {
      // Ошибка
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
  }



  const LastNameList = useLastName((state)=>state.lastName)

  window.addEventListener('online',  updateOnlineStatus);
	  window.addEventListener('offline', updateOnlineStatus);
	  let condition
		function updateOnlineStatus(event) {
		 condition = navigator.onLine ? "online" : "offline";
		// document.body.className = condition;
		console.log(condition);
		if (condition === 'offline'){
			setContditionValue(true)
		}
		if (condition === 'online'){
			setContditionValue(false)
		}
		
	}

  return (
    <>
     
      <div className='container'>
        <Title className='TitleStyle TAKs' weight="1" level="1" style={{ marginBottom: 16 }}>Узнай значение своего имени!</Title>
        
        {zagr? <p>Идет загрузка...</p> : ''}

        <div className='miniContainer'>
          <div className='InputParent'>
          
           <Input type="text" value={searchTerm1} onChange={handleInputChange} className='inputStyle' placeholder='Введите имя'/>
          <Button className='btnPoisk' onClick={handle}>Найти</Button>
          
           {searchTerm&& <Button onClick={()=>setSearchTerm('')} className='btnDelete' mode='outline' appearance='neutral'>X</Button>}
           {searchTerm === '' && <Button onClick={()=>{
              console.log(fetchedUser)
              NameVk()
            }} className='btnDelete' mode='outline' appearance='neutral'>VK</Button>}

            
          </div>
            {searchTerm === '' ? 
           
              <div className='izbrannoe'>
               <div className='izbrannoeBtn'>
                <Link className='vv' to='top'>
                    <Button appearance='negative' className='btn2 vv2'  >
                        <div className='btnKek vv3'>
                             <Icon20CrownCircleFillVkDating/><p className='vv3 vv4'>Топ 10 популярных имен в 2022!</p>
                        </div>
                    </Button>
                  </Link>
                </div>
                <div className='izbrannoeBtn'>
                    <Button className='btn2' onClick={izbranoe} >
                        <div className='btnKek '>
                            <Icon20FavoriteCircleFillYellow/><p className='vv4'>Добавьте приложение в избранное! </p> 
                        </div>
                    </Button>
                </div>
                <div className='izbrannoeBtn'>
                    <Button className='btn2' onClick={podiskaUvedomlenie}  >
                        <div className='btnKek '>
                             <Icon20NotificationOutline/><p className='vv4'>Подпишитесь на рассылку!</p>
                        </div>
                    </Button>
                </div>

                <div className='LastName'>
                {LastNameList.length > 0 ? <>
                  <Title className='TAKs'>История поиска</Title>
                   {[...new Set(LastNameList)].map((LastName)=>(
                    LastName &&
                   <div className='LastNameDiv'>
                      
                      <Link className='LastNameLink' to={`/${LastName}`}>
                      <div onClick={zagryzimReclamy1}>{LastName}</div>
                      </Link>
                    </div>
                  ))}
                  </>: ""}
                </div>
              </div>
             : ''
            }
         {searchTerm && 
         <div className='netImeniStyle'>
          {searchResults.length > 0 ? '' : 'Искомое имя не найдено'}
         </div>}

         {searchTerm === '' ? '' : <>
         <ul className='ulStyle'>
            {searchResults.map((result) => (
              <li key={result.id} className='liStyle'>
                <ItemName name1={result.name} getAnekdots={getAnekdots} zagr={zagr} poslendi={poslendi}  />
             
              </li>
               ))}
        
        
          </ul>
          </>}
        </div>
        {conditionValue && <p className ='red'>Потеряна связь с интернетом</p>}
      </div>
    </>
  );
}




export default Home;
