# Zuckerbook -- An Open Source Social Network App

## Demo: https://sheltered-hollows-68357.herokuapp.com/posts

## Prerequisites:
1. Ruby 2.5.1
2. Rails 5.1.6
3. PostgreSQL
4. Elasticsearch Cluster
5. Cloudinary Storage Space

## Installation Tutorial: (unfinished)

## Things you should know first:

* The app is built for monitoring users' daily activity.

* The app is well designeded for its admin to quickly ban any users.

* We are collecting data, DO NOT put any important data here.

## Description
一個以RoR寫出的開源社群軟體。
資料庫使用PostgreSQL，搜尋使用BonsaiElasticsearch,雲端儲存使用Cloudinary。
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
1. 警告功能（Zucker可發訊息警告使用者）
2. 同意或拒絕交友請求
3. Zucker可觀看每個人的友誼關係圖表
4. 進一步的發文權限區別（例如好友貼文）

## Developer Dairy
*201804xx
動工

*20180420
修改搜尋器
完成基本建置，完成第一次Heroku部署

*20180421
新增雲端儲存能力
