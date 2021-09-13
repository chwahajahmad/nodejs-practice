
# Slack Prayer Reminder
Prayer Reminder built using typescript, nodejs, postgresql and Slack Dev API.

### Features
- User can Subscribe/Unsubscribe to Prayer Reminder bot by sending it a message.

- User can Update his city/fiqah by sending it a message.

- Subscribed user will get alerts at each prayer time according on his city and fiqah.

### Getting Started
**1. Clone the Repo**
```
$ https://github.com/chwahajahmad/slack-PrayerBot
$ cd slack-PrayerBot
```
**2. Setup the InstaClone app (development)**

 1. Connect with postgresql db 
	  1. Setup your postgresql db.

		2. Go to  ``
src -> config -> config.json
 ``
	 3.  Copy your db credentials to ***development*** key you find in the           ***config.json*** file.
 
2. Integrate with slack bot
	1. Go to Slack's development website. Create new app and install it into the required workspace.

	2. Copy **oAuth** token. 

	3. Create **.env** file. Add variable of name **SLACKBOT_OAUTH_TOKEN** and set it to your copied **oAuth** token.

**3. Start App**

3. Build App to convert **.ts** files to **.js**: 
```
npm run build
```

4. After completing all the steps given above, run the following command:
 ```
 npm run start
 ```

## Liscense

```

Copyright (c) 2021 Ahmad Wahaj

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

```

# Show some ❤️ and star the repo to support the project.
