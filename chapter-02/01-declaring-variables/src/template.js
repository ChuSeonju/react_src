// 템플릿 문자열 : 연결 연산자(+) 대신 사용

// const lastName = '강';
// const middleName = '감찬';
// const firstName = '킹';

// console.log(lastName + ", " + firstName + " " + middleName);
// // 템플릿 문자열: 백팃 사용 `
// console.log(`${lastName}, ${firstName} ${middleName}`);

let lastname = 'Ferrell';
let middlename = 'William';
let firstname = 'John';

let ticketAgent = "The i0 Thrater";
let event = 'TJ & Dave';
let qty = 2;
let price = 10;

// es6 템플릿 문자열은 공백, 개행 무시하지 않음
console.log(`

  Hello ${firstname},

  Thanks for ordering ${qty} tickets to ${event}.

  Order Details
    ${firstname} ${middlename} ${lastname}
    ${qty} x $${price} = $${qty*price} to ${event}
            
  You can pick your tickets up at will call 30 minutes before 
  the show.

  Thanks,

  ${ticketAgent}
  
`)

