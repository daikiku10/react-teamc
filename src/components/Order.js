import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField' 
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'


const Order = () => {
  const [name,setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value)
  }
  let nameError 
  if(name === ''){
    nameError = <label>名前を入力してください</label>
  }else{
    nameError = ''
  }
  const [email,setEmail] = useState("")
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  let emailError;
  if(email === ""){
    emailError = <p>メールアドレスを入力して下さい</p>
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
    zipcodeError = <p>郵便番号を入力して下さい</p>
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
    addressError = <p>住所を入力して下さい</p>
  }else{
    addressError = ''
  }
  const [tel,setTel] = useState("")
  const changeTel = e => {
    setTel(e.target.value)
  } 
  let telError;
  if(tel === ''){
    telError = <p>電話番号を入力して下さい</p>
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
  const today = new Date();
  const year = today.getFullYear()
  const month = "0" + (1 + today.getMonth())
  const day = today.getDate()
  const hour = today.getHours()
  const second = today.getSeconds()
  console.log(hour)
  console.log(second)
  console.log(typeof(year))
  console.log(year + month + day)
  const orderDate = year + month + day
  const specifyDate = Number(time.slice(0,4) + time.slice(5,7)  + time.slice(8,10))
  console.log(specifyDate)
  console.log(typeof(specifyDate))
  // if(time === ''){
  //   timeError = <p>配達日時を入力して下さい</p>
  // }else if(orderDate - specifyDate > 0){
  //   timeError = "過去の日付は選べません"
  // }else if(orderDate === specifyDate){
  //   if()
  // }
    




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
 let creditError;
 if(credit === ''){
   creditError = "クレジット番号を入力してください"
 }else if(credit.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)){
   creditError = ''
 }else{
   creditError = "クレジット番号はXXXX-XXXX-XXXX-XXXXの形式で入力してください"
 }
 if(pay === "2"){
  creditInput =
  <div>
    <Box mt={1}>
      <TextField id="credit" label="クレジットカード番号" style = {{width: 400}} type="text" value={credit} onChange={changeCredit} helperText={creditError}/>
    </Box>
  </div>
 }

  const orderBtn = () => {
    const orderInfo = {
      name: name,
      email: email,
      zipcode: zipcode,
      tel: tel,
      address: address,
      time: time,
      pat: pay,
      credit: credit
    }
    console.log(orderInfo)
  }

  return(
    <Box textAlign="center">
      <h2>お届先情報</h2>
      <Box>
        <TextField label="お名前"  type="text" value={name}  style = {{width: 400}} onChange={changeName} helperText={nameError} color="secondary"/>
      </Box>
      <Box mt={1}>
        <TextField id="email" value={email} type="email" label="メールアドレス" style = {{width: 400}} onChange={changeEmail} helperText={emailError} color="secondary"/>
      </Box>
      
      <Box mt={1}>
        <TextField id="zipcode" label="郵便番号" style = {{width: 400}} value={zipcode} onChange={changeZipcode} helperText= {zipcodeError} color="secondary"/>
      </Box>
      <Box mt={1}>
        <TextField id="address" label="住所" style = {{width: 400}} onChange={changeAddress} value={address} helperText={addressError} color="secondary"/>
      </Box>
      <Box mt={1}>
        <TextField id="tel" label="電話番号" style = {{width: 400}} onChange={changeTel} value={tel} helperText={telError} color="secondary"/>
      </Box>
      <Box mt={1}>
        <TextField
          id="time"
          value={zipcode}
          value={time}
          onChange={changeTime}
          label="お届け希望日時"
          type="datetime-local"
          style = {{width: 400}}
          helperText={timeError}
          color="secondary"
          min="2021-05-29T09:00"
          InputLabelProps={{
            shrink: true,
          }}/>
      </Box>
      <FormControl>
        <InputLabel>年</InputLabel>
        <Select
          style = {{width: 80}} 
        >
          <MenuItem value={20}>{year}</MenuItem>
          <MenuItem value={30}>{year + 1}</MenuItem>
          <MenuItem value={30}>{year + 2}</MenuItem>
          <MenuItem value={30}>{year + 3}</MenuItem>
          <MenuItem value={30}>{year + 4}</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">月</InputLabel>
        <Select
          style = {{width: 80}} 
        >
          <MenuItem value={1}>1月</MenuItem>
          <MenuItem value={2}>2月</MenuItem>
          <MenuItem value={3}>3月</MenuItem>
          <MenuItem value={4}>4月</MenuItem>
          <MenuItem value={5}>5月</MenuItem>
          <MenuItem value={6}>6月</MenuItem>
          <MenuItem value={7}>7月</MenuItem>
          <MenuItem value={8}>8月</MenuItem>
          <MenuItem value={9}>9月</MenuItem>
          <MenuItem value={10}>10月</MenuItem>
          <MenuItem value={11}>11月</MenuItem>
          <MenuItem value={12}>12月</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">日</InputLabel>
        <Select
         style = {{width: 80}} 
        >
          <MenuItem value={1}>01日</MenuItem>
          <MenuItem value={2}>02日</MenuItem>
          <MenuItem value={3}>03日</MenuItem>
          <MenuItem value={4}>04日</MenuItem>
          <MenuItem value={5}>05日</MenuItem>
          <MenuItem value={6}>06日</MenuItem>
          <MenuItem value={7}>07日</MenuItem>
          <MenuItem value={8}>08日</MenuItem>
          <MenuItem value={9}>09日</MenuItem>
          <MenuItem value={10}>10日</MenuItem>
          <MenuItem value={11}>11日</MenuItem>
          <MenuItem value={12}>12日</MenuItem>
          <MenuItem value={13}>13日</MenuItem>
          <MenuItem value={14}>14日</MenuItem>
          <MenuItem value={15}>15日</MenuItem>
          <MenuItem value={16}>16日</MenuItem>
          <MenuItem value={17}>17日</MenuItem>
          <MenuItem value={18}>18日</MenuItem>
          <MenuItem value={19}>19日</MenuItem>
          <MenuItem value={20}>20日</MenuItem>
          <MenuItem value={21}>21日</MenuItem>
          <MenuItem value={22}>22日</MenuItem>
          <MenuItem value={23}>23日</MenuItem>
          <MenuItem value={24}>24日</MenuItem>
          <MenuItem value={25}>25日</MenuItem>
          <MenuItem value={26}>26日</MenuItem>
          <MenuItem value={27}>27日</MenuItem>
          <MenuItem value={28}>28日</MenuItem>
          <MenuItem value={29}>29日</MenuItem>
          <MenuItem value={30}>30日</MenuItem>
          <MenuItem value={31}>31日</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>時間</InputLabel>
        <Select
          style = {{width: 100}} 
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

      <Box mt={1}>
        <InputLabel htmlFor="select">お支払い方法</InputLabel>
          <NativeSelect id="pay" onChange={changePay} value={pay} style = {{width: 400}} color="secondary">
            <option value='' hidden>支払い方法を選択</option>
            <option value="1">代金引換</option>
            <option value="2">クレジットカード決済</option>
          </NativeSelect>
      </Box>
      {creditInput}
      <Box mt={3}>
        <Button variant="contained" style = {{width: 300}} onClick={() => {orderBtn()}} color="secondary">この内容で注文する</Button>
      </Box>
  </Box>
 )

}
export default Order