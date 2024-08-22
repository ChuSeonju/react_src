import { Link, Route } from "react-router-dom";
import { MainMenu, AboutMenu } from "./menus";
import "./stylesheets/pages.scss";

// 홈 화면 링크 정보
export const Home = () => (
  <div className="home">
    <h1>[회사 웹사이트]</h1>
    <nav>
      <Link to="about">[회사 소개]</Link>
      <Link to="events">[이벤트]</Link>
      <Link to="products">[제품 소개]</Link>
      <Link to="contact">[고객 지원]</Link>
    </nav>
  </div>
);

// 없는 경로 화면 컴포넌트
export const Whoops404 = (
  { location } // location 받아서 쓰니까 prop추가
) => (
  <div className="whoops-404">
    <h1>Resource not found at '{location.pathname}'</h1>
  </div>
);

// 페이지 템플릿
const PageTemplate = ({ children }) => (
  <div className="page">
    <MainMenu />
    {children}
  </div>
);

// 이벤트 달력 화면
export const Events = () => (
  <PageTemplate>
    <section className="events">
      <h1>TODO: [Event Calendar]</h1>
    </section>
  </PageTemplate>
);

// 제품 소개 화면
export const Products = () => (
  <PageTemplate>
    <section className="products">
      <h1>TODO: [Product Catalog]</h1>
    </section>
  </PageTemplate>
);

// 고객 지원 화면
export const Contact = () => (
  <PageTemplate>
    <section className="contact">
      <h1>TODO: [Contact Us]</h1>
    </section>
  </PageTemplate>
);

// 회사 페이지 화면
export const About = ({ match }) => (
  <PageTemplate>
    <section className="about">
      <Route component={AboutMenu}></Route>
      <Route exact path="/about" component={Company}></Route>
      <Route path="/about/history" component={History}></Route>
      <Route path="/about/services" component={Services}></Route>
      <Route path="/about/location" component={Location}></Route>
    </section>
  </PageTemplate>
);

// 회사 페이지 내용 컴포넌트
export const Company = () => (
  <section className="company">
    <h2>한국소프트웨어 인재개발원</h2>
    <p>
      한국소프트웨어인재개발원은 무엇보다 현장에서 꼭 필요한 전문 인재를
      길러내는 교육기관으로 명성을 날리고 있다. 2009년 8월에 설립해 2015년 9월
      과기정통부(옛 미래창조과학부)로부터 SW전문인력양성기관으로 지정 받았다.
      2018년 10월에는 고용노동부로부터 우수훈련기관 인증을 받은 SW전문
      우수교육기관이다. 한국소프트웨어인재개발원 효율성은 SW개발인력을 연간
      350명을 양성하며 ‘모집률 100%, 수료율 93%, 취업률 89.8% (노동부 HRD넷,
      2019년 기준)’을 달성하는 성과로 나타났다.
    </p>
    <p>
      ■ 한국소프트웨어인재개발원에 있는 4가지는? 1. ‘취업 깡패’ 입소문 G밸리에는
      1만 2천개 기업이 상주해 있고, 그중 7천 개 정도가 IT업체다. 고용노동부와
      ‘G밸리 청년 IT매칭 데이’를 개최하며 수백 개의 IT기업 DB를 확보해 1 :1 취업
      매칭을 진행하고 있다. 수료 후 2주일이 지나면 70~80%의 채용이 확정된다.
      ‘입품(강사 열정)+손품(매니저 관리)+발품(취업 담당자 노력)’ 등 3품이
      어우러진 결과다.
    </p>
    <p>
      2. 최신 기술 트렌드 기초 분야는 물론이고 최신 기술을 교과목에 반영시켜서
      교육생을 지도한다. 기업 전문가로 구성된 운영의원회를 통해 8대 성장 분야 중
      빅데이터, AI, 로봇 프로세스 자동화(RPA) 같은 최신 기술을 교육 교재와
      커리큘럼에 반영 중이다. 특히 글로벌 RPA 기업인 유아이패스와 협업을 통해
      4월부터 관련 인력 양성에 나설 계획이다.
    </p>
    <p>
      3. 현장에 강한 강사진과 자율학습 강의 뿐만 아니라 실무 경험이 풍부한
      강사진이 포진해 강의 퀄리티를 높이고 있다. 우수 강사들이 선호하는
      교육기관으로도 유명하다. 맞춤 교육으로 취업까지 연계해 구직자들의 호평을
      받고 있다. 수업 이후 저녁 및 주말에도 강의실을 개방해 자율학습을 지원하고
      있다. 평일엔 저녁 11시까지 개방하며 주말에도 강의실을 열어 훈련생의 호평을
      받고 있다. 특히 출석률이 높은 학생을 선정해 수료식 때 ‘출근 가방’을
      지급하는 등 훈훈한 분위기로 만족도가 높다.
    </p>
    <p>
      4. 깐깐한 관리 매월 반담당 매니저와 직업상담사, 평생교육사를 통해 훈련생에
      대한 고충 상담을 실시할 만큼 깐깐한 관리체계가 강점이다. 특히
      한국소프트웨어인재개발원은 지난 해 관악고용지원센터 추천으로 취업률
      우수훈련기관에 선정되어 사례 발표를 통해 IT우수 취업시스템을 전파하고
      있다. 100여개 산업체 컨소시엄을 통해 기업과 교육센터간 상호협력체계가
      긴밀하게 구축되어 있다. 따라서 실제 기업에서 적용하는 SW기술을 경험할 수
      있는 것은 기본. 이는 교육생들에게 확실한 경쟁력이다. 일례로 2019년 7월
      투비소프트는 소프트웨어인재개발원에 1억5천만 원 상당의 '넥사크로 플랫폼'을
      교육용SW로 기증해 힘을 실었다.
    </p>
  </section>
);

