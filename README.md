# CoffeeServer

apis works on port & router
~:80/api
---
##/auth

(post) **/login** 

    kakao access_token을 body로 받아 인증 후 login_token 반환

(get) **/logout**

    login_token 삭제

(get) **/info**

    user Profile을 body로 반환
---
##/board

(post) **/addOrder**

    board에 새로운 주문 등록

(get) **/list**

    board 전체 목록 조회

(get) **/orders?boardId={board._id}&groupBy={ user | menu }**

    board에 등록된 주문 목록 조회. groupBy에 따라 묶어서 조회한 값 반환

(post) **/create**

    새로운 board 등록

(get) **/state?boardId={board._id}**

    해당 board의 현재 정보 조회
---
##/shop

(post) **/create**

    새로운 shop 생성

(get) **/list**

    전체 shop 목록 조회

(post) **/addMenu**

    지정된 shop에 새로운 메뉴 등록

(get) **/menu?shopId={shop._id}**

    해당 shop의 전체 메뉴 목록 & 메뉴별 옵션 조회