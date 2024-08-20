const fn = require("./fn");

test("이름과 나이를 전달받아 객체를 반환해줍니다.toBe", () => {
  expect(fn.makeUser("Mike", 30)).toBe({
    name: "Mike",
    age: 30,
  });
});

test("이름과 나이를 전달받아 객체를 반환해줍니다.toEqual", () => {
  expect(fn.makeUser("Mike", 30)).toEqual({
    name: "Mike",
    age: 30,
  });
});

test("이름과 나이를 전달받아 객체를 반환해줍니다.toStrictEqual", () => {
  expect(fn.makeUser("Mike", 30)).toStrictEqual({
    name: "Mike",
    age: 30,
  });
});

// 코드 커버리지(code coverage) : 문장, 분기, 함수(function), 줄(line) 커버리지

// 코드 커버리지의 중요성: 소프트웨어 품질 향상, 결함 감소, 테스트 효율성 증대

/*
1. 줄 커버리지: 각 코드 줄이 최소 한 번 이상 실행되었는지 측정 //문장보다 세밀한 단위
2. 문장 커버리지: 각 문장이 최소 한 번 이상 실행되었는지 측정 //줄 커버리지와 유사
3. 분기 커버리지: 조건문의 분기가 최소 한 번 이상 실행되었는지 측정
                - true 또는 false 값을 모두 확인
4. 함수 커버리지: 모든 함수가 최소 한 번 이상 호출되었는지 측정
*/