// 연혁 화면
export const History = () => (
  <section className="history">
    <h2>한국소프트웨어인재개발원 주요연혁</h2>
    <p>2021년 고용노동부 우수 훈련기관 지정 K-디지털 트레이닝 사업 선정</p>
    <p>
      2020년 하이서울 브랜드기업 선정 4차산업혁명 선도인력 훈련기관 선정(RPA)
    </p>
    <p>
      2019년 SW산업인의 날 대통령 표창 수상 한국소프트웨어인재개발원 시설
      확장(12개 강의실) 및 별관 확장(IT캐슬) (주)투비소프트와 과정개발 및
      인재양성 협약체결(넥사크로 SW 기증) 과학기술정보통신부 SW전문 인력양성
      IITP SWETI사업 평가 결과 "우수" 판정 KOSMO기술연구소 설립 병역특례기업
      선정
    </p>
    <p>
      2018년 고용노동부 우수훈련기관 지정 (3년 인증) 일학습병행제 선정기업
      협약체결 (산업인력공단) KOSMO 평생교육원 별도 설립 훈련 이수자평가 A등급
    </p>
    <p>
      2016년 국가 인적자원개발 컨소시엄사업 파트너 훈련기관 선정 (KOSA)
      한국산업인력공단 K-move스쿨 운영기관 선정 (해외취업과정){" "}
    </p>
    <p>
      2015년 미래창조과학부 SW전문교육인력양성기관 지정 (3년) 소프트웨어
      융합재직자과정 파트너 기관(KOSA){" "}
    </p>
    <p>2014년 서울디지털산업단지공단 현장맞춤형 주관기관선정</p>
    <p>
      2013년 중소기업진흥공단 인재양성우수중소기업 선정 2012년 한국산업인력공단
      남부지사 MOU협력체결 노동부 직업능력개발훈련시설 지정 (정보통신분야
      프로그래밍) 한국소프트웨어인재개발원 기관명 변경 2011년
      일자리창출우수기업인증(서울시)
    </p>
    <p>
      2009년 디지털원 IT교육센터 기관명 등록 서울특별시 금천구 디지털2로 123,
      월드메르디앙 2차 410호 2007년 기업부설연구소 설립{" "}
    </p>

    <p>2000년 디지털원(주) 11월 3일 법인설립</p>
  </section>
);

export const Services = () => (
  <section className="services">
    <h2>교육과정</h2>
    <p>
      JAVA개발자 양성과정무료 [ELK활용 빅데이터 분석서비스 플랫폼개발자양성] *
      월~금(오전9시30분~오후6시30분) * 100%무료교육 / 자비부담없는과정 *
      매월훈련장려금 : 매월 11만 6천원 / 교재무료 / 사물함제공
    </p>
    <p>
      [AI활용 빅데이터 분석 서비스개발자양성과정] *
      월~금(오전9시30분~오후6시30분) * 100%무료교육 / 자비부담없는과정 *
      매월훈련장려금 : 매월 11만 6천원 / 교재무료 / 사물함제공 * 정원: 각반
      선착순 25명
    </p>
  </section>
);

// 위치 페이지
export const Location = () => (
  <section className="location">
    <h2>오시는길</h2>
    <p>
      지하철 가산디지털단지역 8번출구 나오셔서 좌측횡단보도 건너 좌측으로 10m
      가시면 삼거리가 나옵니다. 삼거리에서 우측 방향으로 직진하셔서 사거리
      대각선방향에 우리은행 건물 413호입니다.
    </p>
    <p>버스 21, 571, 652, 금천 05 [디지털3단지월드벤쳐센터] 정류장에서 하차</p>
    <p>주소 서울시 금천구 가산디지털2로 123 월드메르디앙2차 4층 413호</p>
  </section>
);
