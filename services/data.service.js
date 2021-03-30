let accountDetails ={
       
    1000:{acno:1000,balance:10000,username:"Ajith",password:"testuser"},
    1001:{acno:1001,balance:20000,username:"Joseph",password:"testuser1"},
    1002:{acno:1002,balance:25000,username:"Anupama",password:"testuser2"}

}

let currentUser;

const register = (acno,username,password) =>{
    console.log("register called")
   
    if(acno in accountDetails){
      
      return{
          status:false,
          statusCode: 422,
          message:"User already exist. Please Log in"
      } 
    }
    
    accountDetails[acno]={
      acno,
      balance:0,
      username,
      password
    }
  // this.saveDetails();
    console.log(this.accountDetails);
    return{
        status:true,
        statusCode: 200,
        message:"Registration successful"
    } 
  }

  const login = (req,accno,pwd) =>{
    let dataset=accountDetails;
       if(accno in dataset){
         var pswd1 = dataset[accno].password
         //console.log(pswd1);
         if(pswd1==pwd){
         req.session.currentUser= dataset[accno]
          //this.saveDetails();
          return{
            status:true,
            statusCode: 200,
            message:"Login Successful"
        } 
     }
      else{
       return{
            status:false,
            statusCode: 422,
            message:"Incorrect password"
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