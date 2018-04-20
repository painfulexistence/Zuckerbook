Zuckerbook - An open source social network app, written in Ruby on Rails
 

Demo:



Things you should know first:

* The app is built for monitoring users' daily activity.

* The app is well designeded for its admin to quickly ban any users.

* We are collecting data, DO NOT put any important data here.


Dependencies:




一個以RoR寫出的開源社群軟體。為了在Heroku部署，資料庫使用的是PostgreSQL，另外Rails用的是5.1.6版本。
目前擁有的功能是：
1. 使用者帳戶（儲存大頭貼、基本資料）
2. 管理者後台（可以看到每個使用者的活動狀況，包括追蹤、加友和發布貼文的狀況）
2. 社群操作（追蹤、加友、喜歡貼文、評論）
3. 簡單的文章搜索（全文搜索，不包含評論的部份）
4. 簡單的文章權限（只分公開貼文，和限於註冊者的貼文）
5. 多重角色（最高管理者Zucker、管理者Admin、使用者Newbie、未註冊者）
6. 禁言功能（Zucker可隨時停止使用者發文的權限）
7. 註冊與刪除帳戶功能
尚在處理中的功能是：
8. 警告功能（Zucker可發訊息警告使用者）
9. 同意或拒絕交友請求
10. Zucker可觀看每個人的友誼關係圖表
11. 進一步的發文權限區別（例如好友貼文）





