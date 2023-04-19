import React,{useState,useEffect,useContext} from 'react';
import './Home.css'
import bridge from '@vkontakte/vk-bridge';
import { Icon20FavoriteCircleFillYellow,Icon20NotificationOutline } from '@vkontakte/icons';
import {useLastName} from './../Store'
import { Link, useParams } from 'react-router-dom'
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input } from '@vkontakte/vkui';
import ItemName from './Components/ItemName';
import { Context } from "./Context";


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
	const andeknodts = [
      {
          name: "Августин",
          mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
          people: "",
          dateName: "",
          compatibility: 'Вопрос совместимость имени Августин с женскими именами достаточно сложен, впрочем, как и в случае с другими наименованиями. И тем не менее, имеется утверждение, согласно коему, наилучшей он является в случае создания пары с женщинами, именующимися такими вариациями как Лолита, Каролина, Кристина, Татьяна, Алевтина, Василиса, Наталья и Елизавета. Судя по всему, тут имеются высокие шансы на успешное построение реально крепкой и счастливой пары. Августа, Анфиса, Вероника, Элеонора, Прасковья, Стефания и Клавдия – в случае построения отношений с дамами, именующимися этими вариантами именоформ, совместимость чуть похуже. И все же. В паре обязательно будет взаимопонимание, любовь, страсть и искренность. Просто все это может резко и в самый неожиданный момент замениться на безудержную ревность и разногласия со скандалами по незначительным поводам. Особенно если характеры у обоих слишком взрывные. А с Тамилой, Ренатой, Серафимой, Станиславой, Стеллой, Варварой и Валерией астрологи и вовсе не рекомендуют создавать союз, ибо тут ни звездами, ни значениями имен не предусматривается никакой совместимость. Тут будут лишь ссоры и сплошной негатив. Хотя все это не стопроцентно точные утверждения.',
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

  

  return (
    <>
     
      <div className='container'>
        <Title className='TitleStyle TAKs' weight="1" level="1" style={{ marginBottom: 16 }}>Узнай значение своего имени!</Title>
        
        {zagr? <p>Идет загрузка...</p> : ''}

        <div className='miniContainer'>
          <div className='InputParent'>
           <Input type="text" value={searchTerm} onChange={handleInputChange} className='inputStyle' placeholder='Введите имя'/>
           {searchTerm&& <Button onClick={()=>setSearchTerm('')} className='btnDelete' mode='outline' appearance='neutral'>X</Button>}
           {searchTerm === '' && <Button onClick={()=>{
              console.log(fetchedUser)
              NameVk()
            }} className='btnDelete' mode='outline' appearance='neutral'>VK</Button>}

            
          </div>
            {searchTerm === '' ? 
              <div className='izbrannoe'>
                <div className='izbrannoeBtn'>
                    <Button onClick={izbranoe} >
                        <div className='btnKek '>
                            <Icon20FavoriteCircleFillYellow/>Добавьте приложение в избранное!
                        </div>
                    </Button>
                </div>
                <div className='izbrannoeBtn'>
                    <Button onClick={podiskaUvedomlenie}  >
                        <div className='btnKek '>
                             <Icon20NotificationOutline/>Подпишитесь на рассылку!
                        </div>
                    </Button>
                </div>

                <div className='LastName'>
                {LastNameList.length > 0 ? <>
                  <Title>История поиска</Title>
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
      </div>
    </>
  );
}




export default Home;
