import React,{useState,useEffect,useContext} from 'react';
import './Home.css'
import bridge from '@vkontakte/vk-bridge';
import {Icon28ErrorCircleOutline ,Icon20HelpOutline, Icon20FavoriteCircleFillYellow,Icon20NotificationOutline ,Icon20CrownCircleFillVkDating} from '@vkontakte/icons';
import {useLastName} from './../Store'
import {useZagr} from './../Store3'
import { Link, useParams } from 'react-router-dom'
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input,Snackbar } from '@vkontakte/vkui';
import ItemName from './Components/ItemName';
import { Context } from "./Context";
import {dataZero} from './../data'
import {dataZeroName} from './../dataName'
import Top from './Components/Top';
import InfiniteScroll from 'react-infinite-scroll-component';
import LazyLoad from 'react-lazy-load'

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

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
  const [ok,setOk] = useState(false)
  const [heh,setHeh] = useState(true)
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
	
	const onKeyDown = e =>{
    // обработайте нажатие клавиши. 
    if (searchTerm1.length > 2 && e.key === 'Enter') {
      handle()
    }
    if (e.key === 'Backspace') {
      // 👇️ your logic here
      
      console.log(searchTerm1)
      // setTimeout(proverka,2000)

    }
  }
  


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
        Нельзя вводить спецсимволы. Ввод только на кириллице.
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
  const openError2 = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
      >
        Отсутсвует сеть.
      </Snackbar>,
    );
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [pokaz,setPokaz] = useState(false)
  
  function isValid(username) {
    return /^[а-яА-ЯёЁi]+$/.test(username)
 }

  const handleInputChange = (event) => {
    
    const text = event.target.value

    
    if (text.length == 0){
      // console.log(text);
      
      setPokaz(false)
      // console.log('pokaz false');
      
    }
    
    // if(text.length>0 && isValid(text)===false){
    //   // alert('Введен неккоректный текст (спецсимвол)')
    //   openError()
    //   return text.slice(0,-1)

    // }
    const textCorrect = text.trim()
    setSearchTerm1(textCorrect);
    


    if (searchTerm1.length >100){
      setPokaz(true)
    }else if (searchTerm1.length <= 0){
      setPokaz(false)
    }
    if (text === ''){
      setSearchTerm1('')
      setSearchTerm('')
    }
    if (textCorrect.length > 2){
      setDis(false)
    }
    
    
    if (textCorrect.length <= 2){
      setDis(true)
    }
    
  };

  const handle = (event) => { 
    if(conditionValue === true){
      openError1()
      return
    }
    if( isValid(searchTerm1)===false){
      // alert('Введен неккоректный текст (спецсимвол)')
      openError()
      return 

    }
    setSearchTerm(searchTerm1);
    setPokaz(true)

    if (searchResults === '' && searchTerm != '' ){
      console.log('Нет таких имен!');
      
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
    if(conditionValue === true){
      openError2()
      return
    }
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
    if(conditionValue === true){
      openError2()
      return
    }
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

  
  const zagrZus = useZagr((state)=>state.bears) 
  const setzagrZus = useZagr((state)=>state.increasePopulation) 


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

  const time = ()=>{
    if (zagrZus === 0){
      setZagr(true)
      const tik = ()=>{
        setZagr(false)
        setzagrZus()
      }
      setTimeout(tik,1500)
    }

  }
  // bridge.send('VKWebAppGetLaunchParams')
  // .then((data) => { 
  //   if (data.vk_app_id) {
  //     // Параметры запуска получены
  //     console.log(data)
  //   }else {
  //     setOk(true)
  //   }
  // })
  // .catch((error) => {
  //   // Ошибка
  //   console.log('vvvvvvvv',error);
  //   setOk(true)
  // });
 

 
  useEffect(()=>{
    console.log('rrr',window.location.href)

    time()
    let url = window.location.href
    let regexp = /vk_client=ok/i;
    if (regexp.test(url)){
      console.log('zzzzzzzzzzzzzzzzzzzz')
      setOk(true)
    }else{
      console.log('ooooooooooooooooo')
     
    }

  },[])
  
 
  return (
    <> 
      {zagr? 
        <div className='zagMain zagMain1'>
				    <div className='zagzag'>
				    	<h1 className='zagryzka'>Идет загрузка</h1>
				    	<div className='spin'>
					    	<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					    </div>
				    </div>
			    </div>
      : ''}
      {zagr === false && <div className='container'>
       


        <div className='miniContainer'>
          <div className='obertka'>
          <div className="col-md-12 text-center">
              <h3 className="animate-charcter"> Узнайте значение своего имени!</h3>
          </div>
          <div className='InputParent'>
            
            <Input  onKeyDown={onKeyDown}   maxLength={17} pattern='[А-Яа-яЁё]' type="text" value={searchTerm1} onChange={handleInputChange} className='inputStyle btnPoisk1' placeholder='Введите имя '/>
          
            <Button disabled={dis? 'disabled' : ''} className={`btnPoisk btnPoisk2 ${ok? 'naitiOk' : '' }`} onClick={handle}><div className={` ${ok? 'naiti' : ''}`}>Найти</div></Button>
         
           {  searchTerm1&& <Button onClick={()=>{
            setPokaz(false)
            setSearchTerm1('')
            setDis(true)
            setSearchTerm('')}} className='btnDelete' mode='outline' appearance='neutral'>X</Button>}

           {
            
           searchTerm1 === '' && <Button onClick={()=>{
              
              NameVk()
              setDis(false)
            }} className='btnDelete' mode='outline' appearance='neutral'>{ok ? 'OK' : 'VK'}</Button>
            }
            

          
          </div>
          </div>
          <div className='LineParent LineTop'>
           <div className='Line'> </div>
          </div>
          {conditionValue && 
         <div className='redParent'>
            <p className ='red'>Потеряна связь с интернетом</p>
          </div>}

          
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
                             
                             <p className='vv3 vv4 vv5'>Топ 10 популярных <br></br>имен в 2022!</p>
                        </div>
                        
                    </Button>
                  </Link>
                </div>
                {
                ok === false &&
                <div className={`izbrannoeBtn ${izbran? 'zero2' : ''}`}>
                    <Button  className='btn2 fac' onClick={izbranoe} >
                        <div className='btnKek '>
                            <Icon20FavoriteCircleFillYellow/><p className='vv4'>Добавьте приложение в избранное! </p> 
                        </div>
                    </Button>
                </div>
                }
              
                { 
                ok === false &&
                <div className={`izbrannoeBtn mb ${podpiska? 'zero2' : ''}`}>
                    <Button className='btn2 fac' onClick={podiskaUvedomlenie}  >
                        <div className='btnKek '>
                             <Icon20NotificationOutline/><p className='vv4'>Подпишитесь на уведомления!</p>
                        </div>
                    </Button>
                </div>
                }
               

                {LastNameList.filter(element => element != null).length > 0&&<div className='LineParent LineTop'>
                 <div className='Line'> </div>
                </div>}

                <div className='LastName'>
                {LastNameList.filter(element => element != null).length > 0 ? LastNameList !== null&& <>
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
                  ))
                  }
                  </>: ""}
                </div>
              </div>
             : ''
            }
         { searchTerm && 
         <div className='netImeniStyle'>
          {searchResults.length > 0 ? '' : <p className='isomoeImya'>Искомое имя не найдено. Проверьте правильность введенного имени. Ввод имени только на кириллице.</p>}
         </div>}

         {conditionValue  ? '' : searchTerm === '' ? '' : <>
          
         <ul className='ulStyle'>
        
            {searchResults.slice(0,30).map((result) => (
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
      </div>}

      
    </>
  );
}




export default Home;
