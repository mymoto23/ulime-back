# ulime-back
유튜브 해외 컨텐츠 추천 플랫폼인 ULIME 에 사용되는 Back-end 프로젝트입니다.

<b>Design Pattern</b>
<br />
기본적으로 MVC Pattern 을 사용해 프로젝트를 최대한 모듈화 했습니다.
<br />
디버깅과 수정을 원활하게 하기 위해서 Express 에서 제공하는 router 객체를 미들웨어로 사용했습니다.
<br />


<b>인증 시스템</b><br />
jsonwebtoken을 기반으로 한 인증 시스템을 구현했습니다. <br />
SHA1 해싱 알고리즘을 사용해 비밀번호 등 민감한 정보를 보호했으며 이러한 정보를 decrypt 하고 인증 성공시 토큰을 발급하는 로직을 구현해 보았습니다.
<br />

<b>DB</b>
<br />
DB 는 MongoDB 를 활용했으며 mongoose 를 통해 DB Instance 에 연결 및 Object Mapping 을 진행했습니다.
MongoDB Instance 같은 경우는 MongoDB Atlas 를 사용하여 Database Collection 이나 버전 관리 등의 용이성을 챙겼습니다.
<br />

<b>Youtube Data API</b> <br />
ULIME 서비스 같은 경우는 Youtube 에서 제공하는 컨텐츠를 기반으로 하기 때문에 이를 가져오기 위해서 Youtube Data API 를 활용했습니다. <br />
Data API 를 통해 데이터를 요청한 후 이를 그대로 본 서버의 데이터베이스에 populate 하는 형식으로 로직을 구현했습니다.
<br />

<b>Cron Task</b>
<br />
자체적으로 생성하는 데이터도 있지만 기본적으로 Youtube Data API 를 통해 정보를 가져오므로 주기적인 자동 업데이트가 필요하다고 판단했습니다.
<br />
이 문제 같은 경우 node-cron 라이브러리를 사용해 특정 시간 (해당 서버는 12시간으로 설정) 이 지나면 자동으로 Youtube Data 서버로 요청을 날려 정보를 업데이트 하도록 로직을 구현했습니다.
<br />
<b>Compiler</b>
<br />
보다 세련되고 깔끔한 코드 작성을 위하여 babel compiler 를 사용했습니다. 이로써 ES6 문법을 사용할 수 있었습니다.
