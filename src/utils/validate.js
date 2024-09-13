export const checkValidData = (email,password) =>{
    // const isNameValid = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(name)
    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);
    const isPasswordValid =  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);

    
    if(!isEmailValid) return "Email ID is not Valid";
    if (!isPasswordValid) return "Password is not valid";
    
    return null;
}