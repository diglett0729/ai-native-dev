# Superpowers Workflow Guide · 최소 템플릿

실제 설명 내용이 아닌 화면 구성 확인용 샘플입니다. 외부 라이브러리나 빌드 과정 없이 동작합니다.

## 로컬 미리보기

압축을 풀고 이 README가 있는 폴더에서 터미널을 엽니다.

```bash
python -m http.server 8000
```

Windows에서 python 명령이 없으면 `py -m http.server 8000`을 사용하세요. Python 설치가 필요합니다.
브라우저에서 http://localhost:8000 을 엽니다. 종료는 Ctrl+C.
HTML 파일을 더블클릭하면 JSON/MD fetch가 차단될 수 있으므로 로컬 서버를 사용하세요.

## 수정할 파일

- content/slides.json: 5개 장의 제목, 설명, 목록, 문서 요약, 이미지 경로, 주석
- content/docs/*.md: 문서 전문 (UTF-8)
- assets/images/: 실제 캡처를 여기에 넣고 slides.json의 images.path를 수정
- assets/css/layout.css: 상단 변수로 전체 너비, 간격, 글자 크기, 패널 너비 변경
- assets/css/themes.css: Paper / Slate / Warm 색상 프리셋
- assets/js/app.js: 장 이동, 문서 패널, 이미지 확대, 간단한 Markdown 렌더러
- index.html: 공통 화면 틀
- CLAUDE.md: Claude Code 수정 지침

## GitHub Pages

이 폴더의 **내용물**을 저장소 루트에 올립니다. index.html이 저장소 루트에 있어야 합니다.
저장소 Settings → Pages → Deploy from a branch → main / (root) → Save.
배포 완료 후 표시되는 주소로 접속합니다. 문서/캡처에는 공개 가능한 자료만 넣으세요.

## 포함 기능과 한계

- 5장 목차와 이전/다음 이동, #plan 등 장별 직접 링크
- MD 전문 dialog, Esc/닫기, 닫은 뒤 버튼 포커스 복원
- 캡처 클릭 확대, 접이식 팁, 모바일 세로 배치
- 3개 테마와 선택 기억, 코드 가로 스크롤
- MD는 제목/문단/하이픈 목록/코드 블록만 지원합니다. 표, 링크, 인라인 강조, Obsidian 문법은 미지원입니다.
- 이미지 파일 선택/업로드 편집기, 문서별 직접 링크, 자동 AI 요약은 포함하지 않았습니다.
- 다이어그램은 단순 HTML/CSS로 작성해 별도 라이브러리가 필요 없습니다.
