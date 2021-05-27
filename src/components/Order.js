import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField' 
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Box from '@material-ui/core/Box'

const Order = () => {
  const [name,setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }
  let nameError
  if(name === ''){
    nameError = <p>名前を入力してください</p>
  }else{
    nameError = ''
  }

  const [email,setEmail] = useState("")
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
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
  let timeError;
  if(time === ''){
    timeError = <p>希望日時を選択してください</p>
  }
    




 const [pay,setPay] = useState("")
 const changePay = e => {
   setPay(e.target.value)
 } 
 const [credit, SetCredit] = useState("")
 const changeCredit = e => {
   SetCredit(e.target.value)
 }
 console.log(credit)
 let creditInput;
 if(pay === "2"){
  creditInput =
  <div>
    <Box mt={1}>
      <TextField id="credit" label="クレジットカード番号" style = {{width: 400}} type="text" value={credit} onChange={changeCredit}/>
    </Box>
  </div>
 }

  const orderBtn = () => {
    
  }

  return(
    <Box textAlign="center">
      <h2>お届先情報</h2>
      <Box>
        <TextField label="お名前"  type="text" value={name}  style = {{width: 400}} onChange={changeName}/>
        <p>{nameError}</p>
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
          {timeError}
      </Box>

      <Box mt={2}>
        <InputLabel htmlFor="select">お支払い方法</InputLabel>
          <NativeSelect id="pay" onChange={changePay} value={pay} style = {{width: 400}}>
            <option value='' hidden>支払い方法を選択</option>
            <option value="1">代金引換</option>
            <option value="2">クレジット決済</option>
          </NativeSelect>
      </Box>
      {creditInput}
      <Box mt={3}>
        <Button variant="contained" style = {{width: 300}} onClick={() => {orderBtn()}}>この内容で注文する</Button>
      </Box>
  </Box>
 )

}
export default Order