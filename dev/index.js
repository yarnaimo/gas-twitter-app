const BASE_URL = 'https://api.twitter.com'

global.create = (label, consumer_key, consumer_secret) => {
    return new Twitter({
        key: consumer_key || UserProperties.getProperty('TWITTER_CONSUMER_KEY'),
        secret: consumer_secret || UserProperties.getProperty('TWITTER_CONSUMER_SECRET'),
        label: label || 'Twitter',
    })
}

class Twitter {
    constructor(props) {
        this.service = OAuth1.createService(props.label)
            .setAccessTokenUrl(`${BASE_URL}/oauth/access_token`)
            .setRequestTokenUrl(`${BASE_URL}/oauth/request_token`)
            .setAuthorizationUrl(`${BASE_URL}/oauth/authorize`)
            .setConsumerKey(props.key)
            .setConsumerSecret(props.secret)
            .setCallbackFunction('authCallback')
            .setPropertyStore(PropertiesService.getUserProperties())
    }

    authorize() {
        if (this.service.hasAccess()) {
            Logger.log('Already authorized')
        } else {
            Logger.log(`Authorization URL: ${this.service.authorize()}`)
        }
    }

    reset() {
        this.service.reset()
    }

    authCallback(request) {
        const isAuthorized = this.service.handleCallback(request)
        const mimeType = ContentService.MimeType.TEXT
        return ContentService.createTextOutput(isAuthorized ? 'Success' : 'Denied').setMimeType(mimeType)
    }

    get(path, params = {}) {
        params.tweet_mode = 'extended'
        const q = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&')

        const response = this.service.fetch(`${BASE_URL}/1.1/${path}.json?${q}`)
        return JSON.parse(response)
    }

    post(path, data) {
        data.tweet_mode = 'extended'
        const response = this.service.fetch(`${BASE_URL}/1.1/${path}.json`, {
            method: 'post',
            payload: data,
        })
        return JSON.parse(response)
    }

    getCredentials() {
        Logger.log(this.get('account/verify_credentials'))
    }

    testTweet() {
        Logger.log(this.post('statuses/update', { status: 'Test tweet from Google Apps Script' }))
    }
}