---
id: 3
title: "브라우저에서 let undefined와 let null, 오류가 다른 이유"
date: "2025-05-19"
summary: "let undefined와 let null의 차이를 알아보며 전역 스코프와 예약어의 차이를 알아보겠습니다."
thumbnail: "/images/Frontend/JavaScript/why-let-undefined-and-let-new-is-different/thumbnail-SCR-20250519-lwwq.png"
tags: ["JavaScript"]
---

## 개요

JavaScript 강의를 듣다가, 변수에 대해 알아보던 중에 한가지 의문점이 생겼습니다.

```javascript
let undefined;
let null;
```

둘 다 변수 이름으로 적절하지 않다는 것은 알고 있었지만, console.log 의 오류의 내용은 달랐습니다.

## 어떻게 다를까?

![let null, let new의 오류는 동일했다](/images/Frontend/JavaScript/why-let-undefined-and-let-new-is-different/c71b0161-95e6-48f8-92c9-71a934c6f5dc-SCR-20250519-lwwq.png)

null, new로 변수를 선언했을 때는 _Uncaught SyntaxError: Unexpected token '~~'_ 에러가 노출됩니다. undefined는 어떨까요?

![let undefined의 오류가 다르다!](/images/Frontend/JavaScript/why-let-undefined-and-let-new-is-different/2af5a9b7-72f3-45d9-94ab-6fe2017d8a0d-SCR-20250519-lwyl.png)

undefined는 _Uncaught SyntaxError: Identifier 'undefined' has already been declared_ 라는 에러가 노출됩니다! 무슨 이유 때문에 그런걸까요?

## 예약어 vs 전역 스코프

new 나 null은 예약어 입니다.
new는 객체를 생성할 때 사용하는 키워드 입니다.

```javascript
let today = new Date();
let user = new Object();
```

null은 값이 "없음"을 의미하는 리터럴이자 예약어 입니다.

```javascript
let a = null;
```

:::info
**예약어**란, 자바스크립트 언어 문법에서 미리 정해져 있어서 변수명, 함수명 등으로 사용할 수 없는 단어입니다.
:::

<br />
반면에 undefined는 예약어는 아닙니다.

![window 객체에 정의된 undefined](/images/Frontend/JavaScript/why-let-undefined-and-let-new-is-different/64d3e09a-6a5f-4119-8b92-8260c69920f7-SCR-20250519-lxdd.png)

undefined는 브라우저에서 전역 스코프에 정의되어 있습니다. window 객체가 전역 스코프이고 undefined가 미리 정의되어 있습니다. 그래서 _let undefined;_ 를 선언하려 하면 "이미 정의되어 있다"는 오류가 발생합니다.

![undefined와는 달리 window.null은 존재하지 않는다.](/images/Frontend/JavaScript/why-let-undefined-and-let-new-is-different/de9ef876-901f-4244-90da-d5f1bc4e0a87-image.png)

:::info
**전역 스코프**란, 코드 어디서든 접근 가능한 최상위 범위로써, 프로그램 전체에서 쓸 수 있는 변수나 함수가 저장되는 공간입니다.
:::

<br />
예약어와 전역 스코프는 미리 정의되어 있어서 변수로써 사용을 할 수 없다는 점은 같아 보이지만, 다른 점은 정하는 주체가 다르다는 점입니다.

예약어는 ECMAScript의 명세에서 정해진 다는 반면, 전역 스코프는 런타임 환경에서 결정됩니다.

![undefined는 브라우저 window 객체의 전역 스코프여서 에러가 났던 반면, Node.js 환경에서는 에러로 표시하진 않는다.](/images/Frontend/JavaScript/why-let-undefined-and-let-new-is-different/e8844b45-fa0a-49db-bc69-c33e1f063305-image.png)

## 마무리

:::check
왜 undefined와 null을 변수로 선언했을 때 에러가 다른지 이번 글로 이해가 되셨다면 좋겠습니다. 단순 호기심으로 부터 시작하여, 예약어와 전역 스코프의 차이에 대해 알아 볼 수 있어서 재밌었습니다.
:::

## 참고 자료

- [MDN - 예약어](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar##reserved_keywords)
- [MDN - 전역 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
- [MDN - undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
