import React,{useState,useEffect} from 'react';
import {Button,TextField,InputLabel,Box,MenuItem,Select,FormControl,FormHelperText} from '@material-ui/core';
import {useHistory} from "react-router-dom" 
import { CART_STATUS_UNPAID, CART_STATUS_PAID,CASH_ON_DELIVERY,CREDIT_CARD} from '../actions/status'
import { useSelector, useDispatch } from "react-redux";
import { cartReset, order,newUserInfo,updateUserInfo } from '../actions/index'
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';
init("user_59w9f3gnlbT603nFuspj0");

const userSelector = (state) => state.user.user;
const cartSelector = state => state.cart.cart
const userInfoSelector = state => state.cart.userInfo
const Order = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleLink = path => history.push(path)
  const cart = useSelector(cartSelector);
  const user = useSelector(userSelector);
  const userInfo = useSelector(userInfoSelector)
  const userId = user.uid
  console.log(cart.itemInfo)
  
  // 名前入力、名前エラー
  const [name,setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }
  let nameError 
  if(name === ''){
    nameError = <>名前を入力してください</>
  }else{
    nameError = ''
  }
  // メール入力、メールエラー
  const [email,setEmail] = useState("")
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  let emailError;
  if(email === ''){
    emailError = <>メールアドレスを入力して下さい</>
  }else if(email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)){
    emailError = ''
  }else{
    emailError = <p>メールアドレスの形式が不正です</p>
  }
  // 郵便番号入力、郵便番号エラー
  const [zipcode, setZipcode] = useState("")
  const [address,setAddress] = useState("")
  useEffect(() => {
    if (zipcode) {
      fetch(`https://api.zipaddress.net/?zipcode=${zipcode}`, {
        mode: 'cors',
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          setAddress(result.data?.fullAddress || '');
        });
    }
  }, [zipcode]);

  let zipcodeError;
  if(zipcode === ''){
    zipcodeError = <>郵便番号を入力して下さい</>
  }else if(zipcode.match(/^[0-9]{3}-[0-9]{4}$/)){
    zipcodeError = ''
  }else{
    zipcodeError = <>郵便番号はXXX-XXXXの形式で入力してください</>
  }
  // 住所入力、住所エラー
  let addressError;
  if(address === ''){
    addressError = <>住所を入力して下さい</>
  }else{
    addressError = ''
  }
  // 電話番号入力、電話番号エラー
  const [tel,setTel] = useState("")
  const changeTel = e => {
    setTel(e.target.value)
  } 
  let telError;
  if(tel === ''){
    telError = <>電話番号を入力して下さい</>
  }else if(tel.match(/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/)){
    telError = ''
  }else{
    telError = <>電話番号はXXX-XXXX-XXXXの形式で入力してください</>
  }
  // 配達日時入力、配達日時エラー
  
  let timeError;
  const today = new Date();
  const year = today.getFullYear()
  const month = "0" + (1 + today.getMonth())
  const day = today.getDate()
  const hour = today.getHours()
  const second = today.getSeconds()
  const orderDate = Number(year + month + day)
  const orderTime = year + "-" + month + "-" + day + "-" + hour + ":" + second
  const [inputYear, setYear] = useState(year)
  const changeYear = (e) => {
    setYear(e.target.value)
  }
  const [inputMonth, setMonth] = useState(month)
  const changeMonth = (e) => {
    setMonth(e.target.value)
  }
  const [inputDate, setDate] = useState(day)
  const changeDate = (e) => {
    setDate(e.target.value)
  }
  const [inputHour, setHour] = useState("")
  const changeHour = (e) => {
    setHour(e.target.value)
  }
  const specifyDate =  Number(String(inputYear) + String(inputMonth)  + String(inputDate))
  const specifyTime = inputYear + "-" + inputMonth + "-" + inputDate + "-"  + inputHour + ":" + "00"
  if(inputHour === ''){
    timeError = <>配達希望日時を入力</>
  }else if(orderDate - specifyDate > 0){
    timeError = <>過去の日付は選択できません</>
  }else if(orderDate === specifyDate){
    if(inputHour - hour < 4 || inputHour - hour < 0){
      timeError = <>3時間後以降の日時をご入力</>
    }else{
      timeError = ''
    }
  }else{
    timeError = ''
  }
  // 支払い方法入力、支払い方法エラー
  const [pay,setPay] = useState("")
  const changePay = e => {
    setPay(e.target.value)
  } 
  let payError
  if(pay === ''){
    payError = <>支払い方法を選択してください</>
  }else{
    payError = ''
  }
  // クレジット入力画面、入力値取得、クレジットエラー
  const [credit, SetCredit] = useState("")
  const changeCredit = e => {
    SetCredit(e.target.value)
  }
  let creditError;
  if(credit === ''){
    creditError = <>クレジット番号を入力してください</>
   }else if(credit.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)){
     creditError = ''
   }else{
     creditError = <>クレジット番号はXXXX-XXXX-XXXX-XXXXの形式で入力してください</>
   }
   let creditInput;
   if(pay === CREDIT_CARD){
   creditInput =
   <>
     <Box mt={1}>
       <TextField id="credit" label="クレジットカード番号" style = {{width: 400}} type="text" value={credit} onChange={changeCredit} helperText={creditError}/>
     </Box>
   </>
  }
  // 注文ボタン押下
  let finalErrorMsg
  const [finalError, setFinalError] = useState(false)
  if(finalError){
    finalErrorMsg = <>※入力に誤りのある箇所を修正してください</>
  }
  const fetchUserInfo = () => {
    setName(userInfo.userName)
    setEmail(userInfo.email)
    setAddress(userInfo.address)
    setZipcode(userInfo.zipcode)
    setTel(userInfo.tel)
    SetCredit(userInfo.creditcardNo)
  }

