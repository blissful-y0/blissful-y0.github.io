---
layout: post
title: [TIL] 자바스크립트의 Optional Chaining
date: 2022-03-01 23:40
summary: Optional Chaning이란 무엇인가?
categories: javascript TIL
---

### optional-chaning

지난 주, useQuery API를 사용해 DB로부터 받아온 데이터를 렌더링할 때, 조건부 렌더링을 사용해 'undefined' 에러를 해결했었다. React의 state가 컴포넌트 변수인 점을 활용한 건데, event로부터 받아온 값이 컴포넌트 변수인 setData에 할당되어, 해당 변수가 호출이 되면 rerendering하는 React의 개념을 활용했다.

```javascript
const [data, setData] = useState({
  writer: "",
  password: "",
  title: "",
  contents: "",
}); // data의 디폴트 값은 "", 그러나...

const onChangeInput = (event) => {
  const userData = { ...data, [event.target.name]: event.target.value };
  setData(userData);
}; // 여기서 이벤트로 받아온 값들을 setData에 할당

data && data.fetchProfile;
// && 연산자의 성질을 활용, data.fetchProfile이 false일 때 data를 반환,
// data.fetchProfile이 true일 때는 data.fetchProfile을 반환
```

그러나 이 방법에는 문제가 있다. 현재 코드는 단 한 가지의 상황만 존재해 && 연산자를 사용해도 전혀 문제가 없었다, 하지만... 만약 내가 원하는 코드가 fetchProfile에서 더 타고 들어가야 한다면? 예를 들어......

```javascript
data.fetchProfile.name.firstname.surname
data && data.fetchProfile && data.fetchProfile.name && data.fetchProfile.name.firstname && data.fet.... 어쩌구!
// name이 없는 경우가 있다면? firstname이 없다면?
```

경우의 수만 봐도 벌써 머리가 아프다. 이런 고민을 한 번에 날릴 수 있는 방법이 있으니 그게 바로 `optional-chaning`이다.

> optional chaining 연산자는 참조나 기능이 undefined 또는 null일 수 있을 때 연결된 객체의 값에 접근하는 단순화할 수 있는 방법을 제공한다.

```javascript
let nestedProp = obj.first && obj.first.second;
let nestedProp = obj.first?.second;
let nestedProp =
  obj.first === null || obj.first === undefined ? undefined : obj.first.second;
```

[MDN: Optional chaning](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

optional chaning을 사용하면, 위의 data 케이스를 간단하게 정리할 수 있다.

```javascript
data?.fetchBoard?.name?.firstname?.surname;
```
