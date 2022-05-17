import React, { useEffect, useState } from "react"
import styled from "styled-components"
import AnalyTitle from "../../common/AnalyTitle"
import SolvedTable from "./SolvedLog/SolvedTable"
import SolvedPagination from "./SolvedLog/SolvedPagination"
import AnalyCard from "../../common/card/AnalyCard";

import { useRecoilValue } from 'recoil'
import { accessTokenState } from "../../../util/stateCollection"
import { getSolvingLog } from "../../../api/back/analysis/SolvedTable"

const Row = styled.div`
  display: flex;
  justify-content: center;
align-items: center;
  gap: 2em;
`;

const Sub = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top:5rem;
`

const None = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
`

const Solved = () => {
  const [rows, setRows] = useState([])
  const [currentPage, setPage] = useState(0)
  const [total, setTotal] = useState(5)
  const accessToken = useRecoilValue(accessTokenState)

  // page 검색 api
  const SolvingLogPage = async (page: any) => {
    setPage(page)
    await getSolvingLog(accessToken, currentPage, 5)
      .then(res => {
        console.log(res)
        setRows(res.data.data.content)
        setTotal(res.data.data.totalPages)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    SolvingLogPage(currentPage)
  }, [currentPage])

  return (
    <AnalyCard>
      <AnalyTitle>풀이 기록</AnalyTitle>
      {rows.length==0?
      <Sub>
        <None><a href="https://www.acmicpc.net" target='_blank' style={{color:"blue"}}>acmicpc.net</a> 에 제출한 문제가 없어요</None>
      </Sub>:
      <>
      <Row>
        <SolvedTable rows={rows}/>
      </Row>
      <Row>
        <SolvedPagination propPage={SolvingLogPage} total={total}/>
      </Row>
      </>
    }
    </AnalyCard>
  )
}

export default Solved
