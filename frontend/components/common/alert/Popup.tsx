
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useRecoilValue } from 'recoil'
import { accessTokenState, checkState, stopwatchHourState, stopwatchLangauge, stopwatchMinState, stopwatchProbIdState, stopwatchSecState } from '../../../util/stateCollection'
import { handleStopwatchClick } from '../../../util/inputHandlerCollection'
import { Transition } from '../../../util/Transition'
import { useState } from 'react'


export default function Popup() {
  const [open, setOpen] = useState(false)
  const stopwatchProbId = useRecoilValue(stopwatchProbIdState)
  const language = useRecoilValue(stopwatchLangauge)
  const hour = useRecoilValue(stopwatchHourState)
  const min = useRecoilValue(stopwatchMinState)
  const sec = useRecoilValue(stopwatchSecState)
  const isCheck = useRecoilValue(checkState)
  const accessToken = useRecoilValue(accessTokenState)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseWithAgree = () => {
    handleStopwatchClick(event, stopwatchProbId, language, isCheck, accessToken)
    setOpen(false)
  }

  const handleCloseWithDisgree = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{padding: 0, fontSize: '1.1vw', width: '3.5vw', height: '2.2vw', marginRight: 20}}
      >
        제출
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseWithDisgree}
      >
        <DialogTitle>{"제출하시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="stopwatch">
            <p>문제 번호: {stopwatchProbId}</p>
            <p>사용 언어: {language}</p>
            <p>풀이 시간: {`${hour}시간 ${min}분 ${sec}초`}</p>
            <p>해결 여부: {isCheck ? '해결' : '시도'}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithDisgree}>뒤로</Button>
          <Button onClick={handleCloseWithAgree}>제출</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}