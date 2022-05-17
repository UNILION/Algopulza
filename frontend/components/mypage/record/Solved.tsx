import React, { useEffect, useState } from "react"
import styled from "styled-components"
import AnalyTitle from "../../common/AnalyTitle"
import SolvedTable from "./SolvedLog/SolvedTable"
import SolvedPagination from "./SolvedLog/SolvedPagination"

import { useRecoilValue } from 'recoil'
import { accessTokenState } from "../../../util/stateCollection"
import { getSolvingLog } from "../../../api/back/analysis/SolvedTable"
import Link from "next/link"

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 0rem 1rem;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const None = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
`

const Button = styled.button`
  height: 5rem;
  width: 15rem;
  font-size: 1rem;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
  background-color: "#FAFBED";
  color: ${(props) => (props.color ? props.color : "")};
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #1A4568;
  }
  margin-top: 1rem;
`

const Solved = () => {
  const [rows, setRows] = useState([])
  const [currentPage, setPage] = useState(0)
  const [total, setTotal] = useState(5)
  const accessToken = useRecoilValue(accessTokenState)

  // 최초진입시 문제표시 api => 왜 해놨는지 물어보기
  // const solvingLog = async () => {
  //   await getSolvingLog(accessToken, 0, 20)
  //     .then(res => {
  //       console.log(res.data.data)
  //       setRows(res.data.data.content)
  //     })
  //     .catch(err => console.log(err))
  // }
  // useEffect(() => { 
  //   solvingLog()
  // }, [])

  // page 검색 api
  const SolvingLogPage = async (page: any) => {
    setPage(page)
    await getSolvingLog(accessToken, currentPage, 5)
      .then(res => {
        setRows(res.data.data.content)
        setTotal(res.data.data.totalPages)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    SolvingLogPage(currentPage)
  }, [currentPage])

  return (
    <Container>
      <AnalyTitle>풀이 기록</AnalyTitle>
      {rows.length==0?
      <div>
        <None>아직 풀이 기록이 없습니다! 문제를 풀고 추천 탭에서 등록해주세요!</None>
        <Link href="/recommendation"><Button>추천 페이지로 이동하기</Button></Link>
      </div>:
      <>
      <Row>
        <SolvedTable rows={rows}/>
      </Row>
      <Row>
        <SolvedPagination propPage={SolvingLogPage} total={total}/>
      </Row>
      </>
    }
    </Container>
  )
}

export default Solved
