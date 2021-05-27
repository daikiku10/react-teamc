import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField' 
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Box from '@material-ui/core/Box'
import { useForm } from "react-hook-form";

const Order = () => {
  const [name,setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }
  const [nameError,setNameError] = useState("")
  if(name === ''){
    setNameError(<p>入力してください</p>)
  }else{
    setNameError("")
  }

  const [email,setEmail] = useState("")
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  // const [emailError,setEmailError] = useState("")
  let emailError;
  if(email === ''){
    emailError = <p>※入力必須</p>
  }else if(email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)){
    emailError = ""
  }else{
    emailError = <p>メールアドレスの形式が不正です</p>
  }
  const [zipcode, setZipcode] = useState("")
  const changeZipcode = e => {
    setZipcode(e.target.value)
  }
    
  let zipcodeError;
  if(zipcode === ''){
    zipcodeError = <p>※入力必須</p>
  }else if(zipcode.match(/^[0-9]{3}-[0-9]{4}$/)){
    zipcodeError = ""
  }else{
    zipcodeError = <p>郵便番号はXXX-XXXXの形式で入力してください</p>
  }

 const [address,setAddress] = useState("")
 const changeAddress = e => {
   setAddress(e.target.value)
 }
 let addressError;
 if(address === ''){
   addressError = <p>入力は必須です</p>
 }else{
   addressError = ''
 }
 const [tel,setTel] = useState("")
 const changeTel = e => {
   setTel(e.target.value)
 } 
 let telError;
 if(tel === ''){
   telError = <p>入力は必須です</p>
 }else if(tel.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/)){
   telError = ""
 }else{
   telError = <p>電話番号はXXXX-XXXX-XXXXの形式で入力してください</p>
 }

 const [time,setTime] = useState("")
 const changeTime = e => {
   setTime(e.target.value)
 } 

 const [pay,setPay] = useState("")
 const changePay = e => {
   setPay(e.target.value)
 } 

 const [credit,setCredit] = useState("")
 const changeCredit = e => {
   setCredit(e.target.value)
 } 
  const { register, watch, errors , handleSubmit } = useForm();
  // const watchName = watch("name")
  // let errorName;
  // if(watchName === ""){
  //   errorName = <p>名前を入力してください</p>
  // }
  // const watchEmail = watch("email")
  // let errorEmail;
  // if(watchEmail === ''){
  //   errorEmail = <p>メールアドレスを入力してください</p>
  // }
  
  const watchPay = watch("pay")
  let creditElement;
  if(watchPay === "2"){
    creditElement=
    <div>
      <Box mt={1}>
        <TextField id="credit" label="クレジットカード番号" style = {{width: 400}} onChange={changeCredit} value={credit} />
      </Box>
    </div>
  }
  

  const orderBtn = () => {
    
    const name= document.getElementById("name").value
    const email = document.getElementById("email").value
    const zipcode = document.getElementById("zipcode").value
    const address= document.getElementById("address").value
    const tel = document.getElementById("tel").value
    const time = document.getElementById("time").value
    const pay = document.getElementById("pay").value
    const credit = document.getElementById("credit").value
    const orderInfo = {
      name: name,
      email: email,
      zipcode: zipcode,
      address: address,
      tel: tel,
      time: time,
      pay: pay,
      credit: credit,
    }
    console.log(orderInfo)
    console.log(name)
  }

  return(
    <Box textAlign="center">
      <h2>お届先情報</h2>
      <Box>
        <TextField label="お名前"  type="text" value={name}  style = {{width: 400}} onChange={changeName}/>
        {nameError}
      </Box>
      <Box mt={2}>
        <TextField id="email" value={email} type="email" label="メールアドレス" style = {{width: 400}} onChange={changeEmail} />
        {emailError}
      </Box>
      
      <Box mt={2}>
        <TextField id="zipcode" label="郵便番号" style = {{width: 400}} value={zipcode} onChange={changeZipcode}/>
        {zipcodeError}
      </Box>
      <Box mt={1}>
        <TextField id="address" label="住所" style = {{width: 400}} onChange={changeAddress} value={address}/>
        {addressError}
      </Box>
      <Box mt={2}>
        <TextField id="tel" label="電話番号" style = {{width: 400}} onChange={changeTel} value={tel}/>
        {telError}
      </Box>
      <Box mt={2}>
        <TextField
          id="time"
          value={zipcode}
          value={time}
          onChange={changeTime}
          label="お届け希望日時"
          type="datetime-local"
          style = {{width: 400}}
          InputLabelProps={{
            shrink: true,
          }}/>
      </Box>
      <Box mt={2}>
        <InputLabel htmlFor="select">お支払い方法</InputLabel>
          <NativeSelect id="pay" onChange={changePay} style = {{width: 400}} {...register("pay")} value={pay}>
            <option value='' hidden>支払い方法を選択</option>
            <option value="1">代金引換</option>
            <option value="2">クレジット決済</option>
          </NativeSelect>
      </Box>
      {creditElement}
      <Box mt={3}>
        <Button variant="contained" style = {{width: 300}} onClick={() => {orderBtn()}}>この内容で注文する</Button>
      </Box>
  </Box>
 )

}
export default Order