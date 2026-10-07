# GoodBite for Business (B2B demo)

A demo web app for small cafes, bakeries and restaurants. One app to sell at the till, track stock and expiry dates, order from suppliers, log waste, and prepare e-invoices.

**Everything in it is pretend.** The cafe, suppliers, prices, sales and tax numbers are made up. Nothing is sent to LHDN, a bank, or a supplier.

The old household app is untouched. It is still `index.html` in the main Goodbite folder. This new app lives in the `business` folder.

## How to open it

- **Easiest:** open the Claude link (the published artifact).
- **From the file:** double-click `business/index.html`. It opens in your browser. It needs internet only for the fonts.
- **GitHub Pages:** upload the whole `business` folder to your `goodbite` repo. The app will be at `your-name.github.io/goodbite/business/`.

Your changes are saved in that browser only. To start fresh: **Settings > Reset demo data**.

If the dates look old when you open it on another day, press **Refresh demo data** on Home.

## Finding your way around

- The **menu** is always on screen (left side on a laptop or tablet, bottom on a phone).
- **Viewing as** at the top switches between Owner, Cashier and Kitchen staff. The menu gets shorter for staff.
- The **green button** is always the main thing to do on a page. Red buttons undo or delete something and always ask first.
- **Help** explains the page you are on in 3 lines.
- **Demo tour** walks you through the presentation one step at a time. Press Next and it takes you to the right screen.

## Added on 7 Oct (second round)

**1. The owner can change the menu.** Settings > Menu and recipes.
- **Add dish**: name, group on the till (or make a new group), price, picture, options, and the recipe (ingredients and amounts).
- **Change a dish**: tap its row. Everything can be edited.
- **Delete dish**: red button at the bottom of the dish page. It asks first, and you can Undo. Old receipts keep the dish.
- A new dish shows on the till straight away, and each sale takes its recipe off the stock.

**2. Three languages.** Settings > Language, or the Help button on any page (so staff can switch too).
- English, Bahasa Melayu, 中文 (Simplified Chinese). The choice is saved on that device.
- Menus, buttons, messages, help, tours, built-in dish and ingredient names are all translated.
- Not translated on purpose: names you type yourself (a new dish, a supplier), made-up company names, dates, the copy-as-spreadsheet text, and the e-invoice JSON.
- **The Malay and Chinese wording was written by Claude. No native speaker has checked it.** Please read through it, or ask a friend to, before you present in those languages.

## 5-minute demo script

Press **Demo tour** at the top and follow the dark box. Press **Next** to move on. These are the 12 steps and what to say.

| # | Time | Screen | What to say and do |
|---|------|--------|--------------------|
| 1 | 0:00 | Home (Owner) | "This is what the owner sees each morning. Every card opens the fix." Point at "5 items expiring" and "Fresh milk is low". |
| 2 | 0:25 | Sell (Cashier) | "The cashier only sees the till." Tap Latte, pick Iced, Add to bill. Tap Butter Croissant. Type table 5. |
| 3 | 0:55 | Payment | "Service charge, SST and 5 sen rounding are worked out." Tap RM 50, then Confirm payment. |
| 4 | 1:15 | Sale done | "The sale took the ingredients off the stock by recipe." Press "See what was used". |
| 5 | 1:35 | Stock > Fresh milk (Kitchen) | "Stock is kept by batch. The oldest batch is always used first, so less expires." |
| 6 | 2:00 | New order (Owner) | "The low-milk card opened this order, already filled in." Press "Save and check the order", then "Send order". |
| 7 | 2:30 | Receive goods (Kitchen) | "When the delivery comes, staff check amounts and expiry dates." Press "Save and go to Confirm", then "Confirm goods received". |
| 8 | 3:00 | Waste (Kitchen) | "Logging waste takes three taps: item, amount, reason." Press "Save waste log". Mention expired food is logged by itself. |
| 9 | 3:25 | Reports (Owner) | "Each month the owner sees waste in kg and RM, the most wasted items, and food cost." Tap one wasted item. |
| 10 | 3:55 | E-invoice steps | "A company customer wants an e-invoice." Tap the first quick-fill buyer and follow the green button through the 4 steps. |
| 11 | 4:30 | E-invoice page | "It can be cancelled for 72 hours. After that you issue a credit note." Show the Cancel button and the status label. |
| 12 | 4:50 | E-invoice notes | "This is a practice version. Here is what we checked with LHDN and what a real product still needs." |

Tip: if a step looks wrong because you clicked around, press **Next** or **Back** in the dark box. It puts the right screen back.

## What changed from the brief (please read)

