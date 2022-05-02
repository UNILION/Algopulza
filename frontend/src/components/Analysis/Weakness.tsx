import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { getWeek } from "api/weakness";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  margin-bottom: 3rem;
`;

const Weakness = () => {
  const [label, setLabel] = useState<Array<string>>();
  const [solved, setSolved] = useState<Array<number>>([]);
  useEffect(() => {
    getWeek()
      .then((res) => {
        console.log(res.data);
        const week = res.data;
        let label_temp = [];
        let solved_temp = [];
        let idx = 0;
        for (idx; idx < week.length; idx++) {
          label_temp.push(week[idx].key);
          solved_temp.push(week[idx].solvedcnt);
        }
        setLabel(label_temp);
        setSolved(solved_temp);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(label);
  console.log(solved);
  return (
    <Container>
      <Title>취약점</Title>
      <ApexCharts
        type="radar"
        series={[
          {
            name: "Tag",
            data: solved,
          },
        ]}
        options={{
          theme: {
            mode: "light",
          },
          chart: {
            type: "radar",
            height: "200%",
            background: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 2,
          },
          yaxis: {
            show: true,
            min: 0,
            max: 2,
            tickAmount: 2,
          },
          xaxis: {
            categories: label,
          },
          plotOptions: {
            radar: {
              size: 100,
              offsetX: 0,
              offsetY: 0,
              polygons: {
                strokeColors: "#e8e8e8",
                connectorColors: "#e8e8e8",
                fill: {
                  colors: undefined,
                },
              },
            },
          },
        }}
      />
    </Container>
  );
};

export default Weakness;