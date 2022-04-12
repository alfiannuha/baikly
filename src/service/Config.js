const Config = {
  checkDomain : () => {
    let windowLoc = window.location.hostname
    
    if(windowLoc == 'localhost'){
      return 'http://127.0.0.1:4010/v1/'
    } else {
      return 'https://v1.yureka.dev'
    }
  }
}

export default Config