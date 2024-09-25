 export const checkValidData=(email, password)=>{
    // using regex for form validation
    const isemailValid=/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)
    const ispasswordValid=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)
   //  const isnameValid=/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/.test(name)
    // const isPhno=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(Phno)



    if(!isemailValid) return "Email is not valid";
    if (!ispasswordValid) return "Password is not valid";
   //  if(!isnameValid) return "Name is not valid";
    // if(!isPhno) return "Phone Number not valid"

    return null;
 }