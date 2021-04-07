const db =require('./db');

let accountDetails ={
       
    1000:{acno:1000,balance:10000,username:"Ajith",password:"testuser"},
    1001:{acno:1001,balance:20000,username:"Joseph",password:"testuser1"},
    1002:{acno:1002,balance:25000,username:"Anupama",password:"testuser2"}

}

let currentUser;

const register = (acno,username,password) =>{
    //console.log("register called")
    
    return db.User.findOne({
      acno}).then(user=>{
     console.log(user)
      if(user){
        return{
          status:false,
          statusCode: 422,
          message:"User already exist. Please Log in"
      } 
      }
      else{
        const newUser = new db.User({
          acno,
      balance:0,
      username,
      password
        });
        newUser.save();
        return{
          status:true,
          statusCode: 200,
          message:"Registration successful"
      } 
      }
    })
  }

  const login = (req,accno,pwd) =>{
    var acno = parseInt(accno);
    return db.User.findOne({
      acno,
      password:pwd
    }).then(user=>{
      if(user){
        req.session.currentUser= user
        
          return{
            status:true,
            statusCode: 200,
            message:"Login Successful"
        } 
      }
      return{
        status:false,
        statusCode: 422,
        message:"Invalid Credentials"
    } 
    })

   }


const deposit = (acno,pwd,amount) => {
  
  var amt = parseInt(amount);
  let dataset=accountDetails;
  if(acno in dataset){
    var pswd1 = dataset[acno].password
    //console.log(pswd1);
    if(pswd1==pwd){
     dataset[acno].balance+=amt
    //this.saveDetails();
    return{
      status:true,
      statusCode: 200,
      message:"Account has been credited ",
      balance:dataset[acno].balance
                }
                          }
  
  else{
    return{
      status:false,
      statusCode: 422,
      message:"Incorret password "
      }
     }
 }
  else{
    return{
      status:false,
      statusCode: 422,
      message:"No user exist with provided Account Number"
      }
     
  }

}

const withdraw = (acno,pwd,amount) => {
  var amt = parseInt(amount);
  let dataset=accountDetails;
  if(acno in dataset){
    var pswd1 = dataset[acno].password
    //console.log(pswd1);
    if(pswd1==pwd){
      if(dataset[acno].balance>amount){
        dataset[acno].balance-=amt
    //this.saveDetails();
    return{
      status:true,
      statusCode: 200,
      message:"Account has been debited ",
      balance:dataset[acno].balance
                }
      }
      else{
        return{
          status:false,
          statusCode: 422,
          message:"Insufficient balance "
          }
      }
     
                          }
  
  else{
    return{
      status:false,
      statusCode: 422,
      message:"Incorret password "
      }
     }
 }
  else{
    return{
      status:false,
      statusCode: 422,
      message:"No user exist with provided Account Number"
      }
     
  }

}

  module.exports = {
    register,
    login,
    deposit,
    withdraw
  }