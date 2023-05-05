import React,{useState,useEffect,useContext} from 'react';
import './Home.css'
import bridge from '@vkontakte/vk-bridge';
import {Icon28ErrorCircleOutline ,Icon20HelpOutline, Icon20FavoriteCircleFillYellow,Icon20NotificationOutline ,Icon20CrownCircleFillVkDating} from '@vkontakte/icons';
import {useLastName} from './../Store'
import { Link, useParams } from 'react-router-dom'
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input,Snackbar } from '@vkontakte/vkui';
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

  const [dis,setDis] = useState(true)
  const [podpiska,setPodpiska] = useState(false)
  const [izbran,setIzbran] = useState(false)
  const [context, setContext] = useContext(Context);
  const [poslednieImenas,setPoslednieImenas] = useState([])
	const [reclama,setReclama] = useState(false)
  const [zagr,setZagr] = useState(false)
	const [netImeni,setNetImeni] = useState(false)
  const [conditionValue,setContditionValue] = useState(false)
  const andeknodts = dataZero
  const [text, setText] = React.useState('');
  const [snackbar, setSnackbar] = React.useState(null);
	
	

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

  const openError = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
      >
        Нельзя вводить спецсимволы и иностранные символы. Ввод только на кириллице.
      </Snackbar>,
    );
  };
  
  const openError1 = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
      >
        Отсутсвует сеть. Поиск невозможен.
      </Snackbar>,
    );
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [pokaz,setPokaz] = useState(false)
  
  function isValid(username) {
    return /^[А-Яа-яЁё]+$/.test(username)
 }

  const handleInputChange = (event) => {
    
    const text = event.target.value
    if(text.length>0 && isValid(text)===false){
      // alert('Введен неккоректный текст (спецсимвол)')
      openError()
      return text.slice(0,-1)

    }
    const textCorrect = text.trim()
    setSearchTerm1(textCorrect);
    


    if (searchTerm1.length >100){
      setPokaz(true)
    }else if (searchTerm1.length <= 1){
      setPokaz(false)
    }
    if (text === ''){
      setSearchTerm1('')
      setSearchTerm('')
    }
    if (text.length > 2){
      setDis(false)
    }
    console.log('teeext',text.length);
    
    if (text.length <= 2){
      setDis(true)
    }
    
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
    if(conditionValue === true){
      openError1()
      return
    }
    setSearchTerm(searchTerm1);
    setPokaz(true)

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
    console.log(data);
    
    return data.filter((item) =>{
    return(
      item.toLowerCase().includes(query.toLowerCase())
      
      )}
      // Object.keys(item).join().toLowerCase().includes(query.toLowerCase())
    );
  }
  useEffect(()=>{
    if (window.localStorage.getItem('izbran') === '1'){
      setIzbran(true)
    }
    if (window.localStorage.getItem('podpiska') === '1'){
      setPodpiska(true)
    }
  
  },[])


  const NameVk = ()=>{
    // setSearchTerm(fetchedUser.first_name)
    setSearchTerm1(fetchedUser.first_name)
  }

  function izbranoe(){
    bridge.send('VKWebAppAddToFavorites')
  .then((data) => { 
    if (data.result) {
      // Мини-приложение или игра добавлены в избранное
      setIzbran(true)
      window.localStorage.setItem('izbran', '1')
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
      setPodpiska(true)
      window.localStorage.setItem('podpiska', '1')
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

  bridge.send('VKWebAppHideBannerAd')
  .then((data) => { 
    if (data.result) {
      // Баннерная реклама скрыта
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
 
  return (
    <>
      
      <div className='container'>
        {/* <Title className='TitleStyle TAKs' weight="1" level="1" style={{ marginBottom: 16 }}>Узнай значение своего имени!</Title> */}
        


        {zagr? 
          <div className='zagzag'>
              <p>Идет загрузка...</p> 
              <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        : ''}

        <div className='miniContainer'>
          <div className='obertka'>
          <div className="col-md-12 text-center">
                  <h3 className="animate-charcter"> Узнайте значение своего имени!</h3>
          </div>
          <div className='InputParent'>
            
            <Input maxLength={17} pattern='[А-Яа-яЁё]' type="text" value={searchTerm1} onChange={handleInputChange} className='inputStyle btnPoisk1' placeholder='Введите имя '/>
          
            <Button disabled={dis? 'disabled' : ''} className='btnPoisk btnPoisk2 ' onClick={handle}><div className='naiti'>Найти</div></Button>
         
           {searchTerm1&& <Button onClick={()=>{
            setPokaz(false)
            setSearchTerm1('')
            setDis(true)
            setSearchTerm('')}} className='btnDelete' mode='outline' appearance='neutral'>X</Button>}

           {searchTerm1 === '' && <Button onClick={()=>{
              console.log(fetchedUser)
              NameVk()
              setDis(false)

            }} className='btnDelete' mode='outline' appearance='neutral'>VK</Button>}
            

          
          </div>
          </div>
          <div className='LineParent LineTop'>
           <div className='Line'> </div>
          </div>
          

          {/* {pokaz === false ?  
          <div className='shParent'>
            <p className='sh'>Ввод имени только на кириллице</p>
          </div> : ""} */}
          
            { pokaz === false? 
           
              <div className='izbrannoe'>
               <div className='izbrannoeBtn'>
                <Link className='vv' to='num'>
                    <Button  className='btn2 vv2 vv5'  >
                        <div className='btnKek vv3 hh'>
                            <div className='papaImg'>
                             <img className='img1' src='https://i.ibb.co/THpPyDj/1.png'/>
                            </div>
                             
                             <p className='vv3 vv4'>Узнайте нумерологию<br></br> своего имени!</p>
                        </div>
                    </Button>
                  </Link>
                </div>
                <div className='izbrannoeBtn'>
                <Link className='vv' to='top'>
                  
                    <Button  className='btn2 vv2 vv5'  >
                      
                        <div className='btnKek vv3 hh'>
                            <div className='papaImg'>
                              <img className='img1' src='https://i.ibb.co/V9cpmBn/2.png'/>
                            </div>
                             
                             <p className='vv3 vv4'>Топ 10 популярных <br></br>имен в 2022!</p>
                        </div>
                        
                    </Button>
                  </Link>
                </div>
                <div className={`izbrannoeBtn ${izbran? 'zero2' : ''}`}>
                    <Button  className='btn2 fac' onClick={izbranoe} >
                        <div className='btnKek '>
                            <Icon20FavoriteCircleFillYellow/><p className='vv4'>Добавьте приложение в избранное! </p> 
                        </div>
                    </Button>
                </div>
                <div className={`izbrannoeBtn mb ${podpiska? 'zero2' : ''}`}>
                    <Button className='btn2 fac' onClick={podiskaUvedomlenie}  >
                        <div className='btnKek '>
                             <Icon20NotificationOutline/><p className='vv4'>Подпишитесь на уведомления!</p>
                        </div>
                    </Button>
                </div>

                {LastNameList.length > 0&&<div className='LineParent LineTop'>
                 <div className='Line'> </div>
                </div>}

                <div className='LastName'>
                {LastNameList.length > 0 ? LastNameList !== null&& <>
                  {/* <Title className='TAKs'>История поиска</Title> */}
                  <div className="col-md-12 text-center">
                 
                      <h3 className="animate-charcter"> История поиска</h3>
                  </div>
                   {[...new Set(LastNameList)].map((LastName)=>(
                    
                    LastName &&
                   <div className='LastNameDiv'>
                      
                      <Link className='LastNameLink' to={`/${LastName}`}>
                      {/* <div onClick={zagryzimReclamy1}>{LastName}</div> */}
                      <div>{LastName}</div>
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
          {searchResults.length > 0 ? '' : <p className='isomoeImya'>Искомое имя не найдено. Проверьте правильность введенного имени. Ввод имени только на кириллице.</p>}
         </div>}

         {searchTerm === '' ? '' : <>
         <ul className='ulStyle'>
            {searchResults.map((result) => (
              <li key={result.id} className='liStyle'>
                <ItemName name1={result} getAnekdots={getAnekdots} zagr={zagr} poslendi={poslendi}  />
             
              </li>
               ))}
        
        
          </ul>
          </>}
        </div>
        
        {text && (
          <Group>
            <Div>{text}</Div>
          </Group>
        )}

        {snackbar}
      </div>
      {conditionValue && 
      <div className='redParent'>
        <p className ='red'>Потеряна связь с интернетом</p>
      </div>}
      
    </>
  );
}




export default Home;
