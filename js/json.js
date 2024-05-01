
var example = {
    "info": {
        "title": "PlanetKey",
        "subTitle": "플래닛키 - 캐비닛키의 생산성 포크",
        "summary": "",
        "description": "마크다운과 개행을 지원하는 긴 소개글",
        "mainHashtag": "PlanetKey",
        "category": ["건강", "개발", "창작"]
    },
    "projects": [
        {
            "avatar": "https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg",
            "title": "건강 되찾기",
            "category": 0,
            "startYear": "2024.5",
            "goalYear":"2030.1",
            "goal": [{
                "title": "식이",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }, {
                "title": "운동",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }],
            "eventChronology": {
                "0.0": ""
            },
            "summary": "괻됙",
            "description": "마크다운과 개행을 지원하는 긴 소개글"
        }, {
            "avatar": "https://peachtart2.s3.ap-northeast-1.amazonaws.com/tart/4bd30f36-767c-429f-ad64-932157928e74.webp",
            "title": "캐비닛키",
            "category": 1,
            "startYear": "2024.4",
            "goalYear":"2030.1",
            "goal": [{
                "title": "배포",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }, {
                "title": "개발",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }],
            "eventChronology": {
                "0.0": "",
                "0.0": "",
                "0.0": ""
            },
            "summary": "자캐 및 세계관 관리도구",
            "description": "마크다운과 개행을 지원하는 긴 소개글"
        }, {
            "avatar": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
            "title": "인공지능 관련 대학원 준비",
            "category": 1,
            "startYear": "2024.4",
            "goalYear":"2024.8",
            "goal": [{
                "title": "딥러닝 스터디",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }, {
                "title": "포트폴리오 제작",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }],
            "eventChronology": {
                "0.0": ""
            },
            "summary": "2024년 후기재입학 목표",
            "description": "마크다운과 개행을 지원하는 긴 소개글"
        }, {
            "avatar": "https://s3.lapy.link/klapy/75a1ed8c-d0b1-45ae-b07e-54dc73e85941.webp",
            "title": "담청지영",
            "category": 2,
            "startYear": "2024.4",
            "goalYear":"2025.12",
            "goal": [{
                "title": "자료 수집",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }, {
                "title": "창작",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }],
            "eventChronology": {
                "0.0": ""
            },
            "summary": "조선시대 기술관 일상..",
            "description": "마크다운과 개행을 지원하는 긴 소개글"
        }, {
            "avatar": "https://images.pexels.com/photos/89625/pexels-photo-89625.jpeg",
            "title": "커미션",
            "category": 2,
            "startYear": "2024.4",
            "goalYear":"2024.8",
            "goal": [{
                "title": "3D",
                "summary": "짧은 요약",
                "description": "마크다운과 개행을 지원하는 긴 소개글",
            }],
            "eventChronology": {
                "0.0": ""
            },
            "summary": "대학원 가기전까지의 수입원",
            "description": "마크다운과 개행을 지원하는 긴 소개글"
        }
    ],
    "routine": [
        {
            "title": "한시간 산책하기",
            "day": "12345",
            "goal": ["0,1"],
            "summary": "산책은 아이디어의 보고이다",
            "description": "9sqpd83njz",
            "relatedNotes": ["9sqpd83njz"]
        }, {
            "title": "라틴어 공부하기",
            "day": "0123456",
            "goal": ["3,0"],
            "summary": "듀오링고",
            "description": "9sqpd83njz",
            "relatedNotes": ["9sqpd83njz"]
        }
    ],
    "reminder": [
        { 
            "title": "딥러닝 스터디 2회",
            "due": "2024-5-2",
            "time": "1300",
            "goal": ["2,0"],
            "summary": "MNIST 정리",
            "description": "9sqpd83njz"
        }, {
            "title": "라즈님 커미션",
            "due": "2024-5-25",
            "time": "",
            "goal": ["4,0"],
            "summary": "3D",
            "description": "9sqpd83njz"
        }
    ],
    "today": {
        "priority": [0, 1, 1, 1, 0],
        "routine": {
            "1400": {
                "index": 0,
                "done": false
            }, 
            "0700": {
                "index": 1,
                "done": false
            }
        },
        "reminder": [
            { // 당일의 리마인더라면 todo에 편입되고, done에 체크 가능
                "index": 0,
                "done": false
            },{
                "index": 1,
                "done": false
            }
        ],
        "todo": [
            {
                "title": "난카 이로이로 오류 수정",
                "time": "",
                "goal": ["1,1", "3,1"], // 두 자리일 경우 project-goal로 편입. 두 개 이상의 목표 프로젝트를 설정할 수 있음
                "summary": "수정내역은 상세 부분 참조",
                "description": "9sqpd83njz",
                "done": false
            },{
                "title": "2회차 스터디 준비",
                "time": "1700",
                "goal": 0, // 한 자리일 경우 reminder로 편입. reminder에서 project-goal을 불러올 수 있음...
                "summary": "MNIST 관련 구현",
                "description": "9sqpd83njz",
                "done": false
            },{
                "title": "픽크루 만들기",
                "time": "",
                "goal": ["3,1"], // 한 자리일 경우 reminder로 편입. reminder에서 project-goal을 불러올 수 있음...
                "summary": "먕",
                "description": "9sqpd83njz",
                "done": false
            }
        ]
    }
}
