import { axiosInfo, axiosSignup, axiosStopwatch } from './axiosCollection'
import { getCurrentTime } from './getCurrentTime'
import { checkStopwatch} from './validationCollection'

// 예외 처리 결과 메시지 출력
export const sendMessage = (id: string, message: string) => {
  const result = document.getElementById(id)
  result!.innerText = message
  setTimeout(() => {result!.innerText = ''}, 1000)
}

export const sendLongMessage = (id: string, message: string) => {
  const result = document.getElementById(id)
  result!.innerText = message
}


// 이벤트 핸들러
export const handleSignupClick = (
    event: any, id: string, bojId: string, password: string, pwConfirm: string, solvedProblems: string, triedProblems: string, isCheck: boolean, router: any
  ) => {
    if (isCheck) {
      // console.log('not valid')
      sendLongMessage('signupResult', '아이디 중복체크를 먼저 해주세요!')
    } else if (password !== pwConfirm) {
      // console.log('not same')
      sendLongMessage('signupResult', '비밀번호가 일치하지 않습니다.')
    } else {
      axiosSignup(id, bojId, password, solvedProblems, triedProblems)
        .then(res => {
          // console.log(res.data.data)
          router.push('/')
        })
        .catch(err => {
          // console.log(err.response.data.errorCode === 'M002')
          if (err.response.data.errorCode === 'M002') {
            sendLongMessage('signupResult', '백준 ID를 입력해 주세요.')
          }
        })
    }
}

export const handleInfoClick = (event: any, info: any, accessToken: string) => {
  if (info.problemBojId.trim() === '') {
    // console.log('not valid')
  } else {
    axiosInfo(info, accessToken)
      .then(res => {
        // console.log(res)
        sendMessage('resultInfo', '감사합니다!')
      })
  }
}

export const handleStopwatchClick = (event: any, problemBojId: string, language: string, accessToken: string) => {
  const min = document.getElementById('min')!.textContent
  const currentTime = getCurrentTime()

  const info = {
    'problemBojId': problemBojId,
    'solvingTime': Number(min),
    'language': language,
    'submitTime': currentTime
  }

  if (checkStopwatch(problemBojId)) {
    axiosStopwatch(info, accessToken)
      .then(res => {
        console.log(res)
        sendMessage('stopwatchResult', '감사합니다!')
      })
  } else if (problemBojId === '' || Number(problemBojId) < 1000) {
    sendLongMessage('stopwatchResult', '문제 번호를 입력해주세요.')
  }
}
