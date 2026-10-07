# 작업 지침
- 팀 공유용 5장 탐색형 가이드. 예제 구조를 유지하고 요청한 범위만 수정한다.
- 장별 텍스트/요약/이미지 경로/팁은 content/slides.json, 문서 전문은 content/docs/에서 관리한다.
- 이미지는 assets/images/에 파일로 저장한다. Base64 인라인 삽입 금지.
- 크기/간격은 layout.css 상단 변수, 색상은 themes.css로 관리한다.
- 문서 전문 수정 시 관련 요약도 검토한다. 모델과 effort의 구체적인 권장값은 근거 없이 만들지 않는다.
- 현재 Markdown 렌더러는 최소 기능만 지원한다. 표·링크 등이 필요하면 검증된 렌더러와 HTML sanitization을 도입한다.
- 코드 블록은 줄바꿈하지 않고 가로 스크롤을 유지한다.
- 상대 경로를 사용하여 GitHub Pages의 /repo-name/ 하위에서도 동작하게 한다.
