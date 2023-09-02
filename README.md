# OwO-bot User Manual

OwO-bot is a bot used in [Discord](https://discord.com/), which can give appropriate responses based on the commands or conversation content entered by the user.
(Chinese version see [here](/README.zh-TW.md).)

## Install

You can use the following command to get the main framework of OwO bot:
```bash
git clone https://github.com/OwOb/OwO-bot
```

## Dependencies

You need [Node.js](https://nodejs.org/) to run. The version is 10.16.3 or newer. Older versions do not guarantee the correctness. For installation and download, please refer to [here](https://nodejs.org/en/download).

For the required packages, please refer to the following list or [package.json](/package.json):
```json
{
    "compile-run": "^2.3.0",
    "discord.js": "^11.5.1",
    "dotenv": "^8.2.0",
    "fs": "0.0.1-security",
    "html-to-text": "^5.1.1",
    "jquery": "^3.4.1",
    "jsdom": "^15.1.1",
    "mathjs": "^3.18.1",
    "mathjs-simple-integral": "^0.1.1",
    "node-cmd": "^3.0.0",
    "pg": "^7.8.0",
    "pngjs": "^3.3.3",
    "request": "^2.88.0",
    "step": "^1.0.0",
    "sync-request": "^6.0.0",
    "xmlhttprequest": "^1.8.0",
}
```

The [PostgreSQL](https://www.postgresql.org/) database needs to be established in advance. The database must contain the following two tables:

### var_table
|var_name    |value        |
|------------|-------------|
|VARCHAR(128)|VARCHAR(1800)|

### note_table
|userid|note_no|note_title |note_detail  |attachment_url|
|------|-------|-----------|-------------|------------|
|BIGINT|INT    |VARCHAR(64)|VARCHAR(1800)|VARCHAR(1800)|

If you want to use the relevant instructions of the execution program (see [below](#user-content-program-execution-command)), you must first install the relevant environment ([GCC](https://gcc.gnu.org/), [Python](https://www.python.org/ )), and place the compiler or executable file in the path of the environment variable.

## Implement
Before running, you need to prepare Discord Bot and its token. For related setting instructions, please refer to [here](https://discord.com/developers/docs/intro).

And set the following environment variables:
```
BOT_TOKEN=*TOKEN_OF_YOUR_BOT*
DATABASE_URL=*POSTGRESQL_DATABASE_URL*
OwObot_ID=*DISCORD_ID_OF_YOUR_BOT*
OwO_ID=*YOUR_DISCORD_ID*
```
Then run the following command to start the OwO bot:
```bash
cd OwO-bot
node bot.js
```

If you see the following message, it means OwO bot has been successfully launched:
```
Ready
```

## Features

The features provided by OwO bot can be roughly divided into two categories, one is the **commands** triggered by a specific prefix word, and the other is the **responses** triggered by a specific dialogue format, which will be explained *a part of* **commands** and **responses** in detail below.

## Help Command

**Type**: **command**

**Trigger prefix**: `!help` / `!man` / `查詢指令`

**Function**: Get the help message of the command.

**Format**: `!help [command]`

**Example**: `!help note`

**Support command**:
- `help` / `man` / `查詢指令`
- `calculate` / `calc` / `計算機` / `計算` / `運算`
- `code` / `程式`
- `latex` / `tex`
- `note` / `筆記`
- `image` / `圖片`
- `pixiv` / `p`

**Details**:
- Only the commands listed above can be queried (will be continuously updated or revised).
- "Help command" can query "Help command"!! Awesome!! (X

## Calculate command

**Type**: **command**

**Trigger prefix**: `!calculate` / `!calc` / `計算` / `運算`

**Function**: Given a formula and calculate result.

**Format**: `!calc [formula]`

**Example**: `!calc 3*13`

**Support formulas**: (Including but not limited to)
- General formulas
  (`(7-2*2)*(28%15)` → `39`)
- Floating point numbers
  (`0.1+0.2*0.3` → `0.16`)
- Fractions
  (`fraction("1/3") + fraction("2/5")` → `11/15`)
- Complex numbers
  (`e^(pi*i)+1` → `1.2246467991474e-16i` (floating point error))
- Matrices
  (`[[1, 2], [3, 4]] * [[4, 3], [2, 1]]` → `[[8, 5], [20, 13]]`)
- Units
  (`1 km to m` → `1000 m`)
- Physical quantities
  (`1 kg * 1 m/s^2` → `1 N` (F = ma))
- Logarithm
  (`log(e^10)` → `10`)
- Trigonometric functions
  (`sin(pi/2)` → `1`)
- Differential
  (`derivative("sin(2x)", "x")` → `2 * cos(2 * x)`)
- Integral
  (`integral("sin(2x)", "x")` → `cos(2 * x) * -1 / 2`)
- Variables and functions
  (`a=4; b=2; f(x,y)=x^y; f(a+b,a-b)` → `[36]` )
  (Each statement is separated by a semicolon `;` but not at the end)

**Details**：
- If the `[formula]` is correct, the calculated result will be given.
- Judging the correctness of the calculation and the results of `[formula]` are based on [math.js](https://mathjs.org/).
- If the function recurses too deeply or the value given to the function is improper, it may be judged that the format of the `[formula]` is wrong.
- `[formula]` may appear in a strange style due to the marking function of Discord itself, but it will **not** affect the interpretation of the command. Relatively speaking, using `\` to eliminate the marking function will make the interpretation of the command wrong.
- The effective number of floating point numbers is only 14 digits, and the calculation results may also be affected by floating point number errors and have slight errors.
- The supported functions are not limited to those listed above. For complete functions and built-in functions, please refer to the official website of math.js.

## Program execution command

**Type**: **command**

**Trigger prefix**: Varies by the language.

**Function**: Compile and execute the program code in the specified language.

**Format**:
`![language]`
```
[code]
```
```
( [input] )
```

**Example**:
`!py`
```
s = input()
print('Hello,', s)
```
```
OwO
```

**Support languages**：
- `c`
- `c++` / `cpp`
- `javascript` / `js` / `nodejs` / `node`
- `python3` / `py3` / `python` / `py`
- `python2` / `py2`

**Details**：
- Since the package does not support inputting command line parameters, new versions of C and C++ are currently unavailable.
- `[input]` is optional and can be ignored if the program does not require input.
- The spelling method of `[code]` and `[input]` in the example is as follows: ` ```[code]``` ` (line breaks can be included in the middle).
- If the program executes successfully, the output of the program will be given.
- If a compile error or runtime error is encountered, an error message will be given.
- The program running time limit is 3 seconds. If the time limit is exceeded, a time limit exceeded will be given.
- If the output or error message exceeds 1900 characters, only the first 1900 characters will be displayed.
- This command has serious security issues, please do not try it deliberately.
- To avoid the leakage of environment variables, JavaScript cannot use `process.evn` global variables.
  (To be precise, you will get an empty option object, but I believe there must be a way to obtain environment variables. Please do not try it deliberately.)

## Note system

### Add new note

**Type**: **command**

**Trigger prefix**: `!newnote` / `!addnote` / `新增筆記`

**Function**: Create a new note.

**Format**： ``!newnote `(title)` [content]/[attachment-file]``

**Example**： ``!newnote `Miku` Miku is the best!! OwO/``

**Details**：
- `` `(title)` `` must be less than 64 characters.
- `[content]` must be less than 1800 characters.
- `[content]` and `[attachment-file]` can be used alternatively or simultaneously, but at least one of them must be used.
- `[[attachment-file]]` is not limited to the file type, as long as it can be uploaded to Discord, it should be OK... right...?
- One person can hold up to 16 notes at the same time.
- After adding a note, `[id(01~16)]` will be generated for each note.
  (`[id]` will not be repeated for the same person.)
- `` `(title)` `` is optional. If not filled in, the title will be automatically generated.
  (The default title is: `$(nickname)的筆記$(id)`)
- `` `(title)` `` cannot be repeated with other notes.

### My notes

**Type**: **command**

**Trigger prefix**: `!mynote` / `我的筆記`

**Function**: Query the notes you own.

**Example**: `!mynote`

**Details**:
- Notes will be listed according to `[id]` from smallest to largest.
  (Only `[id]` and `` `[title]` `` are shown.)

### Get a note

**Type**: **command**

**Trigger prefix**: `!note` / `筆記`

**Function**: Get the content of the specified note by title or id.

**Format**: ``!note `[title]`/[id]``

**Example**: ``!note `Miku` ``

**Details**:
- You can choose one of `` `[title]` `` and `[id]` to use.
- `` `[title]` `` and `[id]` used at the same time will be based on the one closest to the command.
  (e.g. ``!note 01 `Miku` `` will chose `01`)
- You can only get the notes you own.

### Edit a note

**Type**: **command**

**Trigger prefix**: `!updatenote` / `修改筆記` / `更新筆記`

**Function**: Edit the content of the specified note.

**Format**: ``!updatenote `[title]`/[id] [content]/[attachment-file]``

**Example**: `!updatenote 01 Miku is the best!! OwO//`

**Details**:
- You can choose one of `` `[title]` `` and `[id]` to use.
- `` `[title]` `` and `[id]` used at the same time will be based on the one closest to the command.
  (e.g. ``!updatenote `Miku` 01 Miku is the best!! OwO//`` will chose `` `三玖天下第一!!` `` . The rest will be treated as `[content]`, please pay attention!)
- If there is an `[attachment-file]` in the original note, and there is no `[attachment-file]` in the command message, the original `[attachment-file]` will be removed.
- You can only edit notes you own.

### Delete a note

**Type**: **command**

**Trigger prefix**: `!delnote` / `刪除筆記` 

**Function**: Delete the specified note.

**Format**: ``!delnote `[title]`/[id]``

**Example**: `!delnote 01`

**Details**:
- You can choose one of `` `[title]` `` and `[id]` to use.
- `` `[title]` `` and `[id]` used at the same time will be based on the one closest to the command.
  (e.g. ``!updatenote `Miku` 01 Miku is the best!! OwO//`` will chose `` `三玖天下第一!!` `` .)
- After deleting the notes with smaller `[id]`, `[id]` will remain and will not affect the `[id]` of other notes.
- Only notes that you own can be deleted.


## LaTeX command

**Type**: **command**

**Trigger prefix**: `!latex` / `!tex`

**Function**: Convert LaTeX commands into a image.

**Format**: `!latex [LaTeX]`

**Example**: `!latex D={-b\pm\sqrt{b^2-4ac}\over2a}`

**Details**:
- if `[LaTeX]` is incorrect, the image will not be converted.
- The supported functions of `[LaTeX]` are mainly for converting websites.
- The display results of the conversion are mainly based on converting websites.

## Image command

### Image search

**Type**: **command**

**Trigger prefix**: `!image` / `google圖片` / `圖片搜尋`

**Function**: Search and display an image by the keyword.

**Format**: `!image [keyword]`

**Example**: `!image no game no life`

**Details**:
- It is equivalent to the search results of **Google Image Search**.
- The image will be randomly displayed from the first 10 images in the search results.

### Search by image

**Type**: **command**

**Trigger prefix**: `!searchbyimage` / `以圖搜尋` / `以圖搜圖`
**Function**: Search by an image and give corresponding results.

**Format**: `!searchbyimage [image]/[url]`

**Details**:
- It is equivalent to the search results of **Google Search by Image**.
- **Keywords** found by image search will be given.
- Will give ++other sizes of the same image++ if they exist.
- Will give ++similar pictures++ (according to Google results).
- Image search results by the found **keyword** will be given.
- Image will be randomly displayed from the first 10 images in the search results for ++similar images++.

## Pixiv command

**Type**: **command**

**Trigger prefix**: `p` / `pixiv`

**Function**: Display the specified [Pixiv](https://www.pixiv.net/) image and list detailed information.

**Format**: `pixiv = [illust-id] ( : [page] )`

**Example**: `p=75077958` / `pixiv = 75263136:4`

**Details**:
- If `[illust-id]` exists, the author, title, description, tags... and other details of the image will be given.
- The image size and the uploaded date will be given at the bottom.
- Click on the title (blue bold underlined text above) to view the full content of the image on Pixiv website.
- Click on the author (top white bold text) to view the author's account page.
- If `[illust-id]` contains multiple images, you can use `[page]` to decide which image to display.
- `[page]` is optional, if not provided, the first image will be displayed.
- If `[illust-id]` is a single image or the `[page]` exceeds the number of images, the first image will be displayed.
- The index of `[page]` starts from 1.
- Click on the image and then click below to open the original size image, which is the original image.
  (To be precise, it is a copy of the original one.)
- If the original image file is large, it may take some time to load the image.