1. **Most small cafes do not have to issue e-invoices today.** LHDN's guideline dated 30 Aug 2026 exempts businesses with yearly turnover under RM3 million. LHDN's own timeline web page still says RM1 million (last updated Dec 2025). The app follows the newer guideline and says so. Either way, a small cafe is under the line. So e-invoicing is a "ready when you grow, or when a company customer asks" feature, not a legal must-have for the target customers.
2. **Most small cafes do not charge SST either.** Customs says food and drink outlets register only above RM1.5 million a year. The rate is 6% for food and drink. The demo cafe charges it so you can show the maths, but it can be switched off in Settings.
3. **Cancel window is 72 hours** from the time LHDN accepts the e-invoice. After that it needs a credit note. The app works this way.
4. **Walk-in sales go into one combined e-invoice** per month, due within 7 days after the month ends, with buyer "General Public" and TIN EI00000000010. The app has this.
5. **44 menu items, not 40**, and 60 ingredients, 6 suppliers, about 2 months of history.
6. **The file is `business/index.html`**, not `index.html`, so the old household prototype is not overwritten.
7. **Printing and file downloads** only work when the app is opened from the file or GitHub Pages. Inside the Claude preview, those buttons are replaced with "Copy" boxes, because the preview blocks printing and downloads.

All sources are inside the app: **Invoices > E-invoice notes**.

## Limitations

**Pretend (simulated)**
- E-invoices are not sent to LHDN MyInvois. Statuses, IDs and QR pictures are made up. Nothing is digitally signed.
- Payments. Cash, card, DuitNow QR and e-wallet buttons do not move money.
- Sending orders to suppliers. Nothing is emailed or messaged.
- Food Rescue. The partners are invented and nobody is told about an offer.
- Staff roles. There are no passwords. Anyone can switch role.
- Barcode scanning. You search by name or type the item code.

**Estimated or made up**
- Every price, cost, weight and sales figure. The 2 months of history are generated by the app.
- The kg per piece or loaf used to turn waste into kilograms.
- Suggested order amounts (minimum stock plus the last 14 days of use). A rough guide only.
- The tax rates in Settings are common examples, not advice.

**What a real product would still need**
- A server and database, so data is shared between devices.
- Real logins and permissions.
- MyInvois API registration, a digital certificate for signing, and handling of LHDN's real replies.
- A licensed payment partner for card, DuitNow QR and e-wallets.
- Receipt printer, cash drawer and barcode scanner support.
- A way to keep working when the internet is down.
- Checks by an accountant on tax, rounding and e-invoice rules.
- Interviews and testing with real cafe owners. Nobody from a cafe has tried this yet.

**Not confirmed** (also listed in the app)
- Whether service tax is charged on top of the service charge. It is a switch, on by default.
- How a service charge should appear on an e-invoice. The demo shows it as its own line.
- The 5 sen rounding rule was not checked against a Bank Negara source.
- The business activity code (56101) and item code (022 Others) are placeholders.
- The end date of LHDN's penalty grace period was only seen on non-official sites, so it is left out.

## Choices made without asking

- Service charge applies to dine-in only (can be changed in Settings).
- Rounding to 5 sen applies to every payment type, not only cash.
- SST is worked out line by line, so the receipt and the e-invoice always match to the sen.
- Only the last 3 days of receipts are kept one by one. Older days are kept as a daily total. This keeps the app small enough for the browser.
- "Draft" is the app's own word for an e-invoice that has not been sent. LHDN's four statuses are Submitted, Valid, Invalid, Cancelled.
- A buyer TIN ending in 404 is always rejected. This is how the demo shows an "Invalid" result.
- The Cashier can start an e-invoice from a sale, even though the Cashier menu only shows Home and Sell.
- Voiding a sale asks why. "Keyed in by mistake" puts the ingredients back. "Food was already made" does not.
- Food given to a rescue partner leaves the stock but is not counted as waste.
- The look is light only (no dark mode), to match the first GoodBite prototype.
- Dish codes for new dishes start at 601. A new dish with no recipe can be saved, but the app warns that it will not reduce stock.
- Language is one setting for the whole device, not per staff member.

## Files

- `index.html` - the whole app in one file. This is the only file the browser needs.
- `source/` - the same code split into smaller files (`src/`), plus `build.py` which joins them into `dist/index.html`.
- `source/test/` - the scripts that click through the app (`audit.js`, `flow.js`). They need Node and Playwright.
- `button-audit.md` - the result of clicking every button in every role (English), plus one run in Chinese and one in Malay.
- `button-audit-full.csv` - the same, one row per click.
