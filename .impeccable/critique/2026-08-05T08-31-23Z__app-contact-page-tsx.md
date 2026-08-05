---
target: 문의하기 페이지 (/contact)
total_score: 19
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 2
timestamp: 2026-08-05T08-31-23Z
slug: app-contact-page-tsx
---
# Critique — /contact (문의하기), 훈아티스

Method: dual-agent (A: design review · B: detector/browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | 지도 iframe 로드 전 수 초간 회색 공백(스켈레톤 없음), 히어로 이미지 늦게 등장, 현재 페이지 표시 없음(문의하기 필은 CTA 스타일) |
| 2 | Match System / Real World | 3 | 한국어 라벨 자연스러움. 단 tmap:// 딥링크·앱 칩은 모바일 관용구를 데스크톱에 노출 |
| 3 | User Control and Freedom | 2 | 문의 수단이 mailto 단일 경로 — 메일 클라이언트 없는 데스크톱에서 조용히 막힘. 지도 iframe 휠 스크롤 탈취 |
| 4 | Consistency and Standards | 2 | 밝은 brand 버튼 vs 갈색 brand-strong 아이콘 두 오렌지 병존, 내부용 /customize 아이콘이 공개 내비에 노출, 한국어 제목 위 영문 아이브로우 |
| 5 | Error Prevention | 2 | tmap://이 데스크톱에서 무반응, 주소 문자열 검색(좌표 없음)이라 모호한 결과 위험, 네이버 /v5/ 레거시 경로 |
| 6 | Recognition Rather Than Recall | 3 | 모든 항목 아이콘+라벨로 노출. 양호 |
| 7 | Flexibility and Efficiency | 2 | 카드의 전화/이메일이 tel:/mailto: 링크 아닌 일반 텍스트, 복사 어포던스 없음, 딥링크에 좌표 없음 |
| 8 | Aesthetic and Minimalist Design | 2 | 연락 정보 중복 노출, 팩스가 이메일과 동급 배치, 어두운 히어로, 기본 구글맵 — 미니멀하나 조형되지 않음 |
| 9 | Error Recovery | n/a | 폼/에러 상태가 없는 정적 페이지 |
| 10 | Help and Documentation | 1 | 운영 정보 전무: 영업시간·회신 기대치·대중교통/주차·605호 진입 안내 없음 |
| **Total** | | **19/36** | **Acceptable (53%)** |

## Design Specificity Verdict

절반만 이 스튜디오의 것. 재료(밤단풍정원 UE5 렌더+마스코트, 티맵/네이버/카카오 트리오, 브랜드 토큰)는 진짜지만, 구조는 참고사이트에서 이식한 템플릿이고 페이지의 시각적 중심이 구글 기본 지도 — 실사급 디지털트윈을 파는 스튜디오의 가장 비-저작 픽셀. 로고와 히어로만 바꾸면 85%는 아무 지역 에이전시 페이지여도 무방. 홈페이지와 팔레트는 일치하나 에너지(시네마틱 풀블리드)는 불일치.

**Deterministic scan**: CLI 스캔(app/contact, header, footer) 0건 클린. 인페이지 검출기 11건 중 9건은 검출기가 Tailwind v4 lab()/oklab() 색상을 파싱 못해 배경을 #fff로 오인한 오탐(실측 6.25:1~19.43:1 전부 AA 통과). 실제 이슈 2건: 헤더 "Immersive AI Labs" 9px 텍스트(11px 하한 미달), 히어로 아이브로우 칩 패턴. 추가 실측: 길찾기 필 높이 37px(44px 관례 미달), 카드 라벨 neutral-500/neutral-50 4.54:1(여유 0.04로 아슬), 히어로 이미지 dpr1.5에서 필요 해상도의 ~74%.

## 왜 어색한가 (핵심 진단)

1. **P0 — 페이지 정체성 불일치**: h1은 문의하기, 내용은 90% 오시는 길. 실제 문의 수단은 사이드바 mailto 버튼 하나. 방문자의 멘탈 모델과 콘텐츠 모델이 어긋남 — 시각 요소 이전에 이 불일치가 "어색함"으로 감지됨. Fix: 문의 섹션(이메일+전화 tel: 링크+회신 기대치 한 줄)을 먼저, 오시는 길을 두 번째 섹션으로. → /impeccable shape
2. **P1 — 히어로가 사고처럼 읽힘**: 마스코트가 상·하·우 3면 크롭(머리 잘림), 스크림이 렌더를 거의 검정으로 뭉갬, 밴드가 16:9 장면의 5:1 슬리버. 페이지 최고 자산이 실수처럼 보임. Fix: object-position 조정으로 캐릭터 온전히 프레임 안에(의도적 크롭은 한 면만), 상단 그라데이션 완화(from-hero/60 via-hero/30), h1 아래 서브카피 한 줄, 높이 60–80px 추가. → /impeccable layout
3. **P1 — 연락 정보 3중 중복**: 한 화면에 주소 ×3(지도 캡션+카드+푸터), 전화·이메일 ×2. 팩스가 이메일과 동급. Fix: 카드를 유일한 정보원으로 — 지도 캡션 주소 제거, 팩스 강등, 페이지가 길어지면 푸터 인접 문제도 해소. → /impeccable distill
4. **P2 — 길찾기 버튼이 데스크톱에서 죽음**: tmap:// 무반응, 좌표 없는 주소 검색, 네이버 레거시 경로. "전주역 도보 X분·주차" 한 줄 부재. Fix: 좌표 기반 링크, 데스크톱에선 티맵 숨김/QR, 도보·주차 한 줄 추가. → /impeccable harden
5. **P2 — 지도가 브랜드 세계를 깸**: 기본 구글 임베드 + 로드 전 회색 공백. Fix: 스켈레톤 배경, 그레이스케일 필터 래퍼 또는 브랜드 핀 정적 지도. 야심 버전: 자기 동네 UE5 항공 렌더. → /impeccable polish

## What's Working

1. 스톡 오피스 사진 대신 자사 UE5 렌더+마스코트 사용 — 자산은 강함, 처리만 실패
2. 티맵/네이버/카카오 트리오 — 한국 기업 사이트 대부분이 놓치는 로컬 감각
3. 토큰 규율: brand-strong의 대비 설계, keep-all, :focus-visible, 시맨틱 dl, iframe title

## Persona Red Flags

**Jordan(첫 방문 잠재 클라이언트, 데스크톱)**: 문의하기 눌렀는데 지도 페이지 도착 → 유일 CTA가 OS 메일 핸들러 → 메일 클라이언트 없으면 무반응 데드엔드 → 팩스가 이메일 위에 있는 걸 보고 조용히 신뢰 하향 → 회신 여부/시점 모른 채 이탈.

**Casey(이동 중 모바일)**: 앱 칩은 좋은데 전화번호 탭 불가(일반 텍스트), 420px iframe이 엄지 스크롤 탈취, 도보/주차 정보 없어 결국 주소를 지도앱에 재입력.

**Sam(스크린리더/저시력)**: 아이브로우가 가변 이미지 위 소형 자간 텍스트, 지도의 텍스트 대안 없음(주소뿐), target=_blank 새창 경고 없음. 양호: iframe title, dl, focus-visible, 헤딩 순서.

## Minor Observations

- 헤더 로고 스왑(24px 임계) 전환 중간 상태 확인 필요
- CONTACT.mobile(+82-10) 미사용 — 의도인지 확인
- 영문 아이브로우 "Let's Build Together"가 전한국어 운영 페이지에서 장식적 톤 이탈
- 페이지 총 높이 1.3뷰포트 — 짧음 자체가 "조각" 느낌에 기여
- 헤더 9px "Immersive AI Labs" 텍스트 (검출기 실검출)

## Questions to Consider

1. 마스코트가 스튜디오의 얼굴인데, 방문자가 대화를 결정하는 페이지에서 왜 잘리고 어둡고 침묵하는가? 그녀가 CTA를 가리키는 안내자라면?
2. 실사급 디지털트윈을 파는 회사의 위치 안내가 구글 기본 지도 — 훈아티스다운 "여기 있어요"는 무엇인가?
3. 문의하기는 한 페이지인가, 참고사이트가 우연히 붙여놓은 두 페이지(문의/오시는 길)인가? 팩스 행이 "영업일 2일 내 회신" 한 문장보다 나은 점이 있나?
