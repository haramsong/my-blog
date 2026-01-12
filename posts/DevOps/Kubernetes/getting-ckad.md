---
id: 7
title: "CKAD 자격증 취득 및 후기"
date: "2026-01-12"
summary: "Kubernetes 경험이 거의 없는 상태에서 Certified Kubernetes Application Developer(CKAD)를 준비하며 실제로 공부한 방법과 시험 난이도를 정리한 합격 후기입니다."
thumbnail: "/images/DevOps/Kubernetes/getting-ckad/thumbnail-ckad.png"
tags: ["Kubernetes", "Certificate"]
---

## CKAD 준비를 하게 된 계기

AWS와 같이 Cloud를 다루다 보니, 자연스럽게 Kubernetes에 관심이 생기게 되었습니다. 하지만 Kubernetes에 대한 개념 및 경험이 없었기 때문에 자연스럽게 익히고 남들에게 증명받고자 CKAD를 취득하기로 결심했습니다.

## 시험 준비

![시험 범위 - https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/](/images/DevOps/Kubernetes/getting-ckad/c249e36f-b330-4afb-aa52-0c04b84baa04-image.png)

CKAD는 Kubernetes를 다루는 개발자가 취득하는 자격증으로써, 리소스를 만들고 Deployment 생성 및 rollout, 기본적인 네트워크 통제에 관해 다룹니다.

![참고 강의](/images/DevOps/Kubernetes/getting-ckad/efd672d1-d5cb-4d76-9363-a43f19d8b763-image.png)

강의는 Udemy의 Mumshad Mannambeth님의 [CKAD 강의](https://www.udemy.com/course/certified-kubernetes-application-developer)를 참고했습니다.

위 강의가 좋았던 게 기본기를 잘 설명해 주면서 Lab이 개념마다 있어서 실습하면서 배우기에 좋았습니다.

![시험을 예약하면 주는 모의시험 세션 killer.sh](/images/DevOps/Kubernetes/getting-ckad/8f384f30-deb0-4488-a520-20e7044d5c15-image.png)

완강을 하고 시험을 예약하면 실제 시험과 비슷한 환경인 모의시험 세션 2개를 얻을 수 있습니다. CKAD는 동일한 문제 2세트로 구성되어 있어서 하나는 완강을 한 뒤에 하고 나머지 하나는 시험 시작 하루 전에 풀었습니다.

![모의시험 2개 얻는 방법](/images/DevOps/Kubernetes/getting-ckad/439f5569-9ecf-4b28-b002-2e5028f645bd-image.png)

killer.sh 모의시험 2개 얻는 방법은 시험을 예약하면서 Preparing for the Exam > Exam Simulator를 통해서 얻을 수 있습니다.

## 시험 가격 및 예약

CKAD는 $445(한화 약 65만원...)으로 정가 주고 사기엔 너무 비싸다고 느꼈습니다. 저는 그래서 Cyber Monday를 기다려서 특가로 60% DC에 Bundle 구성으로 결제했습니다.

대략 공부하는 데 2주는 강의를 들으며 준비했고 1주는 모의 시험 및 복습을 하면서 준비를 하여 총 3주 정도 준비하고 시험을 예약했습니다.

## CKAD 취득!

![CKAD 자격증 취득!](/images/DevOps/Kubernetes/getting-ckad/cf7fd9e3-c7eb-4652-9e80-4223f685afa7-CKAD_자격증.png)

이렇게 해서 78점으로 커트라인 66점을 넘겨 합격을 했습니다! 확실히 난이도는 Udemy 강의에 나온 모의 시험보다는 어렵고, killer.sh 보다는 쉬웠던 것 같습니다.

시험은 대략 15~17문제 였던 것 같고 제 기억으로는 해당 문제들이 나왔었습니다.

- Pod 생성 시 sidecar container
- Canary Development 구성
- PV, PVC를 생성하고 Pod가 PVC 사용하도록 구성
- CronJob 구성
- Service를 Deployment에 expose
- Network Policy 구성
- Helm install, uninstall 등등 Helm 관련 문제
- liveness, readiness probe 구성
- Ingress 구성

위에 내용만 Docs를 보고 풀 수 있을 정도면 충분히 합격하 실 수 있을 것 같습니다!(CKAD는 오픈북이여서 공식 Docs 참고 가능)

## 이런 분들께 추천합니다

- Kubernetes를 처음 제대로 공부해보고 싶은 개발자
- AWS 사용 경험은 있지만 K8s 실습 경험이 없는 분
- 단기간(2~3주) 집중해서 자격증을 취득하고 싶은 분

:::info
Kubestronaut까지 열심히 달려보겠습니다!
:::