const emailSend = (emailObj) => {
  emailjs.send('aedsp', 'template_0egn3ud', emailObj,'user_59w9f3gnlbT603nFuspj0').then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}

  const orderBtn = () => {
    const userId = user.uid
    const orderInfo = {
      // userId:userId,
      //ログイン中のユーザーID
      orderId: cart.orderId,
      id: cart.id, 
      //カートが持っているorderId
      itemInfo:cart.itemInfo, 
      //カートが持っているitemInfo
      destinationName: name,
      destinationEmail: email,
      destinationZipcode: zipcode,
      tel: tel,
      destinationAddress: address,
      destinationTime: specifyTime,
      orderDate:orderTime,
      paymentMethod: pay,
      creditcardNo: credit
    }
    const userInfoData = {
      userName: name,
      email: email,
      zipcode: zipcode,
      address: address,
      tel: tel,
      creditcardNo: credit
    }
    const emailObj = {
      from_name : "らくらくカレー",
      to_name: name,
      to_email: email,
      to_zipcode:zipcode,
      to_address: address,
      to_tel: tel,
      orderTime:orderTime,
      specifyTime:specifyTime
    }
    // 「代金引換」を選択して、バリデーションに引っかからなかった場合
    if(pay ===  CASH_ON_DELIVERY && nameError === '' && emailError === '' && zipcodeError === '' && addressError === '' && telError === '' && timeError === '' && payError === ''){
      orderInfo.status = CART_STATUS_UNPAID
      //action createrへの処理
      if(userInfo === ""){
        dispatch(newUserInfo(user,userInfoData))
      }else{
        userInfoData.id = userInfo.id
        dispatch(updateUserInfo(user,userInfoData))
      }
      console.log("email")
      emailSend(emailObj)
      console.log("emailaaaaaaaaa")
      dispatch(order(user, orderInfo))
      handleLink('/order-complete')
      
      
      // 「クレジット」を選択してバリデーションに引っかからなかった場合
    }else if(pay === CREDIT_CARD && nameError === '' && emailError === '' && zipcodeError === '' && addressError === '' && telError === '' && timeError === '' && payError === '' && creditError === ''){
      orderInfo.status = CART_STATUS_PAID
          //action createrへの処理
          if(userInfo === ""){
            dispatch(newUserInfo(user,userInfoData))
          }else{
            userInfoData.id = userInfo.id
            dispatch(updateUserInfo(user,userInfoData))
          }
          emailSend(emailObj)
          dispatch(order(user, orderInfo))
          handleLink('/order-complete')
      // バリデーションに一つでも引っかかった場合
    }else{
      setFinalError(true)
    }
  }

  return(
    <Box align="center">
      <h2>お届先情報</h2>
      {userInfo? <button onClick={() => {fetchUserInfo()}}>登録情報の呼び出し</button>: <></>}
      <Box>
        <TextField label="お名前"  type="text" value={name}  style = {{width: 400}} onChange={changeName} helperText={nameError} color="secondary"/>
      </Box>
      <Box mt={1}>
        <TextField id="email" value={email} type="email" label="メールアドレス" style = {{width: 400}} onChange={changeEmail} helperText={emailError} color="secondary"/>
      </Box>

      <Box mt={1}>
        <TextField id="zipcode" label="郵便番号" style = {{width: 400}} value={zipcode} onChange={(e) => {
            setZipcode(e.target.value);
          }} helperText= {zipcodeError} color="secondary"/>
      </Box>
      <Box mt={1}>
        <TextField id="address" label="住所" style = {{width: 400}} onChange={(e) => {
            setAddress(e.target.value);
          }} value={address} helperText={addressError} color="secondary" name="addr11" size="60"/>
      </Box>
      <Box mt={1}>
        <TextField id="tel" label="電話番号" style = {{width: 400}} helperText={telError} value={tel} onChange={changeTel}/>
      </Box>

      <Box mt={2}>
      <FormControl>
        <InputLabel>年</InputLabel>
        <Select
          onChange={changeYear}
          value={inputYear}
          style = {{width: 100}} 
          >
          <MenuItem value={year}>{year}年</MenuItem>
          <MenuItem value={year + 1}>{year + 1}年</MenuItem>
        </Select>
        <FormHelperText>{timeError}</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>月</InputLabel>
        <Select
          style = {{width: 100}} 
          onChange={changeMonth}
          value={inputMonth}
          >
          <MenuItem value="01">1月</MenuItem>
          <MenuItem value="02">2月</MenuItem>
          <MenuItem value="03">3月</MenuItem>
          <MenuItem value="04">4月</MenuItem>
          <MenuItem value="05">5月</MenuItem>
          <MenuItem value="06">6月</MenuItem>
          <MenuItem value="07">7月</MenuItem>
          <MenuItem value="08">8月</MenuItem>
          <MenuItem value="09">9月</MenuItem>
          <MenuItem value="10">10月</MenuItem>
          <MenuItem value="11">11月</MenuItem>
          <MenuItem value="12">12月</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>日</InputLabel>
        <Select
         style = {{width: 100}} 
         value={inputDate}
         onChange={changeDate}
         >
          <MenuItem value="1">1日</MenuItem>
          <MenuItem value="2">2日</MenuItem>
          <MenuItem value="3">3日</MenuItem>
          <MenuItem value="4">4日</MenuItem>
          <MenuItem value="5">5日</MenuItem>
          <MenuItem value="6">6日</MenuItem>
          <MenuItem value="7">7日</MenuItem>
          <MenuItem value="8">8日</MenuItem>
          <MenuItem value="9">9日</MenuItem>
          <MenuItem value="10">10日</MenuItem>
          <MenuItem value="11">11日</MenuItem>
          <MenuItem value="12">12日</MenuItem>
          <MenuItem value="13">13日</MenuItem>
          <MenuItem value="14">14日</MenuItem>
          <MenuItem value="15">15日</MenuItem>
          <MenuItem value="16">16日</MenuItem>
          <MenuItem value="17">17日</MenuItem>
          <MenuItem value="18">18日</MenuItem>
          <MenuItem value="19">19日</MenuItem>
          <MenuItem value="20">20日</MenuItem>
          <MenuItem value="21">21日</MenuItem>
          <MenuItem value="22">22日</MenuItem>
          <MenuItem value="23">23日</MenuItem>
          <MenuItem value="24">24日</MenuItem>
          <MenuItem value="25">25日</MenuItem>
          <MenuItem value="26">26日</MenuItem>
          <MenuItem value="27">27日</MenuItem>
          <MenuItem value="28">28日</MenuItem>
          <MenuItem value="29">29日</MenuItem>
          <MenuItem value="30">30日</MenuItem>
          <MenuItem value="31">31日</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>時間</InputLabel>
        <Select
          style = {{width: 100}} 
          value={inputHour}
          onChange={changeHour}
          >
          <MenuItem value={8}>08:00</MenuItem>
          <MenuItem value={9}>09:00</MenuItem>
          <MenuItem value={10}>10:00</MenuItem>
          <MenuItem value={11}>11:00</MenuItem>
          <MenuItem value={12}>12:00</MenuItem>
          <MenuItem value={13}>13:00</MenuItem>
          <MenuItem value={14}>14:00</MenuItem>
          <MenuItem value={15}>15:00</MenuItem>
          <MenuItem value={16}>16:00</MenuItem>
          <MenuItem value={17}>17:00</MenuItem>
          <MenuItem value={18}>18:00</MenuItem>
          <MenuItem value={19}>19:00</MenuItem>
          <MenuItem value={20}>20:00</MenuItem>
          <MenuItem value={21}>21:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box mt={2}>
      <FormControl>
        <Select id="pay" onChange={changePay} value={pay} style = {{width: 400}} color="secondary">
        <MenuItem value="" disabled>支払い方法を選択</MenuItem>
          <MenuItem value={CASH_ON_DELIVERY}>代金引換</MenuItem>
          <MenuItem value={CREDIT_CARD}>クレジットカード決済</MenuItem>
        </Select>
        <FormHelperText>{payError}</FormHelperText>
      </FormControl>
    </Box>
    {creditInput}
    <Box mt={3}>
      <div>
        {finalErrorMsg}
      </div>
      <Button variant="contained" style = {{width: 300}} onClick={() => {orderBtn()}} color="secondary">この内容で注文する</Button>
    </Box>
</Box>
)
}
export default Order