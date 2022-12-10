import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import question from "assets/img/QuestionCar.png";
import loading from "assets/img/loading2.gif";
import tempImage from "assets/img/GreyQuestionCar.png";
import Chart from "./Chart";
interface propsTypes {
  predictionList: Array<number>;
  fileName: string;
  setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// function getKeyByValue(object: any, value: number) {
//   return Object.keys(object).find((key: string) => object[key] === value);
// }

const CarConfirmPopup = ({
  fileName,
  predictionList,
  setPopUpOpen,
}: propsTypes) => {
  const [isLoading, setLoading] = useState(true);
  const [isAnalysisTabOpen, setAnalysisTabOpen] = useState(false);
  const dic = {
    "kia mohave": 0,
    "hyundai kona": 1,
    "kia sorento": 2,
    "genesis g90": 3,
    "chevrolet trailblazer": 4,
    "kia sportage": 5,
    "ssangyong torres": 6,
    "genesis g70": 7,
    "hyundai palisade": 8,
    "renault qm6": 9,
    "kia k3": 10,
    "kia k5": 11,
    "hyundai avante": 12,
    "ssangyong rexton": 13,
    "kia seltos": 14,
    "chevrolet spark": 15,
    "hyundai santafe": 16,
    "hyundai venue": 17,
    "kia carnival": 18,
    "kia morning": 19,
    "renault xm3": 20,
    "hyundai sonata": 21,
    "hyundai grandeur": 22,
    "genesis g80": 23,
    "renault sm6": 24,
    "kia k9": 25,
    "hyundai tucson": 26,
    "hyundai casper": 27,
    "kia k8": 28,
    "ssangyong tivoli": 29,
    "kia ray": 30,
  };
  console.log(fileName, predictionList.length);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const values: Array<string> = Object.keys(dic);
  const keys: Array<number> = Object.values(dic);

  const onAnalysisTabOpen = () => {
    setAnalysisTabOpen(c => !c);
  };
  const result = keys.map(v => ({
    label: values[v],
    value: predictionList[v] * 100,
  }));

  result.sort((a, b) => b.value - a.value);
  const chartData = [...result].splice(0, 4);
  chartData.push({
    label: "etc",
    value:
      100 -
      chartData[0].value -
      chartData[1].value -
      chartData[2].value -
      chartData[3].value,
  });
  console.log(chartData);

  return (
    <>
      {
        <PopUpWrapper
          onClick={() => {
            setPopUpOpen(false);
          }}
        >
          <PopUp
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {isLoading ? (
              <LoadingWrapper>
                <LoadingImageWrapper>
                  <LoadingImage src={question} alt="로딩 이미지" />
                  <LoadingGif src={loading} alt="로딩 GIF" />
                </LoadingImageWrapper>
                <LoadingText>차량 사진으로 브랜드와 모델 파악중...</LoadingText>
              </LoadingWrapper>
            ) : !isAnalysisTabOpen ? (
              <ResultWrapper>
                <ResultTitleText>이 차가 맞나요?</ResultTitleText>
                <ResultImage src={tempImage} />
                {/* vm에 저장해둔 분류 모델 이미지가 나와야 합니다. */}
                <ResultText>
                  <span>제조사</span>
                  <span>{result[0].label.split(" ")[0]}</span>
                </ResultText>
                <ResultText>
                  <span>모델</span>
                  <span>{result[0].label.split(" ")[1]}</span>
                </ResultText>
                <ResultText>
                  <span>AI 분석 확률</span>
                  <span>{result[0].value.toFixed(2)}%</span>
                </ResultText>
                <ButtonWrapper>
                  <BlueBoderButton>아니에요</BlueBoderButton>
                  <BlueButton>맞아요</BlueButton>
                </ButtonWrapper>
                <ResultSubTitleText onClick={onAnalysisTabOpen}>
                  📊 AI 분석결과 확인하기
                </ResultSubTitleText>
              </ResultWrapper>
            ) : (
              <ResultWrapper>
                <ResultTitleText>분석 결과</ResultTitleText>
                <ResultSubTitleText>내가 업로드한 사진</ResultSubTitleText>
                <UploadImage
                  src={`${process.env.REACT_APP_BACK_SERVER_URL}/${fileName}`}
                />
                <ResultSubTitleText>AI가 분석한 유사 차량</ResultSubTitleText>
                <Chart result={chartData} />

                <ResultWrapper>
                  {chartData.map(v => (
                    <ResultText2 key={v.value}>
                      <span>{v.label}</span>
                      <span>{v.value.toFixed(2)}%</span>
                    </ResultText2>
                  ))}
                </ResultWrapper>

                <ResultSubTitleText onClick={onAnalysisTabOpen}>
                  결과 재확인
                </ResultSubTitleText>
              </ResultWrapper>
            )}
          </PopUp>
        </PopUpWrapper>
      }
    </>
  );
};

const ResultImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  padding: 20px;
`;
const UploadImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  padding: 20px;
`;

const PopUpWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0px;
  left: 0px;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoadingImageWrapper = styled.div`
  // display: flex;
  // width: auto;
  // align-items: end;
`;
const LoadingImage = styled.img`
  width: 150px;
  height: auto;
`;
const LoadingGif = styled.img`
  width: 70px;
  height: auto;
`;
const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 50px;
  color: #898989;
`;

const PopUp = styled.div`
  overflow: scroll;
  scrollbar-width: none;
  width: 600px;
  height: 750px;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  position: fixed;
  background-color: white;
  top: 50%;
  left: 50%;

  padding: 50px;
  box-sizing: border-box;
`;

const ResultWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const ResultTitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  margin: 20px;
`;
const ResultSubTitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin: 30px;
  color: #0a84ff;
`;

const ResultText = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 300px;
  font-size: 18px;
  font-weight: 400;
  margin: 5px;
  span {
    padding-right: 5px;
  }
  span:first-child {
    font-weight: 600;
  }
`;
const ResultText2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  font-size: 18px;
  font-weight: 400;
  margin: 5px;
  span {
    padding-right: 5px;
  }
  span:first-child {
    font-weight: 600;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 300px;
  font-size: 16px;
  font-weight: 400;
  margin: 30px 0;
`;

const BlueButton = styled.button`
  width: 47%;
  height: 45px;
  background: #0a84ff;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

const BlueBoderButton = styled.button`
  width: 47%;
  height: 45px;
  background: #ffffff;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #0a84ff;
  box-sizing: border-box;
  border: 2px solid #0a84ff;
`;
export default CarConfirmPopup;
