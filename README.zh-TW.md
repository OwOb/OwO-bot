# OwO-bot 使用手冊

OwO-bot 是一個使用於 [Discord](https://discord.com/) 的機器人，其可以根據使用者輸入的指令或對話內容給予適當的回應。

## 安裝

你可以使用以下指令取得 OwO-bot 的主要架構
```bash
git clone https://github.com/OwOb/OwO-bot
```

## 環境

需要有 [Node.js](https://nodejs.org/) 才可運行，版本為 10.16.3 或更新的版本，較舊的版本不保證其執行的正確性，安裝及下載可以參考[這裡](https://nodejs.org/en/download)。

所需套件及版本可以參考以下列表或 [package.json](/package.json)：
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

需要事先建立好 [PostgreSQL](https://www.postgresql.org/) 資料庫，資料庫中須包含以下兩個表格：

### var_table
|var_name    |value        |
|------------|-------------|
|VARCHAR(128)|VARCHAR(1800)|

### note_table
|userid|note_no|note_title |note_detail  |attachment_url|
|------|-------|-----------|-------------|------------|
|BIGINT|INT    |VARCHAR(64)|VARCHAR(1800)|VARCHAR(1800)|


若欲使用執行程式的相關指令（[見下](#程式執行指令)），亦須先安裝相關環境（[GCC](https://gcc.gnu.org/)、[Python](https://www.python.org/)），並將編譯器或執行檔置於環境變數的路徑之內。

## 執行
執行前需先準備 Discord Bot 以及其對應的權杖，相關設定說明可以參考[這裡](https://discord.com/developers/docs/intro)。
並設定以下環境變數：
```
BOT_TOKEN=*TOKEN_OF_YOUR_BOT*
DATABASE_URL=*POSTGRESQL_DATABASE_URL*
OwObot_ID=*DISCORD_ID_OF_YOUR_BOT*
OwO_ID=*YOUR_DISCORD_ID*
```
接著執行以下指令啟動 OwO bot：
```bash
cd OwO-bot
node bot.js
```

若看到以下訊息則說明 OwO bot 已成功啟動：
```
Ready
```

## 功能

OwO bot 提供的功能大致可分為兩類，一類是需要特定的前綴詞語觸發的**指令**，另一類是依特定對話格式觸發的**回應**，以下將會詳細說明*部分***指令**的功能，其餘等待以後補充說明。

## 查詢指令

**類型**： **指令**

**觸發前綴**： `查詢指令` / `!help` / `!man`

**指令功能**: 查詢指令的用法

**指令格式**： `!help [欲查詢的指令]`

**指令範例**： `查詢指令 筆記`

**可查詢指令**：
- `查詢指令` / `help` / `man`
- `計算機` / `計算` / `運算` / `calculate` / `calc`
- `程式` / `code`
- `latex` / `tex`
- `筆記` / `note`
- `圖片` / `image`
- `pixiv` / `p`

**詳細事項**：
- 只能查詢上方所列出的指令(會持續更新或修正)
- 「查詢指令」可以查詢「查詢指令」呢!! 真棒!! (X

## 計算機指令

**類型**： **指令**

**觸發前綴**： `計算` / `運算` / `!calculate` / `!calc`

**指令功能**： 給定算式並計算結果

**指令格式**： `!calc [算式]`

**指令範例**： `計算 3*13`

**支援的功能**： （包括但不限於）
- 一般算式的計算
  （`(7-2*2)*(28%15)` → `39` ）
- 浮點數的計算
  （`0.1+0.2*0.3` → `0.16` ）
- 分數的計算
  （`fraction("1/3")` + `fraction("2/5")` → `11/15` ）
- 複數的計算
  （`e^(pi*i)+1` → `1.2246467991474e-16i` （浮點數誤差））
- 矩陣的計算
  （`[[1, 2], [3, 4]] * [[4, 3], [2, 1]]` → `[[8, 5], [20, 13]]` )
- 單位的計算
  （`1 km to m` → `1000 m`）
- 物理量的計算
  （`1 kg * 1 m/s^2` → `1 N` （F = ma））
- 指對數
  （`log(e^10)` → `10` ）
- 三角函數
  （`sin(pi/2)` → `1` ）
- 微分
  （`derivative("sin(2x)", "x")` → `2 * cos(2 * x)` ）
- 積分
  （`integral("sin(2x)", "x")` → `cos(2 * x) * -1 / 2` ）
- 變數與函數
  （`a=4; b=2; f(x,y)=x^y; f(a+b,a-b)` → `[36]` ）
  （每個語句用分號 `;` 做分隔但最後不需要）

**詳細事項**：
- 若「算式」正確無誤，將會給出計算後的結果。
- 判斷計算的正確性與計算的結果以 [math.js](https://mathjs.org/) 為主。
- 函數遞迴過深或函數給值不當，都有可能會判斷成「算式」格式有誤。
- 「算式」可能會因為 Discord 本身標記功能而呈現奇怪的樣式
  但並**不會**影響到指令的判讀，
  相對來說使用 `\` 來消除標記功能反而會使指令判讀錯誤。
- 浮點數的有效位數只有 14 位，
  計算的結果也有可能受到浮點數誤差影響而有些微誤差。
- 支援的功能不限於上面所列舉，
  想取得完整的功能和內建函式可以參考 math.js 的官網。

## 程式執行指令

**類型**： **指令**

**觸發前綴**： 依語言不同而有所不同

**指令功能**： 編譯並執行執行指定語言的程式碼

**指令格式**：
`![程式語言]`
```
[code]
```
```
( [input] )
```

**指令範例**：
`!py`
```
s = input()
print('Hello,', s)
```
```
OwO
```

**支援語言**：
- `c`
- `c++` / `cpp`
- `javascript` / `js` / `nodejs` / `node`
- `python3` / `py3` / `python` / `py`
- `python2` / `py2`

**詳細事項**：
- 由於套件不支援輸入命令列參數，目前無法使用新版本的 C 與 C++ 。
- `[input]` 為非必要，若程式不需要輸入可以忽略此項。
- 範例中 `[code]` 與 `[input]` 的打法如右 ` ```[code]``` ` （中間可換行）。
- 若程式成功執行會給出該程式的輸出。
- 若遇到編譯錯誤（CE）或執行時錯誤（RE）將會給出錯誤訊息。
- 程式執行時限為3秒，超過時限將會給出超過時間限制（TLE）。
- 若輸出或錯誤訊息超過 1900 字只會給出前 1900 字的訊息。
- 本指令存在嚴重資安問題，還請不要故意嘗試之。
- 為避免環境變數外洩，JavaScript 無法使用 `process.evn` 全域變數。
  （正確來說是會得到空的option物件，但相信一定還有方法可以取得環境變數，還請不要故意嘗試之）

## 筆記系統

### 新增筆記

**類型**： **指令**

**觸發前綴**： `新增筆記` / `!newnote` / `!addnote`

**指令功能**： 創建一個新的筆記

**指令格式**： ``新增筆記 `(筆記標題)` [筆記內容]/[附件檔案]``

**指令範例**： ``新增筆記 `三玖天下第一!!` 三玖三玖得第一!! OwO/``

**詳細事項**：
- `` `(筆記標題)` `` 需少於 64 字。
- `[筆記內容]` 需少於 1600 字。
- `[筆記內容]` 與 `[附件檔案]` 可以擇一使用或同時使用，但至少要使用其中一個。
- `[附件檔案]` 不限檔案類型，只要能上傳 Discord 的應該都可以... 吧...？
- 一人最多可以同時持有 16 份筆記。
- 新增筆記後會為每份筆記生成 `[筆記編號(01~16)]`。
  （對於同個人來說 `[筆記編號]` 不會重複）
- `` `(筆記標題)` `` 為非必要，若不填寫會自動生成標題。
  （預設標題為: `$(暱稱)的筆記$(筆記編號)`）
- `` `(筆記標題)` `` 不能與其它筆記相同。

### 我的筆記

**類型**： **指令**

**觸發前綴**： `我的筆記` / `!mynote`

**指令功能**： 查詢自己擁有的筆記

**指令範例**： `我的筆記`

**詳細事項**：
- 筆記將會依照 `[筆記編號]` 由小至大列出。
  （僅顯示 `[筆記編號]` 和 `` `[筆記標題]` ``）

### 查詢筆記

**類型**： **指令**

**觸發前綴**： `筆記` / `!note`

**指令格式**： ``筆記 `[筆記標題]`/[筆記編號]``

**指令功能**： 查詢指定筆記的內容

**指令範例**： ``筆記 `三玖天下第一!!` ``

**詳細事項**：
- `` `[筆記標題]` `` 與 `[筆記編號]` 擇一使用即可。
- `` `[筆記標題]` `` 與 `[筆記編號]` 同時使用將以靠近指令的為主。
  （例如：``筆記 01 `三玖天下第一!!` ``，會以 `01` 為主）
- 只能查詢自己擁有的筆記。

### 修改筆記

**類型**： **指令**

**觸發前綴**： `修改筆記` / `更新筆記` / `!updatenote`

**指令功能**： 修改指定筆記的內容

**指令格式**： ``修改筆記 `[筆記標題]`/[筆記編號] [筆記內容]/[附件檔案]``

**指令範例**： `修改筆記 02 三玖三玖得第一!! OwO/`

**詳細事項**：
- `` `[筆記標題]` `` 與 `[筆記編號]` 擇一使用即可。
- `` `[筆記標題]` `` 與 `[筆記編號]` 同時使用將以靠近指令的為主。
  （例如：``修改筆記 `三玖天下第一!!` 01 三玖三玖得第一!! OwO/``，以上會以 `` `三玖天下第一!!` `` 為主，剩餘部分皆會被當作 `[筆記內容]`，請務必注意!!）
- 若原本筆記的 `[筆記內容]` 存在 `[附件檔案]`，且指令訊息中不存在`[附件檔案]`的話，將會移除原本的`[附件檔案]`。
- 只能修改自己擁有的筆記。

### 刪除筆記

**類型**： **指令**

**觸發前綴**： `刪除筆記` / `!delnote`

**指令功能**： 刪除指定的筆記

**指令格式**： ``刪除筆記 `[筆記標題]`/[筆記編號]``

**指令範例**： `刪除筆記 01`

**詳細事項**：
- `` `[筆記標題]` `` 與 `[筆記編號]` 擇一使用即可。
- `` `[筆記標題]` `` 與 `[筆記編號]` 同時使用將以靠近指令的為主。
  （例如：``刪除筆記 `三玖天下第一!!` 01``，以上會以`` `三玖天下第一!!` `` 為主）
- 刪除 `[筆記編號]` 較小的筆記之後該 `[筆記編號]` 會空著，
  並不會影響其它筆記的 `[筆記編號]`。
- 只能刪除自己擁有的筆記。


## LaTeX 指令

**類型**： **指令**

**觸發前綴**： `!latex` / `!tex`

**指令功能**： 將 LaTeX 指令轉成圖片

**指令格式**： `!latex [LaTeX 指令]`

**指令範例**： `!latex D={-b\pm\sqrt{b^2-4ac}\over2a}`

**詳細事項**：
- 若 `[LaTeX 指令]` 有誤將會無法轉換成圖片。
- 支援的 `[LaTeX 指令]` 以轉換網站為主。
- 轉換的呈現結果亦以換網站為主。

## 圖片指令

### 圖片搜尋

**類型**： **指令**

**觸發前綴**： `圖片搜尋` / `google圖片` / `!image`

**指令功能**： 依關鍵字搜尋並顯示圖片

**指令格式**： `圖片搜尋 [關鍵字]`

**指令範例**： `圖片搜尋 遊戲人生`

**詳細事項**：
- 其相當於**Google圖片搜尋**的搜尋結果。
- 會從搜尋結果的前 10 張中隨機顯示圖片。

### 以圖搜尋

**類型**： **指令**

**觸發前綴**： `以圖搜尋` / `以圖搜圖` / `!searchbyimage`

**指令功能**： 以圖片作為搜尋並給出相應結果

**指令格式**： `以圖搜尋 [附件圖片]/[圖片網址]`

**指令範例**： `圖片搜尋 遊戲人生`

**詳細事項**：
- 其相當於**Google以圖搜尋**的搜尋結果。
- 會給出以圖片搜尋到的**關鍵字**。
- 會給出++相同圖片++的其他大小（如果存在）。
- 會給出++相似圖片++（依Google結果）。
- 會給出所尋到之**關鍵字**的圖片搜尋結果。
- 會從++相似圖片++的搜尋結果中的前 10 張中隨機顯示圖片。

## Pixiv 指令

**類型**： **指令**

**觸發前綴**： `p` / `pixiv`

**指令功能**： 顯示指定 [Pixiv](https://www.pixiv.net/) 圖片並列出詳細資料

**指令格式**： `pixiv = [illust_id] ( : [page] )`

**指令範例**： `p=75077958` / `pixiv = 75263136:4`

**詳細事項**：
- 若 `[illust_id]` 存在，會給出該圖片的 作者、標題、描述、標籤... ...等等詳細資料。
- 最底下會給出該圖片該圖片的大小以及其上傳日期。
- 點擊標題（上面藍色粗體底線字）可至 Pixiv 查看該圖完整內容。
- 點擊作者（最上白色粗體字）可觀看該作者的帳戶頁面。
- 若 `[illust_id]` 為多圖，則可以使用 `[page]` 決定顯示第幾張圖片。
- `[page]` 為非必要，若沒給將會顯示第一張圖片。
- 若該 `[illust_id]` 為單圖或 `[page]` 超出圖片數目將會顯示第一張圖片。
- `[page]` 從 1 開始。
- 點擊圖片再點擊下方開啟原尺寸圖片即是原圖片。
  （正確來說是與原圖片相同的圖片）
- 若原圖片檔案較大，則載入圖片可能會需要花一些時間。
