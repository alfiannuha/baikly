const Config = {
  checkDomain : () => {
    let windowLoc = window.location.hostname
    
    if(windowLoc == 'cms-kimi.yureka.dev' || windowLoc == 'localhost'){
      return 'https://kimi.v1.yureka.dev/'
    } else {
      return 'https://v1.yureka.dev'
    }
  }
}

export default Config