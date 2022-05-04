import styled from 'styled-components'

const Container = styled.section`
  text-align: center;
  font-size: 1vw;
`

type ValueProps = {
  value: number,
}

export default function InfoValue({ value }: ValueProps) {
  return (
    <Container>{value}</Container>
  )
}
