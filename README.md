TwitterApp for Google Apps Script
====

Google Apps ScriptでTwitter APIを扱うためのライブラリです。


## ライブラリの導入
1. Google Apps Script エディタを開く
1. メニューバーの **リソース** -> **ライブラリ** を選択
1. プロジェクトキー `1973Ox7NzyoDNNGSF2HMjOu441sq9_sJvIlzrka0P_uDnZt7emgIBo04Y` を入力 -> **追加**
1. 最新バージョンを選択 -> **保存**


## Twitter アプリケーションの登録
1. メニューバーの **ファイル** -> **プロジェクトのプロパティ** で`スクリプトID`を確認
1. [Twitter Application Management](https://apps.twitter.com/app/14476240/keys) でアプリを作成 (Callback URLに `https://script.google.com/macros/d/{スクリプトID}/usercallback` を指定する)


## Twitter 認証
1. エディタに戻り **プロジェクトのプロパティ** -> **ユーザー プロパティ** を選択
1. 作成したアプリの `Consumer Key`, `Consumer Secret` をそれぞれ **TWITTER_CONSUMER_KEY**, **TWITTER_CONSUMER_SECRET** の名前で追加して保存

1. 下記のコードをエディタに貼り付ける
    ```js
    var twitter = TwitterApp.create() // インスタンスを生成

    // 引数にラベルを指定すると複数アカウントを使い分けられます (デフォルトのラベルは 'Twitter')
    // var twitterMain = TwitterApp.create('Twitter_Main')
    // var twitterSub = TwitterApp.create('Twitter_Sub')

    // ユーザープロパティに追加した以外の consumer key, consumer secret も利用できます
    // var twitterMain = TwitterApp.create('Twitter_Main', '{consumer_key}', '{consumer_secret}')

    // 認証に利用する関数
    function authorize() { twitter.authorize() }
    function reset() { twitter.reset() }
    function authCallback(request) { return twitter.authCallback(request) }
    ```

1. **関数を選択** -> **authorize** を選択、左の **▶** で実行 (アクセス許可がリクエストされた場合は承認)
1. **表示** -> **ログ** に表示されたURLを開いて認証


----


## APIへのアクセス

```js
twitter.get('statuses/home_timeline', { count: 10 }) // ホームTLから10件取得する

twitter.post('statuses/update', { status: '* message *' }) // 新しいツイートを投稿する
```

* `tweet_mode=extended` がデフォルトで設定されているため、取得したツイートのテキストは `text` ではなく `full_text` に格納されます
* APIの詳細は [Twitter REST APIの使い方 - Syncer](https://syncer.jp/Web/API/Twitter/REST_API/) などを参照してください
